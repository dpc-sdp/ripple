<script lang="ts">
export default { name: 'RplContent' }
</script>

<script setup lang="ts">
defineProps({
  html: {
    type: [String, undefined],
    default: undefined
  }
})
</script>

<template>
  <div class="rpl-content">
    <slot>
      <div v-html="html"></div>
    </slot>
  </div>
</template>

<style src="./content.css" />
