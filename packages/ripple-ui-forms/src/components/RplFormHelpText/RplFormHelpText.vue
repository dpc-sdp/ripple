<script setup lang="ts">
interface Props {
  html: string
}

const props = withDefaults(defineProps<Props>(), {
  html: ''
})
</script>

<template>
  <RplContent class="rpl-form-help" :html="html" />
</template>

<style src="./RplFormHelpText.css"></style>
