<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useHead } from '#imports'
import hideAlertsOnLoadScript from './utils/hideAlertsOnLoadScript.js'

useHead({
  script: [
    {
      innerHTML: hideAlertsOnLoadScript
    }
  ]
})
</script>
