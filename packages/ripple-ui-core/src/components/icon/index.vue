<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true
  },
  core: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <svg
    v-if="core"
    class="rpl-icon"
    :class="`rpl-icon--${name}`"
    aria-hidden="true"
  >
    <use :xlink:href="`#rpl-icon--${name}`" />
  </svg>
  <component
    :is="import(`../../assets/icons/custom/${name}.svg`)"
    v-else
    class="rpl-icon"
    :class="`rpl-icon--${name}`"
    aria-hidden="true"
  />
</template>

<style>
@import './icon.css';
</style>
