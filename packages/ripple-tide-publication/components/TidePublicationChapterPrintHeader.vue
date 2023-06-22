<script lang="ts">
export default { name: 'TidePublicationChapters' }
</script>

<template>
  <div class="tide-chapter-print-header">
    <h2 class="rpl-type-h1">{{ title }}</h2>
    <p class="rpl-type-p-large">{{ summary }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  summary: string
}

defineProps<Props>()
</script>

<style scoped>
.tide-chapter-print-header {
  margin-top: var(--rpl-sp-11);
  padding-top: var(--rpl-sp-9);
  border-top: var(--rpl-border-1) solid var(--rpl-clr-neutral-300);
}
</style>
