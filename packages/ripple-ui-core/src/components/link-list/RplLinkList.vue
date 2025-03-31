<script setup lang="ts">
import { computed, useSlots } from 'vue'

interface Props {
  hasSidebar?: boolean
}

withDefaults(defineProps<Props>(), {
  hasSidebar: false
})

const numItems = computed(() => {
  const slots = useSlots()
  return slots?.default
    ? (useSlots().default()[0].children.length as number)
    : 0
})
</script>

<template>
  <ul
    :class="{
      'rpl-link-list': true,
      'rpl-link-list--has-sidebar': hasSidebar
    }"
    :style="{
      '--local-link-list-rows': Math.ceil(numItems / 2)
    }"
  >
    <slot />
  </ul>
</template>

<style src="./RplLinkList.css" />
