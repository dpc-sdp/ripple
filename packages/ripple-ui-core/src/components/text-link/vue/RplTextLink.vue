<script setup lang="ts">
import { computed, useAttrs } from 'vue'

interface Props {
  url: string
  text?: string
}

defineProps<Props>()

const openInNewWindow = computed(() => useAttrs()['target'] === '_blank')
</script>

<template>
  <RplLink ref="link" class="rpl-text-link rpl-u-focusable-inline" :url="url">
    <slot>{{ text }}</slot>
    <span v-if="openInNewWindow" class="rpl-u-visually-hidden">
      (opens in a new window)
    </span>
  </RplLink>
</template>

<style src="./RplTextLink.css" />
