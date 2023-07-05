<script setup lang="ts">
interface Props {
  url: string
  text?: string
}

defineProps<Props>()
</script>

<template>
  <RplLink ref="link" class="rpl-text-link rpl-u-focusable-inline" :url="url">
    <slot>{{ text }}</slot>
  </RplLink>
</template>

<style src="./RplTextLink.css" />
