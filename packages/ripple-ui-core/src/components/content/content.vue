<script lang="ts">
export default { name: 'RplContent' }
export type RplContentProps = {
  html: [string, undefined]
  contained: boolean
}
</script>

<script setup lang="ts">
defineProps<RplContentProps>()
</script>

<template>
  <div
    v-if="html"
    class="rpl-content"
    :class="{ 'rpl-content--contained': contained }"
    v-html="html"
  ></div>
  <div v-else class="rpl-content">
    <slot></slot>
  </div>
</template>

<style src="./content.css" />
