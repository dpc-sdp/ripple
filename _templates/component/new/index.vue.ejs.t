---
to: packages/ripple-ui-core/src/components/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.vue
---
<script lang="ts"> export default { name: '<%= h.rplcomponentname(name) %>' }</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { <%= h.rplcomponentname(name) %>Themes } from './constants'
defineProps({
  theme: {
    type: String as PropType<typeof <%= h.rplcomponentname(name) %>Themes[number]>,
    default: <%= h.rplcomponentname(name) %>Themes[0]
  }
})
</script>

<template>
  <div :className="`<%= h.rplclassname(name) %> <%= h.rplclassname(name) %>--${theme}`">
    TODO: <%= h.rplcomponentname(name) %> functionality
  </div>
</template>

<style src="./<%= h.changeCase.paramCase(name) %>.css" />
