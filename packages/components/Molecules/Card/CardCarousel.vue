<template>
  <div class="rpl-card-carousel" :class="childErrorClass">
    <rpl-dev-error v-if="gotChildError" :errors="childErrors" />
    <h2 v-if="title" class="rpl-card-carousel__title">{{ title }}</h2>
    <div class="rpl-card-carousel__slider">
      <carousel
        v-if="showCarousel"
        :perPage="slidesPerPage"
        :navigateTo="navTo"
        :mouseDrag="false"
        :paginationEnabled="false"
      >
        <slide v-for="(item, index) in cards" :key="index" class="rpl-card-carousel__slide">
          <div class="rpl-card-carousel__slide-wrap">
            <component :is="item.name" v-bind="item.data" :trimFieldEventBus="isTrimmed(item.name) ? eventBus : null" :trimFieldUpdateOnResize="false" data-tid="carousel-card"></component>
          </div>
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
import Vue from 'vue'
import breakpoint from '@dpc-sdp/ripple-global/mixins/breakpoint'
import provideChildCols from '@dpc-sdp/ripple-global/mixins/ProvideChildCols'
import catchChildError from '@dpc-sdp/ripple-global/mixins/catch-child-error'
import { RplDevError } from '@dpc-sdp/ripple-global'

import RplIcon from '@dpc-sdp/ripple-icon'
import RplCardPromo from './CardPromo.vue'
import RplCardPromotion from './CardPromotion.vue'
import RplCardEvent from './CardEvent.vue'
import RplCardKeydates from './CardKeydates.vue'
// TODO: Add future card components

export default {
  name: 'RplCardCarousel',
  mixins: [breakpoint, provideChildCols, catchChildError],
  props: {
    title: String,
    cards: Array,
    previousLabel: { type: String, default: 'Go to previous slide' },
    nextLabel: { type: String, default: 'Go to next slide' },
    childColsBp: { type: Object, default: () => ({ l: 4, m: 6 }) },
    totalGridColumns: { type: Number, default: 12 },
    catchChildError: {
      type: Boolean,
      default: true
    }
  },
  components: {
    RplIcon,
    RplCardPromo,
    RplCardPromotion,
    RplCardEvent,
    RplCardKeydates,
    RplDevError,
    Carousel: () => import('vue-carousel').then(m => m.Carousel),
    Slide: () => import('vue-carousel').then(m => m.Slide)
  },
  data () {
    return {
      navTo: 0,
      eventBus: new Vue(),
      observer: null,
      lastCarouselInnerFlexBasis: null,
      showCarousel: false,
      // Define which cards use cardtrimfield. These will be given the eventBus
      // object and their resize will be invoked on carousel size changes.
      trimmedCards: [
        'rpl-card-event',
        'rpl-card-promotion'
      ]
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
    },
    updateTrimFields (mutations) {
      if (mutations && mutations.length >= 1) {
        const currentFlexBasis = mutations[0].target.style.flexBasis
        if (currentFlexBasis !== this.lastCarouselInnerFlexBasis) {
          this.eventBus.$emit('setTrimFieldMaxHeight')
          this.lastCarouselInnerFlexBasis = currentFlexBasis
        }
      }
    },
    isTrimmed (name) {
      return (this.trimmedCards.indexOf(name) >= 0)
    }
  },
  computed: {
    slidesPerPage () {
      if (this.childColsBp && this.totalGridColumns) {
        // Determine # of cards to display based on defined column breakpoints.
        for (let i = this.breakpointsSmallToLarge.length - 1; i >= 0; i--) {
          const bp = this.breakpointsSmallToLarge[i].label
          if (this.childColsBp[bp] && this.$breakpoint[bp]) {
            return this.totalGridColumns / this.childColsBp[bp]
          }
        }
      }
      return 1
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
  },
  mounted () {
    // This is a workaround for allow Vue Carousel work in SSR.
    // Need to wait for official SSR support.
    // https://github.com/SSENSE/vue-carousel/issues/192
    this.showCarousel = true
    // Update card size on Carousel width change.
    if (typeof MutationObserver !== 'undefined') {
      this.observer = new MutationObserver(this.updateTrimFields)
      const carouselInner = this.$el.querySelector('.VueCarousel-inner')
      if (carouselInner) {
        this.observer.observe(this.$el.querySelector('.VueCarousel-inner'), { attributes: true })
      }
    }
  },
  destroyed () {
    // Update card size on Carousel width change.
    if (typeof MutationObserver !== 'undefined') {
      this.observer.disconnect()
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-card-carousel-slide-gutter: $rpl-space * 6 !default;
  $rpl-card-carousel-title-ruleset: (
    'xs': ('l', 0.9em, 'bold'),
    'l': ('mega', 1.29em, 'bold')
  ) !default;
  $rpl-card-carousel-title-text-color: rpl-color('extra_dark_neutral') !default;
  $rpl-card-carousel-padding-l: $rpl-space * 5 !default;
  $rpl-card-carousel-padding-xs: $rpl-space $rpl-space-2 !default;
  $rpl-card-carousel-inner-padding: $rpl-space-3 !default;
  $rpl-card-carousel-navigation-bottom-margin: $rpl-space-3 !default;

  .rpl-card-carousel {
    &__title {
      @include rpl_typography_ruleset($rpl-card-carousel-title-ruleset);
      color: $rpl-card-carousel-title-text-color;
    }

    &__slider {
      position: relative;
    }

    &__slide {
      box-sizing: border-box;

    }

    &__slide-wrap {
      height: 100%;
      @include rpl_breakpoint('m') {
        margin-left: $rpl-card-carousel-slide-gutter / 2;
        margin-right: $rpl-card-carousel-slide-gutter / 2;
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

      @include rpl_print {
        display: block;
        transform: none;

        .VueCarousel-slide {
          margin-bottom: $rpl-space-4;
        }
      }
    }

    &__navigation {
      position: absolute;
      bottom: 100%;
      right: 0;
      margin-bottom: $rpl-card-carousel-navigation-bottom-margin;

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

  .ripple-dev-mode {
    .rpl-card-carousel {
      &.rpl-child-component-error {
        background-color: $rpl-child-component-error-bg-color;
      }
    }
  }
</style>
