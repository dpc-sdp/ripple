<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { RplFormDropdownOption } from './RplFormDropdown.vue'

export interface MultiValueTagListProps {
  isOpen: boolean
  selectedOptions: RplFormDropdownOption[]
  toggleOption: (option: RplFormDropdownOption) => void
  focusTag: number
  focusSearch: () => void
}

const props = defineProps<MultiValueTagListProps>()

const itemsRef = ref(null)
const faxItemsRef = ref(null)
const isMounted = ref(false)
const numItemsHidden = ref(0)
const activeTag = ref(null)
const MORE_LABEL_WIDTH = 76

const calculateHiddenItems = async () => {
  if (!isMounted.value || props.isOpen) return

  await nextTick()

  const itemsBBox = itemsRef.value.getBoundingClientRect()
  const tagElements = faxItemsRef.value.querySelectorAll('[aria-hidden]')

  let countShown = 0
  const widthToFill = numItemsHidden.value
    ? itemsBBox.width - MORE_LABEL_WIDTH
    : itemsBBox.width

  for (const tagEl of tagElements) {
    const tagBBox = tagEl.getBoundingClientRect()

    if (tagBBox.right - itemsBBox.left < widthToFill) {
      countShown += 1
    }
  }

  numItemsHidden.value = props.selectedOptions.length - countShown
}

const handleArrowLeft = (): number => {
  const activeTagIndex = props.selectedOptions.findIndex(
    (option) => option.id === activeTag.value
  )

  if (activeTagIndex) {
    activeTag.value = props.selectedOptions[activeTagIndex - 1].id
  }

  return activeTagIndex
}

const handleArrowRight = (): number => {
  const activeTagIndex = props.selectedOptions.findIndex(
    (option) => option.id === activeTag.value
  )

  if (activeTagIndex < props.selectedOptions.length - 1) {
    activeTag.value = props.selectedOptions[activeTagIndex + 1].id
  } else {
    props.focusSearch()
  }

  return activeTagIndex
}

const handleRemoval = (
  option: RplFormDropdownOption,
  keyboardEvent?: KeyboardEvent
): void => {
  if (keyboardEvent) {
    const prevItem = handleArrowLeft()

    if (!prevItem) {
      handleArrowRight()
    }
  }

  props.toggleOption(option)
}

const handleFocus = (tagId?: string): void => {
  if (!props.selectedOptions?.length) return

  if (!tagId) {
    tagId = props.selectedOptions[props.selectedOptions.length - 1].id
  }

  const foundTag = itemsRef.value?.querySelector(`[data-tag-id="${tagId}"]`)

  if (foundTag) {
    foundTag.focus()
  }
}

const handleInitialFocus = (): void => {
  if (!props.selectedOptions?.length) return

  const foundTag = props.selectedOptions[props.selectedOptions.length - 1]?.id

  if (foundTag === activeTag.value) {
    handleFocus(foundTag)
  }

  activeTag.value = foundTag
}

const displayedOptions = computed(() => {
  if (props.isOpen) {
    return props.selectedOptions
  }

  return props.selectedOptions.slice(
    0,
    props.selectedOptions.length - numItemsHidden.value
  )
})

const hiddenMessage = computed(() => {
  return numItemsHidden.value === props.selectedOptions?.length
    ? `${numItemsHidden.value} items`
    : `+${numItemsHidden.value} more`
})

// Handle focusing the right tag
watch(() => activeTag.value, handleFocus)
watch(() => props.focusTag, handleInitialFocus)

// Handle calculating hidden items when dimensions or props change
onMounted(() => {
  isMounted.value = true
  calculateHiddenItems()
})
watch(() => props.isOpen, calculateHiddenItems)
watch(() => props.selectedOptions, calculateHiddenItems)
useResizeObserver(itemsRef, calculateHiddenItems)
</script>

<template>
  <div v-if="isMounted" class="rpl-form-dropdown__multi-value-tag-list-wrap">
    <div
      ref="faxItemsRef"
      class="rpl-form-dropdown__multi-value-tag-list"
      aria-hidden="true"
    >
      <span
        v-for="option in selectedOptions"
        :key="option.id"
        aria-hidden="true"
        class="rpl-form-dropdown__multi-value-tag-item rpl-type-p"
      >
        {{ option.label }} <RplIcon name="icon-cancel" size="xs" />
      </span>
    </div>
    <div ref="itemsRef" class="rpl-form-dropdown__multi-value-tag-list">
      <button
        v-for="option in displayedOptions"
        :key="option.id"
        type="button"
        class="rpl-form-dropdown__multi-value-tag-item rpl-type-p rpl-u-focusable-block"
        tabindex="-1"
        :data-tag-id="option.id"
        :aria-label="`Remove ${option.label}`"
        @keydown.delete.prevent.stop="(e) => handleRemoval(option, e)"
        @keydown.enter.prevent.stop="(e) => handleRemoval(option, e)"
        @keydown.left.stop="handleArrowLeft"
        @keydown.right.stop="handleArrowRight"
        @click.stop="() => handleRemoval(option)"
      >
        {{ option.label }} <RplIcon name="icon-cancel" size="xs" />
      </button>
      <span
        v-if="!isOpen && numItemsHidden"
        class="rpl-form-dropdown__more-label rpl-type-p"
      >
        {{ hiddenMessage }}
      </span>
    </div>
  </div>
</template>

<style src="./MultiValueTagList.css"></style>
