<template>
  <h4 class="rpl-type-h4 docs-h4" :id="id">
    <slot />
  </h4>
</template>

<script setup lang="ts">
defineProps<{ id?: string }>()
</script>
