<template>
  <RplLayoutPageComponent id="page-component-200" data-component-id="200" data-component-type="RplContent"
    :fullWidth="true">
    <RplContent :html="body"></RplContent>
  </RplLayoutPageComponent>
  <RplLayoutPageComponent>
    <RplButton el="a" :href="link.url">{{ link.text }}</RplButton>
  </RplLayoutPageComponent>
</template>

<script setup lang="ts">
import type { TideEventLink } from '../types'

interface Props {
  body: string
  link: TideEventLink
}

defineProps<Props>()
</script>
