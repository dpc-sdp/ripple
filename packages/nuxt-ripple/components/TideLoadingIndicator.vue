<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, useNuxtApp } from '#imports'

interface Props {
  delay?: number
  duration?: number
  height?: number
  colour?: string
}

const props = withDefaults(defineProps<Props>(), {
  delay: 200,
  duration: 2000,
  height: 3,
  colour: 'var(--rpl-clr-primary)'
})

const router = useRouter()
const nuxtApp = useNuxtApp()
const progress = ref(0)
const timer = ref(null)
const throttle = ref(null)

const start = () => {
  if (typeof window !== 'undefined') {
    throttle.value = setTimeout(() => {
      timer.value = setInterval(() => {
        if (progress.value < 100) progress.value += 1
      }, props.duration / 100)
    }, props.delay)
  }
}

const finish = () => {
  if (typeof window !== 'undefined') {
    clearInterval(timer.value)
    clearTimeout(throttle.value)

    if (progress.value) progress.value = 100

    setTimeout(() => (progress.value = 0), 100)
  }
}

router.onError(finish)
nuxtApp.hook('page:start', start)
nuxtApp.hook('page:finish', finish)

const style = computed(() => ({
  height: `${props.height}px`,
  background: props.colour,
  opacity: progress.value ? 1 : 0,
  transform: `scaleX(${progress.value}%)`
}))
</script>

<template>
  <div class="tide-loading-indicator" :style="style" />
</template>

<style>
.tide-loading-indicator {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999;
  transform-origin: left;
  transition: transform 0.1s;
}
</style>
