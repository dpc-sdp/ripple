<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <svg
    class="rpl-icon"
    :class="`rpl-icon--${name}`"
    aria-hidden="true"
  >
    <use :href="name" />
  </svg>
</template>

<style>
@import './icon.css';
</style>
