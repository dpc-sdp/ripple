<script lang="ts">
export default { name: 'RplContent' }
export type RplContentProps = {
  html: [string, undefined]
}
</script>

<script setup lang="ts">
defineProps<RplContentProps>()
</script>

<template>
  <div v-if="html" class="rpl-content" v-html="html"></div>
  <div v-else class="rpl-content">
    <slot></slot>
  </div>
</template>

<style src="./content.css" />
