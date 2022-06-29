<script lang="ts">
export default { name: 'RplTag' }
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { RplTagThemes } from './constants'
defineProps({
  theme: {
    type: String as PropType<typeof RplTagThemes[number]>,
    default: RplTagThemes[0]
  },
  label: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <span :className="`rpl-tag rpl-tag--${theme} rpl-type-label-small`">{{
    label
  }}</span>
</template>

<style src="./tag.css" />
