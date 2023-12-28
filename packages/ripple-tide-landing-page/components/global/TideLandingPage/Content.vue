<script setup lang="ts">
import { TideDynamicPageComponentBase } from '@dpc-sdp/nuxt-ripple/types'

interface Props extends TideDynamicPageComponentBase {
  html: string
}

defineProps<Props>()
</script>

<template>
  <RplContent :html="html" />
</template>
