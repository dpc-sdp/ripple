<template>
  <h2 :id="id" class="rpl-type-h2 mb-4">
    <a :href="`#${id}`">
      <Icon class="w-5 h-5 text-slate-400 absolute -left-6" aria-hidden="true" name="akar-icons:link-chain" />
      <slot />
    </a>
  </h2>
</template>

<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<style scoped>
a>svg {
  display: none;
}

a:hover svg {
  display: inline;
}
</style>
