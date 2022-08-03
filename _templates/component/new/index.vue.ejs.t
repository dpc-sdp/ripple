---
to: packages/ripple-ui-core/src/components/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.vue
---
<script lang="ts"> export default { name: '<%= h.rplcomponentname(name) %>' }</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { <%= h.rplcomponentname(name) %>Variants } from './constants'
defineProps({
  variant: {
    type: String as PropType<typeof <%= h.rplcomponentname(name) %>Variants[number]>,
    default: <%= h.rplcomponentname(name) %>Variants[0]
  }
})
</script>

<template>
  <div :class="`<%= h.rplclassname(name) %> <%= h.rplclassname(name) %>--${variant}`">
    TODO: <%= h.rplcomponentname(name) %> functionality
  </div>
</template>

<style src="./<%= h.changeCase.paramCase(name) %>.css" />
