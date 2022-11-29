<script lang="ts">
export default { name: 'RplCardCarousel' }
</script>

<script setup lang="ts">
import RplPromoCard from '../card/promo-card.vue'
import RplSlider from '../slider/slider.vue'
import { RplCardCarouselItem } from '../card-carousel/constants'
import { RplSlidesPerView } from '../slider/constants'

interface Props {
  perView?: RplSlidesPerView
  items: RplCardCarouselItem[]
}

withDefaults(defineProps<Props>(), {
  perView: 1
})
</script>

<template>
  <div class="rpl-card-carousel">
    <RplSlider :per-view="perView">
      <RplPromoCard
        v-for="(card, i) in items"
        :key="i"
        :url="card.url"
        :title="card.title"
        :highlight="true"
      >
        <p>{{ card.content }}</p>
      </RplPromoCard>
    </RplSlider>
  </div>
</template>

<style src="./card-carousel.css" />
