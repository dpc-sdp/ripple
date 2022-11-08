<script lang="ts">
export default { name: 'RplPageComponent' }
</script>

<template>
  <div
    :class="{
      'rpl-page-component': true,
      'rpl-page-component--full-width': fullWidth
    }"
  >
    <h2 v-if="title" class="rpl-type-h2 rpl-u-margin-b-2">{{ title }}</h2>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
export interface Props {
  title?: string
  fullWidth?: boolean
}

withDefaults(defineProps<Props>(), {
  title: '',
  fullWidth: false
})
</script>

<style src="./page-component.css" />
