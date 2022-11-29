<script lang="ts">
export default { name: 'RplSlider' }
</script>

<script setup lang="ts">
import { computed, ref, useSlots, watch } from 'vue'
import RplPagination from '../pagination/pagination.vue'
import { bpMin } from '../../lib/breakpoints'
import { RplSlidesPerView } from './constants'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectFade } from 'swiper'
import { useBreakpoints } from '@vueuse/core'
import 'swiper/css'
import 'swiper/css/effect-fade'

const emit = defineEmits(['change'])

interface Props {
  perView?: RplSlidesPerView
  showPagination?: boolean
  showTally?: boolean
  effect?: undefined | 'fade'
  currentSlide?: number
  autoHeight?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  perView: 1,
  showPagination: true,
  showTally: false,
  effect: undefined,
  currentSlide: 0,
  autoHeight: false
})

const swiper = ref()
const activePage = ref()
const slots = useSlots()
const bp = useBreakpoints(bpMin)

const isXSmallScreen = bp.greaterOrEqual('xs')
const isSmallScreen = bp.greaterOrEqual('s')
const isMediumScreen = bp.greaterOrEqual('m')
const isLargeScreen = bp.greaterOrEqual('l')
const isXLargeScreen = bp.greaterOrEqual('l')

const cards = computed(
  () => slots?.default?.()?.[0].children || slots?.default?.() || []
)

const totalPages = computed(() => {
  let bp = null
  let total = cards.value.length

  if (Number.isInteger(props.perView)) {
    return total
  }

  if (isXLargeScreen.value && props.perView?.xl) {
    bp = 'xl'
  } else if (isLargeScreen.value && props.perView?.l) {
    bp = 'l'
  } else if (isMediumScreen.value && props.perView?.m) {
    bp = 'm'
  } else if (isSmallScreen.value && props.perView?.s) {
    bp = 's'
  } else if (isXSmallScreen.value && props.perView?.xs) {
    bp = 'xs'
  }

  return total - props.perView?.[bp] + 1
})

const breakpoints = computed(() => {
  let breakpoints = {}

  if (Number.isInteger(props.perView)) {
    breakpoints[0] = { slidesPerView: props.perView }
  } else {
    Object.keys(props.perView).forEach((bp) => {
      breakpoints[bpMin[bp]] = { slidesPerView: props.perView[bp] }
    })
  }

  return breakpoints
})

watch(
  () => props.currentSlide,
  (slide) => swiper.value.$el.swiper.slideTo(slide)
)

const paginationClick = (currentPage) => {
  swiper.value.$el.swiper.slideTo(currentPage - 1)
}

const slideUpdate = ({ activeIndex }) => {
  activePage.value = activeIndex + 1
  emit('change', activeIndex)
}
</script>

<template>
  <div class="rpl-slider">
    <RplPagination
      v-if="showPagination && cards.length > 1"
      variant="simple"
      :current-page="activePage"
      :total-pages="totalPages"
      :show-tally="showTally"
      class="rpl-slider__pagination"
      @change="paginationClick"
    />
    <Swiper
      ref="swiper"
      :space-between="20"
      :initial-slide="currentSlide"
      :breakpoints="breakpoints"
      :modules="[EffectFade]"
      :effect="effect"
      :autoHeight="autoHeight"
      class="rpl-slider__swiper"
      @slide-change="slideUpdate"
    >
      <SwiperSlide
        v-for="(card, i) in cards"
        :key="i"
        class="rpl-slider__slide"
      >
        <component :is="card" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style src="./slider.css" />
