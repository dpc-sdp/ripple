<script setup lang="ts">
interface Props {
  width?: 'xs' | 's' | 'm' | 'l' | 'full'
  effect?: 'stripe' | 'fade'
}

withDefaults(defineProps<Props>(), {
  width: 'full',
  effect: 'stripe'
})
</script>

<template>
  <div :class="`rpl-skeleton rpl-skeleton--${width} rpl-skeleton--${effect}`">
    <slot>&nbsp;</slot>
  </div>
</template>

<style src="./RplSkeleton.css" />
