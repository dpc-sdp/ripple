<template>
  <h1>{{ title }}</h1>
</template>
<script setup lang="ts">
// TODO: Add Introbanner component when ready
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>
