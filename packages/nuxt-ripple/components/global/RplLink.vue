<script setup lang="ts">
interface IRplLinkProps {
  url: string
}

const props = withDefaults(defineProps<IRplLinkProps>(), {})

const { $app_origin } = useNuxtApp()

const link = computed(() => {
  if ($app_origin && props.url?.startsWith($app_origin)) {
    return props.url.replace($app_origin, '')
  }

  return props.url
})
</script>

<template>
  <NuxtLink ref="link" :href="link">
    <slot />
  </NuxtLink>
</template>
