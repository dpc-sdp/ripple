---
to: packages/ripple-ui-core/src/components/<%= h.changeCase.paramCase(name) %>/<%= h.rplcomponentname(name) %>.vue
---
<script setup lang="ts">
import { <%= h.rplcomponentname(name) %>Variants } from './constants'

interface Props {
  variant?: typeof <%= h.rplcomponentname(name) %>Variants[number],
}

withDefaults(defineProps<Props>(), {
  variant: 'default'
})
</script>

<template>
  <div :class="`<%= h.rplclassname(name) %> <%= h.rplclassname(name) %>--${variant}`">
    TODO: <%= h.rplcomponentname(name) %> functionality
  </div>
</template>

<style src="./<%= h.changeCase.paramCase(name) %>.css" />
