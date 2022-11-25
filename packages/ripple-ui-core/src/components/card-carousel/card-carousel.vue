<script lang="ts">
export default { name: 'RplCardCarousel' }
</script>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import RplPagination from '../pagination/pagination.vue'
import { bpMin } from '../../lib/breakpoints'
import { RplSlidesPerView } from './constants'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useBreakpoints } from '@vueuse/core'
import 'swiper/css'

interface Props {
  perView?: RplSlidesPerView
}

const props = withDefaults(defineProps<Props>(), {
  perView: 1
})

const slots = useSlots()
const bp = useBreakpoints(bpMin)

const swiper = ref()
const activePage = ref()

const isXSmallScreen = bp.greaterOrEqual('xs')
const isSmallScreen = bp.greaterOrEqual('s')
const isMediumScreen = bp.greaterOrEqual('m')
const isLargeScreen = bp.greaterOrEqual('l')
const isXLargeScreen = bp.greaterOrEqual('l')

const cards = computed(() => slots?.default?.() || [])

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

const paginationClick = (currentPage) => {
  swiper.value.$el.swiper.slideTo(currentPage - 1)
}

const slideUpdated = ({ activeIndex }) => {
  activePage.value = activeIndex + 1
}
</script>

<template>
  <div class="rpl-card-carousel">
    <RplPagination
      variant="simple"
      :current-page="activePage"
      :total-pages="totalPages"
      class="rpl-card-carousel__pagination"
      @change="paginationClick"
    />
    <Swiper
      ref="swiper"
      :space-between="20"
      :breakpoints="breakpoints"
      @slide-change="slideUpdated"
    >
      <SwiperSlide
        v-for="(card, i) in cards"
        :key="i"
        class="rpl-card-carousel__slide"
      >
        <component :is="card" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style src="./card-carousel.css" />
