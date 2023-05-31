---
to: components/Tide<%= h.changeCase.pascalCase(name) %>Body.vue
---
<template>
  <RplPageComponent class="tide-<%= h.changeCase.paramCase(name) %>">
    <RplContent :html="body" />
  </RplPageComponent>
</template>

<script setup lang="ts">
interface Props {
  body: string
}

defineProps<Props>()
</script>
