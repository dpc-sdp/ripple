<script setup lang="ts">
interface Props {
  targetId: string
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <a
    :class="{
      'rpl-skip-link': true,
      'rpl-type-p': true,
      'rpl-u-focusable-block': true,
      'rpl-u-focusable--force-on': true
    }"
    :href="`#${targetId}`"
  >
    <slot />
  </a>
</template>

<style src="./RplLayoutSkipLink.css" />
