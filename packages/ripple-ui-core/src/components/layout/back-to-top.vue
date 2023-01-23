<script lang="ts">
export default { name: 'RplLayoutBackToTop' }
</script>

<script setup lang="ts">
import RplButton from '../button/button.vue'
import { useWindowScroll } from '@vueuse/core'
import { ref, computed } from 'vue'

const containerRef = ref(null)

const { y: scrollY } = useWindowScroll()

const isShown = computed(() => {
  // console.log(scrollY.value)
  return scrollY.value > 1080
})

const isSticky = computed(() => {
  const container = containerRef.value
  if (!container) {
    return false
  }

  // const bbox = container.getBoundingClientRect()
  // console.log(bbox.bottom)
  // const bottomOfScreen = scrollY.value + window.innerHeight
  // console.log(bottomOfScreen)

  console.log('scrollY', scrollY.value)
  console.log('container.offsetTop', container.offsetTop)
  console.log('container.offsetHeight', container.offsetHeight)
  console.log('window.innerHeight', window.innerHeight)
  console.log('thing', container.offsetTop - window.innerHeight)
  const bottomPos = container.offsetTop - window.innerHeight
  return scrollY.value < bottomPos
})
</script>

<template>
  <div
    ref="containerRef"
    :class="{
      'rpl-back-to-top': true,
      'rpl-back-to-top--visible': isShown,
      'rpl-back-to-top--sticky': isSticky
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

<style src="./back-to-top.css" />
