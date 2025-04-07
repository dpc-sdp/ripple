<script setup lang="ts">
import { computed, useSlots } from 'vue'

interface Props {
  numColumns?: 1 | 2 | 3 | 4
}

const props = withDefaults(defineProps<Props>(), {
  numColumns: 2
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
      [`rpl-link-list--cols-${numColumns}`]: true
    }"
    :style="{
      '--local-link-list-rows': Math.ceil(numItems / props.numColumns)
    }"
  >
    <slot />
  </ul>
</template>

<style src="./RplLinkList.css" />
