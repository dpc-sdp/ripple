<script setup lang="ts">
import { computed } from 'vue'
import { ITideCardCarouselItem } from '../../../mapping/components/card-carousel/card-carousel-mapping'

const props = defineProps<{
  title?: string
  items: ITideCardCarouselItem[]
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
  <RplCardCarousel v-if="items.length > 0" :items="items" :per-view="perView" />
</template>
