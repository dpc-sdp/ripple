<script setup lang="ts">
import { computed, ref, useSlots, watch, onMounted } from 'vue'
import RplPagination from '../pagination/RplPagination.vue'
import { bpMin } from '../../lib/breakpoints'
import { RplSlidesPerView } from './constants'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectFade } from 'swiper'
import { useBreakpoints } from '@vueuse/core'
import 'swiper/css'
import 'swiper/css/effect-fade'
import { useComputedSpeed } from '../../composables/useComputedSpeed'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

interface Props {
  perView?: RplSlidesPerView
  showPagination?: boolean
  showTally?: boolean
  effect?: undefined | 'fade'
  currentSlide?: number
  label?: string
  contentType?: string
  itemElement?: string
  wrapperElement?: string
  changeNotice?: boolean | string
}

const props = withDefaults(defineProps<Props>(), {
  perView: 1,
  showPagination: true,
  showTally: false,
  effect: undefined,
  currentSlide: 0,
  label: undefined,
  contentType: 'item',
  itemElement: 'li',
  wrapperElement: 'ul',
  changeNotice: true
})

const emit = defineEmits<{
  (e: 'change', payload: rplEventPayload & { action: 'prev' | 'next' }): void
}>()

const mounted = ref(false)
const container = ref()
const swiper = ref()
const activePage = ref(1)
const paginate = ref(false)
const slots = useSlots()
const bp = useBreakpoints(bpMin)
const speed = useComputedSpeed(container, '--rpl-motion-speed-6', 240)
const { emitRplEvent } = useRippleEvent('rpl-slider', emit)

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

onMounted(() => (mounted.value = true))

const paginationClick = ({ action, text, value }) => {
  paginate.value = true
  swiper.value.$el.swiper.slideTo(value - 1)

  emitRplEvent('change', {
    type: 'paginate',
    action,
    text,
    value: value - 1
  })
}

const slideUpdate = ({ activeIndex, slides }) => {
  const previousPage = activePage.value || 1
  activePage.value = activeIndex + 1
  setInert({ activeIndex, slides })

  if (paginate.value) {
    paginate.value = false
  } else {
    emitRplEvent('change', {
      type: 'swipe',
      action: activePage.value > previousPage ? 'next' : 'prev',
      value: activeIndex
    })
  }
}

const setInert = ({ activeIndex, slides }) =>
  slides.each((slide, index) =>
    slide.toggleAttribute(
      'inert',
      index < activeIndex || index >= activeIndex + slidesInView.value
    )
  )

const slideChangeNotice = computed(() => {
  const items =
    slidesInView.value > 1
      ? `${activePage.value} to ${activePage.value + (slidesInView.value - 1)}`
      : `${activePage.value}`

  let notice = `Showing ${props.contentType} ${items} of ${slides.value.length}`

  return typeof props.changeNotice === 'string'
    ? `${notice}, ${props.changeNotice}`
    : notice
})
</script>

<template>
  <div ref="container" class="rpl-slider">
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
      :speed="speed"
      :touchStartPreventDefault="false"
      :wrapper-tag="wrapperElement"
      class="rpl-slider__swiper"
      @after-init="setInert"
      @active-index-change="slideUpdate"
    >
      <SwiperSlide
        v-for="(slide, i) in slides"
        :key="i"
        :tag="itemElement"
        class="rpl-slider__slide"
        data-cy="slide"
      >
        <component :is="slide" />
      </SwiperSlide>
    </Swiper>
    <div
      v-if="mounted && changeNotice"
      aria-live="polite"
      aria-atomic="true"
      class="rpl-u-visually-hidden"
    >
      {{ slideChangeNotice }}
    </div>
  </div>
</template>

<style src="./RplSlider.css" />
