<template>
  <h2 :id="id" class="rpl-type-h2">
    <a :href="`#${id}`">
      <slot />
    </a>
  </h2>
</template>

<script setup lang="ts">
defineProps<{ id: string }>()
</script>
