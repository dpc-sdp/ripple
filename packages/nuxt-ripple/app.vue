<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useHead } from '#imports'

useHead({
  script: [
    {
      src: '/scripts/alerts-script.js'
    }
  ]
})
</script>
