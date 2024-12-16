<template>
  <h3>{{ title }}</h3>
  <div v-html="description" />
  <p>{{ testCustomProp }}</p>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  testCustomProp: string
}

defineProps<Props>()
</script>
