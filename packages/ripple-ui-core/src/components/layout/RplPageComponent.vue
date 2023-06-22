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

<template>
  <div
    :class="{
      'rpl-page-component': true,
      'rpl-page-component--full-width': fullWidth
    }"
  >
    <h2
      v-if="title"
      class="rpl-type-h2 rpl-u-margin-b-2"
      data-cy="page-component-title"
    >
      {{ title }}
    </h2>
    <slot></slot>
  </div>
</template>

<style src="./RplPageComponent.css" />
