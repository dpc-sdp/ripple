<template>
  <div>
    <h1>{{ page.title }}</h1>
  </div>
</template>

<script setup lang="ts">
import type TideLandingPagePage from './../types'

defineProps<{
  page: TideLandingPagePage
}>()
</script>
