<template>
  <h1>{{ page.title }}</h1>
  <h2>FROM NPM MODULE</h2>
  <p>{{ page.summary }}</p>
  <a :href="page.link.url">{{ page.link.text }}</a>
</template>

<script setup lang="ts">
import type { RplTideEvent } from './../types'

defineProps<{
  page: RplTideEvent
}>()
</script>
