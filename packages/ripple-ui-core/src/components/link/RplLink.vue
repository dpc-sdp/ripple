<script setup lang="ts">
interface IRplLinkProps {
  url: string
}

withDefaults(defineProps<IRplLinkProps>(), {})
</script>

<template>
  <a :href="url">
    <slot />
  </a>
</template>
