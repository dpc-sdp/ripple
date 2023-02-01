<template>
  <h3 :id="id" class="rpl-type-h3 mb-4">
    <a :href="`#${id}`">
      <slot />
    </a>
  </h3>
</template>

<script setup lang="ts">
defineProps<{ id: string }>()
</script>
