<script setup lang="ts">
type RplContentProps = {
  html?: string
  pageBackground?: string
}

defineProps<RplContentProps>()
</script>

<template>
  <div v-if="html" class="rpl-content" v-html="html"></div>
  <div v-else class="rpl-content">
    <slot></slot>
  </div>
</template>

<style src="@dpc-sdp/ripple-ui-styles/components/content/RplContent.css" />
