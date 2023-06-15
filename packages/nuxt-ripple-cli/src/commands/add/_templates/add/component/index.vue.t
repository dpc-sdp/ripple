---
to: <%= h.changeCase.kebabCase(name) %>/<%= h.prefixedPascalCase(prefix, name) %>.vue
---
<script setup lang="ts">
interface Props {
  example?: string
}

withDefaults(defineProps<Props>(), {
  example: 'TODO: add <%= name %> functionality'
})
</script>

<template>
  <div class="<%= h.prefixedParamCase(prefix, name) %>">
    {{ example }}
  </div>
</template>

<style src="./<%= h.prefixedPascalCase(prefix, name) %>.css" />
