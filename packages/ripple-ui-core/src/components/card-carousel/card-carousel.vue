<script lang="ts">
export default { name: 'RplCardCarousel' }
</script>

<script setup lang="ts">
import RplTag from '../tag/tag.vue'
import RplPromoCard from '../card/promo-card.vue'
import RplKeyDatesCard from '../card/key-dates-card.vue'
import RplSlider from '../slider/slider.vue'
import { RplCardCarouselItem } from './constants'
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
      <template v-for="(card, i) in items" :key="i">
        <RplPromoCard
          v-if="card.type === 'promo'"
          :url="card.url"
          :image="card.image"
          :title="card.title"
          :highlight="!card.image"
        >
          <template v-if="card?.meta" #meta>
            <RplTag
              v-if="card.meta?.topic"
              :label="card.meta.topic"
              variant="neutral"
            />
            <span v-if="card?.meta?.dateStart && card?.meta?.dateEnd">
              {{ card.meta.dateStart }} to {{ card.meta.dateEnd }}
            </span>
            <span v-if="card?.meta?.date">
              {{ card.meta.date }}
            </span>
          </template>
          <p v-if="card.summary">{{ card.summary }}</p>
        </RplPromoCard>
        <RplKeyDatesCard
          v-if="card.type === 'keydates'"
          :ctaTitle="card.title"
          :items="card.keyDates"
        />
      </template>
    </RplSlider>
  </div>
</template>
