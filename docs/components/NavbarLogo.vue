<script setup lang="ts">
import { useDocus } from '#imports'

const { theme } = useDocus()
</script>

<template>
  <NuxtLink class="flex items-center" to="/" :aria-label="theme?.header?.title">
    <img class="w-8" src="/assets/img/Favicon_Ripple2.png" width="100" />
    <span class="flex text-sm font-bold mx-2"> Ripple 2 </span>
  </NuxtLink>
</template>
