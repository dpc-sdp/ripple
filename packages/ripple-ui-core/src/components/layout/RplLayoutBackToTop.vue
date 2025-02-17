<script setup lang="ts">
import RplButton from '../button/RplButton.vue'
import { useWindowScroll, useElementBounding } from '@vueuse/core'
import { ref, computed } from 'vue'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

interface Props {
  label?: string
  topElementId: string
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Back to top'
})

const emit = defineEmits<{
  (e: 'navigate', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-layout-back-to-top', emit)

// This is the number of pixels down the page you need to scroll before you see
// the back to top button.
const SCROLL_THRESHOLD = 1080

const containerRef = ref(null)

const { y: scrollY } = useWindowScroll()
const { top: offsetTop } = useElementBounding(containerRef)

const isShown = computed(() => {
  return scrollY.value > SCROLL_THRESHOLD
})

const isSticky = computed(() => {
  if (!containerRef.value) {
    return false
  }

  return offsetTop.value > window.innerHeight
})

const handleClick = () => {
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrollPercentage = Math.round((scrollY.value / pageHeight) * 100)

  emitRplEvent(
    'navigate',
    {
      action: 'click',
      text: props.label,
      value: scrollPercentage
    },
    { global: true }
  )
}
</script>

<template>
  <div
    ref="containerRef"
    :class="{
      'rpl-back-to-top': true,
      'rpl-back-to-top--visible': isShown,
      'rpl-back-to-top--sticky': isSticky,
      'rpl-u-screen-only': true
    }"
  >
    <div
      :class="{
        'rpl-back-to-top__inner': true,
        'rpl-container': true
      }"
    >
      <RplButton
        el="a"
        variant="elevated"
        iconName="icon-arrow-up"
        url="#rpl-skip-links"
        class="rpl-back-to-top__button"
        :aria-label="label"
        @click="handleClick"
      >
        {{ label }}
      </RplButton>
    </div>
  </div>
</template>

<style src="./RplLayoutBackToTop.css" />
