<script setup lang="ts">
import { RplAccordion } from '#components'

defineProps<{
  id: string
  title: string
  numbered: boolean
  items: Array<any>
}>()
</script>

<template>
  <h2 v-if="title" class="rpl-type-h2">{{ title }}</h2>
  <RplAccordion :id="id" :items="items" :numbered="numbered" />
</template>
