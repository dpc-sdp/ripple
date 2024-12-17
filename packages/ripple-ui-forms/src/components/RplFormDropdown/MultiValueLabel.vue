<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { RplFormDropdownOption } from './RplFormDropdown.vue'

export interface MultiValueLabelProps {
  selectedOptions: RplFormDropdownOption[]
}

const props = withDefaults(defineProps<MultiValueLabelProps>(), {
  selectedOptions: () => []
})

const MORE_LABEL_WIDTH = 74

const isMounted = ref(false)
const optionsAreaWidth = ref(null)
const numItemsHidden = ref(0)

const itemsRef = ref(null)

onMounted(() => {
  // We need to know if the component has mounted so that we can avoid SSR hydration mismatches.
  // This is because the rendering of the labels is tied to the width of the container, which
  // is unknown when rendering on the server.
  isMounted.value = true
})

const calculateNumberOfHiddenItems = async () => {
  if (!isMounted.value) {
    return
  }

  await nextTick()

  const labelElements = [
    ...itemsRef.value.querySelectorAll('[data-option-label="true"]')
  ]
  const containerBBox = itemsRef.value.getBoundingClientRect()

  // Here we figure out how much space there is to fit the items in, it's
  // important to factor in the width of the '+# more' label here even
  // if it's not currently being rendered.
  const widthToFill =
    numItemsHidden.value === 0
      ? optionsAreaWidth.value - MORE_LABEL_WIDTH
      : optionsAreaWidth.value

  // Count how many labels are at least partially visible
  let countShown = 0

  for (const labelEl of labelElements) {
    const itemBBox = labelEl.getBoundingClientRect()

    const itemCharWidth =
      labelEl
        .querySelector('.rpl-form-dropdown__multi-value-label-char')
        ?.getBoundingClientRect()?.width || 0

    if (itemBBox.left - containerBBox.left > widthToFill - itemCharWidth) {
      break
    } else {
      countShown += 1
    }
  }

  // Based on the above, figure out how many items are hidden
  numItemsHidden.value = selectedOptionValues.value.length - countShown
}

const selectedOptionValues = computed(() => {
  return (props.selectedOptions || []).map((opt) => opt.value)
})

watch(
  () => selectedOptionValues.value,
  () => {
    calculateNumberOfHiddenItems()
  }
)

useResizeObserver(itemsRef, (entries) => {
  const entry = entries[0]
  const { width } = entry.contentRect

  optionsAreaWidth.value = width

  calculateNumberOfHiddenItems()
})
</script>

<template>
  <div class="rpl-form-dropdown__multi-value-label-wrap">
    <div ref="itemsRef" class="rpl-form-dropdown__multi-value-label rpl-type-p">
      <span
        v-for="(option, i) in selectedOptions"
        :key="option.id"
        data-option-label="true"
        >{{ option.label
        }}<span
          class="rpl-form-dropdown__multi-value-label-char"
          aria-hidden="true"
          >&hellip;{{ option.label?.charAt(0) }}</span
        >{{ i === selectedOptions.length - 1 ? '' : ', ' }}</span
      >
    </div>
    <div
      v-if="numItemsHidden > 0"
      :style="{
        width: `${MORE_LABEL_WIDTH}px`
      }"
      class="rpl-form-dropdown__more-label rpl-type-p"
    >
      +{{ numItemsHidden }} more
    </div>
  </div>
</template>

<style src="./MultiValueLabel.css"></style>

<style></style>
