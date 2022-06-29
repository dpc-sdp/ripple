<script lang="ts">
export default { name: 'RplTag' }
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { RplTagVariants } from './constants'
defineProps({
  variant: {
    type: String as PropType<typeof RplTagVariants[number]>,
    default: RplTagVariants[0]
  },
  label: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <span :className="`rpl-tag rpl-tag--${variant} rpl-type-label-small`">{{
    label
  }}</span>
</template>

<style src="./tag.css" />
