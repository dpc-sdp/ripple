---
to: <%= h.changeCase.kebabCase(name) %>/Rpl<%= h.changeCase.pascalCase(name) %>.vue
---
<script setup lang="ts">

interface IRpl<%= h.changeCase.pascalCase(name) %>{
  example: string
}

withDefaults(defineProps<IRpl<%= h.changeCase.pascalCase(name) %>>(), {
  example: 'TODO: add <%= name %> functionality'
})
</script>

<template>
  <div :class="`rpl-<%= h.changeCase.paramCase(name) %>`">
    {{ example }}
  </div>
</template>

<style src="./Rpl<%= h.changeCase.pascalCase(name) %>.css" />
