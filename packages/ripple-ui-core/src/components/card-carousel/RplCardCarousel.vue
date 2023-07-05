<script setup lang="ts">
import RplPromoCard from '../card/RplPromoCard.vue'
import RplKeyDatesCard from '../card/RplKeyDatesCard.vue'
import RplSlider from '../slider/RplSlider.vue'
import { IRplCardCarouselItem } from './constants'
import { RplSlidesPerView } from '../slider/constants'
import { formatDate, formatDateRange } from '../../lib/helpers'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

interface Props {
  perView?: RplSlidesPerView
  items: IRplCardCarouselItem[]
}

withDefaults(defineProps<Props>(), {
  perView: 1
})

const emit = defineEmits<{
  (e: 'paginate', payload: rplEventPayload): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-card-carousel', emit)

const handleChange = ({ action, value }) => {
  emitRplEvent(
    'paginate',
    {
      action,
      index: value + 1
    },
    { global: true }
  )
}
</script>

<template>
  <div class="rpl-card-carousel">
    <RplSlider :per-view="perView" @change="handleChange">
      <template v-for="(card, i) in items" :key="i">
        <RplPromoCard
          v-if="card.type === 'promo'"
          :url="card.url"
          :image="card.image"
          :title="card.title"
          :highlight="!card.image"
        >
          <template v-if="card?.meta" #meta>
            <span
              v-if="card.meta?.topic"
              class="rpl-card__topic"
              data-cy="topic"
            >
              {{ card.meta.topic }}
            </span>
            <span
              v-if="card?.meta?.dateStart && card?.meta?.dateEnd"
              data-cy="date"
            >
              {{
                formatDateRange(
                  {
                    from: card.meta.dateStart,
                    to: card.meta.dateEnd
                  },
                  { month: 'short' }
                )
              }}
            </span>
            <span v-if="card?.meta?.date" data-cy="date">
              {{ formatDate(card.meta.date) }}
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
