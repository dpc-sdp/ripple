<script lang="ts">
export default { name: 'RplTag' }
</script>

<script setup lang="ts">
import { RplTagVariants } from './constants'

interface Props {
  variant?: typeof RplTagVariants[number],
  label?: string,
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  label: '',
})
</script>

<template>
  <span :className="`rpl-tag rpl-tag--${variant} rpl-type-label-small`">{{
    label
  }}</span>
</template>

<style src="./tag.css" />
