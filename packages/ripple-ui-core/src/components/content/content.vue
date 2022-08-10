<script lang="ts">
export default { name: 'RplContent' }
export type RplContentProps = {
  html: string
}
</script>

<script setup lang="ts">
defineProps<RplContentProps>()
</script>

<template>
  <div class="rpl-content" v-html="html"></div>
</template>

<style src="./content.css" />
