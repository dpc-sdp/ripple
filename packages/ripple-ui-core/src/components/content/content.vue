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
  <div class="rpl-content" v-html="html"></div>
</template>

<style src="./content.css" />
