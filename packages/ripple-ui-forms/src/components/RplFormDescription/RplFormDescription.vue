<script setup lang="ts">
interface Props {
  html: string
}

defineProps<Props>()
</script>

<template>
  <RplContent class="rpl-form-description" :html="html" />
</template>

<style src="./RplFormDescription.css"></style>
