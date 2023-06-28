<script setup lang="ts">
import { computed, ref } from 'vue'
import { RplIcon, RplTextLink } from '@dpc-sdp/ripple-ui-core/vue'
import { useMediaQuery } from '@vueuse/core'

interface Props {
  status: 'error' | 'success'
  title: string
  fields?: {
    fieldId: string
    text: string
  }[]
}

const props = withDefaults(defineProps<Props>(), {
  fields: () => []
})

const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

const classes = computed(() => {
  return {
    'rpl-form-alert': true,
    [`rpl-form-alert--${props.status}`]: props.status
  }
})

const containerRef = ref(null)

const iconName = computed(() => {
  return props.status === 'success'
    ? 'icon-check-circle-filled'
    : 'icon-exclamation-circle-filled'
})

const scrollToElement = (element) => {
  if (!element) {
    return
  }

  const topOffset = -10
  const elementYPos =
    element.getBoundingClientRect().top + window.pageYOffset + topOffset

  window.scrollTo({
    top: elementYPos,
    behavior: prefersReducedMotion.value ? 'auto' : 'smooth'
  })
}

const handleFieldClick = (fieldId: string) => {
  const fieldContainerSelector = '.rpl-form__outer'

  // First look for this data attribute which allows inputs to specify exactly which element should be focused
  let input: HTMLElement = document.querySelector(
    `[data-rpl-focus-input="${fieldId}"]`
  )

  // Then fallback to just getting the element by it's id
  if (!input) {
    input = document.getElementById(fieldId)
  }

  if (input) {
    // Try to get the wrapper of the input as a nicer target for scrolling, otherwise fallback to scrolling to the input itself
    const container = input.closest(fieldContainerSelector)

    input.focus({ preventScroll: true })

    if (container) {
      scrollToElement(container)
    } else {
      scrollToElement(input)
    }
  }
}

const focus = () => {
  if (containerRef.value) {
    containerRef.value.focus({ preventScroll: true })
    scrollToElement(containerRef.value)
  }
}

defineExpose({
  focus
})
</script>

<template>
  <div ref="containerRef" :class="classes" tabindex="-1">
    <h3 class="rpl-form-alert__title rpl-type-label-large">
      <RplIcon :name="iconName" size="m" />
      {{ title }}
    </h3>
    <div class="rpl-form-alert__description rpl-type-p">
      <slot></slot>
    </div>
    <ul v-if="fields && fields.length" class="rpl-form-alert__fields">
      <li
        v-for="field in fields"
        :key="field.fieldId"
        class="rpl-form-alert__field"
      >
        <RplTextLink
          class="rpl-form-alert__field-link rpl-type-p"
          :url="`#${field.fieldId}`"
          @click.prevent="handleFieldClick(field.fieldId)"
        >
          {{ field.text }}
        </RplTextLink>
      </li>
    </ul>
  </div>
</template>

<style src="./RplFormAlert.css"></style>
