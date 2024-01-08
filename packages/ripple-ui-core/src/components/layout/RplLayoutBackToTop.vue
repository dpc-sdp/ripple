<script setup lang="ts">
import RplButton from '../button/RplButton.vue'
import { useWindowScroll, useElementBounding } from '@vueuse/core'
import { ref, computed } from 'vue'

interface Props {
  topElementId: string
}

withDefaults(defineProps<Props>(), {})

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
        >Back to top</RplButton
      >
    </div>
  </div>
</template>

<style src="./RplLayoutBackToTop.css" />
