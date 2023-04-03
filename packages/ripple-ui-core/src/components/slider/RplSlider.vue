<script setup lang="ts">
import { computed, ref, useSlots, watch } from 'vue'
import RplPagination from '../pagination/RplPagination.vue'
import { bpMin } from '../../lib/breakpoints'
import { RplSlidesPerView } from './constants'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectFade } from 'swiper'
import { useBreakpoints } from '@vueuse/core'
import 'swiper/css'
import 'swiper/css/effect-fade'
import { rplEventBus } from '../../index'

rplEventBus.register('rpl-button/click')
const emit = defineEmits(['change'])

interface Props {
  perView?: RplSlidesPerView
  showPagination?: boolean
  showTally?: boolean
  effect?: undefined | 'fade'
  currentSlide?: number
  label?: string
  contentType?: string
}

const props = withDefaults(defineProps<Props>(), {
  perView: 1,
  showPagination: true,
  showTally: false,
  effect: undefined,
  currentSlide: 0,
  label: undefined,
  contentType: 'item'
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

const slides = computed(
  () => slots?.default?.()?.[0].children || slots?.default?.() || []
)

const slidesInView = computed(() => {
  let bp = null

  if (Number.isInteger(props.perView)) {
    return props.perView
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

  return props.perView?.[bp] || 1
})

const totalPages = computed(() => {
  return slides.value.length - slidesInView.value + 1
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

const spaceBetween = computed(() => {
  if (isXLargeScreen.value) {
    return 28
  } else if (isMediumScreen.value) {
    return 24
  } else {
    return 16
  }
})

watch(
  () => props.currentSlide,
  (slide) => swiper.value.$el.swiper.slideTo(slide)
)

const paginationClick = (currentPage) => {
  swiper.value.$el.swiper.slideTo(currentPage - 1)
}

const slideUpdate = ({ activeIndex, slides }) => {
  activePage.value = activeIndex + 1
  emit('change', activeIndex)
  rplEventBus.emit('rpl-slider/slide', activeIndex)

  setInert({ activeIndex, slides })
}

const setInert = ({ activeIndex, slides }) =>
  slides.each((slide, index) =>
    slide.toggleAttribute(
      'inert',
      index < activeIndex || index >= activeIndex + slidesInView.value
    )
  )
</script>

<template>
  <div class="rpl-slider">
    <RplPagination
      v-if="showPagination && slides.length > 1 && totalPages > 1"
      variant="simple"
      :current-page="activePage"
      :total-pages="totalPages"
      :show-tally="showTally"
      :label="label"
      :content-type="contentType"
      class="rpl-slider__pagination"
      @change="paginationClick"
    />
    <Swiper
      ref="swiper"
      :space-between="spaceBetween"
      :initial-slide="currentSlide"
      :breakpoints="breakpoints"
      :modules="[EffectFade]"
      :effect="effect"
      :speed="300"
      :touchStartPreventDefault="false"
      class="rpl-slider__swiper"
      @after-init="setInert"
      @slide-change="slideUpdate"
    >
      <SwiperSlide
        v-for="(slide, i) in slides"
        :key="i"
        class="rpl-slider__slide"
        data-cy="slide"
      >
        <component :is="slide" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style src="./RplSlider.css" />
