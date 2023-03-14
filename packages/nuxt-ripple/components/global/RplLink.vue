<script setup lang="ts">
interface IRplLinkProps {
  url: string
  analytics?: {
    eventName: string
  }
}

withDefaults(defineProps<IRplLinkProps>(), {})
</script>

<template>
  <NuxtLink ref="link" :href="url">
    <slot />
  </NuxtLink>
</template>
