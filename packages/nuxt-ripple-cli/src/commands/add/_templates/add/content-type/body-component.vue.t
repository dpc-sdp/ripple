---
to: components/Tide<%= h.pascalCaseMerge(name) %>Body.vue
---
<template>
  <RplPageComponent class="tide-<%= h.changeCase.paramCase(name) %>">
    <RplContent :html="bodyContent" />
  </RplPageComponent>
</template>

<script setup lang="ts">
interface Props {
  bodyContent: string
}

defineProps<Props>()
</script>
