<script setup lang="ts">
type RplTagVariants = ['default', 'neutral', 'dark']

interface Props {
  variant?: RplTagVariants[number]
  label?: string
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  label: ''
})
</script>

<template>
  <span :class="`rpl-tag rpl-tag--${variant} rpl-type-label-small`">{{
    label
  }}</span>
</template>

<style src="./RplTag.css" />
