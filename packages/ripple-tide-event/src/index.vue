<template>
  <div>
    <h1>{{ page.title }}</h1>
    <h2>FROM NPM MODULE</h2>
    <p>{{ page.summary }}</p>
    <div v-if="page.link">
      <p>{{ page.link?.url }}</p>
      <a :href="page.link?.url">{{ page.link.text }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type TideEventPage from './../types'

defineProps<{
  page: TideEventPage
}>()
</script>
