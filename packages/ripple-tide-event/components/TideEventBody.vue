<template>
  <RplPageComponent
    id="page-component-200"
    data-component-id="200"
    data-component-type="RplContent"
    :fullWidth="true"
  >
    <RplContent :html="body"></RplContent>
  </RplPageComponent>
  <RplPageComponent v-if="link">
    <RplButton el="a" :href="link.url">{{ link.text }}</RplButton>
  </RplPageComponent>
</template>

<script setup lang="ts">
import type { TideEventLink } from '../types'

interface Props {
  body: string
  link?: TideEventLink
}

withDefaults(defineProps<Props>(), {
  link: undefined
})
</script>
