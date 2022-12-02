<script setup lang="ts">
import { RplCardCarousel } from '@dpc-sdp/ripple-ui-core'
import { computed } from 'vue'

const props =
  defineProps<{
    id: string
    title: string
    items: Array<any>
    hasSidebar: boolean
  }>()

const perView = computed(() => {
  if (props.hasSidebar) {
    return { xs: 1, l: 2 }
  }

  return { xs: 1, m: 2, l: 3 }
})
</script>

<template>
  <h2 v-if="title" class="rpl-type-h2">{{ title }}</h2>

  <RplCardCarousel :id="id" :items="items" :per-view="perView" />
</template>
