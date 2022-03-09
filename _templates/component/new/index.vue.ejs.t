---
to: packages/ripple-ui-core/src/components/<%= h.changeCase.paramCase(name) %>/index.vue
---
<script setup lang="ts">
import { PropType } from 'vue'

defineProps({
  theme: {
    type: String as PropType<'primary' | 'secondary'>,
    default: 'primary'
  }
})
</script>

<template>
  <div :className="`rpl-ui-<%= h.changeCase.paramCase(name) %> rpl-ui-<%= h.changeCase.paramCase(name) %>--${theme}`">
    TODO: write component <%= name %>
  </div>
</template>

<style>
@import './index.css';
</style>
