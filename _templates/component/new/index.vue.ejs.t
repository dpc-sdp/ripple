---
to: packages/ripple-ui-core/src/components/<%= h.changeCase.paramCase(name) %>/<%= name %>.vue
---
<script setup lang="ts">
import { PropType } from 'vue'
import type { RplTheme } from './../../types/ripple'
defineProps({
  theme: {
    type: String as PropType<RplTheme>,
    default: 'primary'
  }
})
</script>

<template>
  <div :className="`rpl-<%= h.changeCase.paramCase(name) %> rpl-<%= h.changeCase.paramCase(name) %>--${theme}`">
    TODO: write component Rpl<%= name %>
  </div>
</template>

<style>
@import './<%= h.changeCase.paramCase(name) %>.css';
</style>
