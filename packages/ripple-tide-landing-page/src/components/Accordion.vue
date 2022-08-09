<template>
  <h2 v-if="title" class="rpl-type-h2">{{ title }}</h2>
  <RplAccordion :id="`${id}`" :items="items" :numbered="numbered" />
</template>

<script setup lang="ts">
defineProps({
  id: {
    type: [String, Number],
    required: true
  },
  numbered: {
    type: Boolean,
    default: false
  },
  title: {
    type: [String, undefined],
    default: undefined
  },
  items: {
    type: Array,
    required: true
  }
})
</script>
