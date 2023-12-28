<script setup lang="ts">
import { computed, ref } from 'vue'
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
  keyDatesTitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  perView: 1,
  keyDatesTitle: 'Key calendar dates'
})

const emit = defineEmits<{
  (e: 'paginate', payload: rplEventPayload & { action: 'prev' | 'next' }): void
  (e: 'swipe', payload: rplEventPayload & { action: 'prev' | 'next' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-card-carousel', emit)

const activeSlide = ref(0)

const handleChange = ({ type, action, text, value }) => {
  activeSlide.value = value

  emitRplEvent(
    type,
    {
      action,
      text,
      index: value + 1
    },
    { global: true }
  )
}

const changeNotice = computed(() => {
  if (props.items.length > 0) {
    return props.items[activeSlide.value].type === 'keydates'
      ? props.keyDatesTitle
      : props.items[activeSlide.value].title
  }
  return false
})
</script>

<template>
  <div class="rpl-card-carousel">
    <RplSlider
      :per-view="perView"
      :change-notice="changeNotice"
      @change="handleChange"
    >
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
          :title="keyDatesTitle"
          :ctaTitle="card.title"
          :url="card.url"
          :items="card.keyDates"
        />
      </template>
    </RplSlider>
  </div>
</template>
