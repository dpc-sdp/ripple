<template>
  <div class="rpl-card-carousel">
    <h2 v-if="title" class="rpl-card-carousel__title">{{ title }}</h2>
    <div class="rpl-card-carousel__slider">
      <carousel
        :perPage="slidesPerPage"
        :navigateTo="navTo"
        :mouseDrag="false"
        :paginationEnabled="false"
      >
        <slide v-for="(item, index) in cards" :key="index" class="rpl-card-carousel__slide">
          <component :is="item.name" v-bind="item.data"></component>
        </slide>
      </carousel>
      <div class="rpl-card-carousel__navigation">
        <button class="rpl-card-carousel__navigation-button rpl-card-carousel__navigation-button--prev" role="button" @click="prevSlide" :disabled="prevDisabled" :aria-label="previousLabel">
          <rpl-icon :symbol="prevIcon" :color="iconColor(prevDisabled)" size="1.6" />
        </button>
        <button class="rpl-card-carousel__navigation-button rpl-card-carousel__navigation-button--next" role="button" @click="nextSlide" :disabled="nextDisabled" :aria-label="nextLabel">
          <rpl-icon :symbol="nextIcon" :color="iconColor(nextDisabled)" size="1.6" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import breakpoint from '@dpc-sdp/ripple-global/mixins/breakpoint'
import RplIcon from '@dpc-sdp/ripple-icon'
import { Carousel, Slide } from 'vue-carousel'

import RplCardPromotion from './../CardPromotion.vue'
import RplCardEvent from './../CardEvent.vue'
import RplCardKeydates from './../CardKeydates.vue'
// TODO: Add future card components

export default {
  name: 'RplCardCarousel',
  mixins: [breakpoint],
  props: {
    title: String,
    cards: Array,
    previousLabel: { type: String, default: 'Go to previous slide' },
    nextLabel: { type: String, default: 'Go to next slide' }
  },
  components: {
    RplIcon,
    Carousel,
    Slide,
    RplCardPromotion,
    RplCardEvent,
    RplCardKeydates
  },
  data () {
    return {
      navTo: 0
    }
  },
  methods: {
    nextSlide () {
      this.navTo = ((this.navTo < this.totalSlides) ? (this.navTo + 1) : this.totalSlides)
    },
    prevSlide () {
      this.navTo = ((this.navTo > 0) ? (this.navTo - 1) : 0)
    },
    iconColor (isDisabled) {
      return isDisabled ? 'mid_neutral_1' : 'primary'
    }
  },
  computed: {
    slidesPerPage () {
      if (this.$breakpoint.l) {
        return 3
      } else if (this.$breakpoint.m) {
        return 2
      } else {
        return 1
      }
    },
    totalSlides () {
      return Math.ceil(this.cards.length / this.slidesPerPage) - 1
    },
    prevDisabled () {
      return this.navTo === 0
    },
    nextDisabled () {
      return this.navTo === this.totalSlides
    },
    prevIcon () {
      return (this.$breakpoint.l) ? 'arrow_left_secondary' : 'left'
    },
    nextIcon () {
      return (this.$breakpoint.l) ? 'arrow_right_secondary' : 'right'
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";

  $rpl-card-carousel-slide-gutter: $rpl-space * 6 !default;
  $rpl-card-carousel-title-ruleset: (
    'xs': ('l', 0.9em, 'bold'),
    'l': ('mega', 1.29em, 'bold')
  ) !default;
  $rpl-card-carousel-title-padding-xs: ($rpl-space * 6) !default;
  $rpl-card-carousel-title-padding-s: ($rpl-space * 8) !default;
  $rpl-card-carousel-title-right-margin: ($rpl-space * 14) !default;
  $rpl-card-carousel-title-text-color: rpl-color('extra_dark_neutral') !default;
  $rpl-card-carousel-padding-l: $rpl-space * 5 !default;
  $rpl-card-carousel-padding-xs: $rpl-space $rpl-space-2 !default;
  $rpl-card-carousel-inner-padding: $rpl-space-3 !default;
  $rpl-card-carousel-navigation-bottom-margin: $rpl-space-3 !default;

  .rpl-card-carousel {
    &__title {
      @include rpl_typography_ruleset($rpl-card-carousel-title-ruleset);
      color: $rpl-card-carousel-title-text-color;
      padding-left: $rpl-card-carousel-title-padding-xs;
      margin-right: $rpl-card-carousel-title-right-margin + $rpl-card-carousel-title-padding-xs;

      @include rpl_breakpoint('s') {
        padding-left: $rpl-card-carousel-title-padding-s;
        margin-right: $rpl-card-carousel-title-right-margin + $rpl-card-carousel-title-padding-s;
      }

      @include rpl_breakpoint('m') {
        padding-left: 0;
      }

      @include rpl_breakpoint('l') {
        margin-right: 0;
      }
    }

    &__slider {
      position: relative;
    }

    &__slide {
      box-sizing: border-box;

      @include rpl_breakpoint('m') {
        padding-left: $rpl-card-carousel-slide-gutter / 2;
        padding-right: $rpl-card-carousel-slide-gutter / 2;
      }
    }

    .VueCarousel-wrapper {
      @include rpl_breakpoint('m') {
        width: calc(100% + #{$rpl-card-carousel-slide-gutter});
        margin-left: -$rpl-card-carousel-slide-gutter / 2;
      }
    }

    .VueCarousel-inner {
      padding-bottom: $rpl-card-carousel-inner-padding;
    }

    &__navigation {
      position: absolute;
      bottom: 100%;
      right: 0;
      margin-bottom: $rpl-card-carousel-navigation-bottom-margin;
      margin-right: $rpl-card-carousel-title-padding-xs;

      @include rpl_breakpoint('s') {
        margin-right: $rpl-card-carousel-title-padding-s;
      }

      @include rpl_breakpoint('m') {
        margin-right: 0;
      }

      @include rpl_breakpoint('l') {
        position: static;
        margin-top: auto;
      }
    }

    &__navigation-button {
      border: 0;
      background-color: transparent;
      padding: $rpl-card-carousel-padding-xs;

      @include rpl_breakpoint('l') {
        position: absolute;
        padding: $rpl-card-carousel-padding-l;
        top: 50%;
      }

      &:not([disabled]) {
        cursor: pointer;
      }

      &--prev {
        @include rpl_breakpoint('l') {
          left: 0;
          transform: translateY(-50%) translateX(-100%);
        }
      }

      &--next {
        @include rpl_breakpoint('l') {
          right: 0;
          transform: translateY(-50%) translateX(100%);
        }
      }
    }
  }
</style>
