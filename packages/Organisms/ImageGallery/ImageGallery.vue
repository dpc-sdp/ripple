<template>
  <div class="rpl-image-gallery">
    <button class="rpl-image-gallery__enlarge" @click="openModal()" :aria-label="enlargeText">
      <rpl-icon symbol="fullscreen" color="primary" size="2.33" />
    </button>
    <carousel
      :perPage="1"
      :navigateTo="navTo"
      :loop="true"
      :mouseDrag="false"
      :paginationEnabled="false"
      @pageChange="onPageChange"
    >
      <slide v-for="(item, index) in galleryData" :key="index" class="rpl-image-gallery__thumbnail">
        <rpl-fitted-img class="rpl-image-gallery__thumbnail-image" :img-src="item.thumbnail" :img-alt="item.alt" />
        <div class="rpl-image-gallery__thumbnail-details">
          <h2 class="rpl-image-gallery__thumbnail-title">{{ (index + 1) }} / {{ totalSlides + 1 }} - {{ item.title }}</h2>
          <p class="rpl-image-gallery__thumbnail-caption">{{ item.caption }}</p>
        </div>
      </slide>
    </carousel>
    <div class="rpl-image-gallery__thumbnail-navigation">
      <button v-if="navTo > 0" class="rpl-image-gallery__thumbnail-navigation-button rpl-image-gallery__thumbnail-navigation-button--prev" role="button" @click="prevSlide" :aria-label="previousLabel">
        <rpl-icon symbol="arrow_left_secondary" color="white" size="1.6" />
      </button>
      <button v-if="navTo < totalSlides" class="rpl-image-gallery__thumbnail-navigation-button rpl-image-gallery__thumbnail-navigation-button--next" role="button" @click="nextSlide" :aria-label="nextLabel">
        <rpl-icon symbol="arrow_right_secondary" color="white" size="1.6" />
      </button>
    </div>
    <!-- Modal -->
    <rpl-image-gallery-modal v-if="showModal" @close="showModal = false">
      <template slot="body">
        <carousel
          :perPage="1"
          :navigateTo="navTo"
          :loop="true"
          :mouseDrag="false"
          :paginationEnabled="false"
          @pageChange="onPageChange"
        >
          <slide v-for="(item, index) in galleryData" :key="index" class="rpl-image-gallery__large">
            <div class="rpl-image-gallery__large-details-and-image">
              <div class="rpl-image-gallery__large-image-wrapper">
                <div class="rpl-image-gallery__large-image-sub-wrapper">
                  <img class="rpl-image-gallery__large-image" :src="item.image" :alt="item.alt" />
                </div>
              </div>
              <div class="rpl-image-gallery__large-details-navigation">
                <div v-if="!toggleCaption" class="rpl-image-gallery__large-details-navigation-count">{{ (index + 1) }} / {{ totalSlides + 1 }}</div>
                <button class="rpl-image-gallery__large-details-navigation-toggle" :class="{ 'rpl-image-gallery__large-details-navigation-toggle--expanded': toggleCaption}" @click="toggleCaption = !toggleCaption">
                  <span v-if="!toggleCaption">View caption</span>
                  <span v-if="toggleCaption">Close caption</span>
                </button>
              </div>
              <div class="rpl-image-gallery__large-details" :class="{ 'rpl-image-gallery__large-details--show': toggleCaption}">
                <h2 class="rpl-image-gallery__large-title">{{ (index + 1) }} / {{ totalSlides + 1 }} - {{ item.title }}</h2>
                <p class="rpl-image-gallery__large-caption">{{ item.caption }}</p>
              </div>
            </div>
          </slide>
        </carousel>
        <div class="rpl-image-gallery__large-navigation">
          <button v-if="navTo > 0" class="rpl-image-gallery__large-navigation-button rpl-image-gallery__large-navigation-button--prev" role="button" @click="prevSlide" :aria-label="previousLabel">
            <rpl-icon symbol="arrow_left_secondary" color="white" size="2.8" />
          </button>
          <button v-if="navTo < totalSlides" class="rpl-image-gallery__large-navigation-button rpl-image-gallery__large-navigation-button--next" role="button" @click="nextSlide" :aria-label="nextLabel">
            <rpl-icon symbol="arrow_right_secondary" color="white" size="2.8" />
          </button>
        </div>
      </template>
    </rpl-image-gallery-modal>
  </div>
</template>

<script>
import RplFittedImg from './FittedImg.vue'
import RplImageGalleryModal from './ImageGalleryModal.vue'
import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'RplImageGallery',
  components: {
    RplFittedImg,
    RplImageGalleryModal,
    Carousel,
    Slide
  },
  props: {
    galleryData: Array,
    enlargeText: String,
    previousLabel: { type: String, default: 'Go to previous slide' },
    nextLabel: { type: String, default: 'Go to next slide' }
  },
  data: function () {
    return {
      showModal: false,
      navTo: 0,
      toggleCaption: false
    }
  },
  computed: {
    totalSlides () {
      return this.galleryData.length - 1
    }
  },
  methods: {
    openModal () {
      this.showModal = true
    },
    nextSlide () {
      this.navTo = ((this.navTo < this.totalSlides) ? (this.navTo + 1) : 0)
    },
    prevSlide () {
      this.navTo = ((this.navTo > 0) ? (this.navTo - 1) : this.totalSlides)
    },
    onPageChange (slideNumber) {
      this.navTo = slideNumber
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";
  @import "./scss/image_gallery";

  $rpl-image-gallery-enlarge-background-color: rpl-color('white') !default;
  $rpl-image-gallery-enlarge-border-radius: rem(4px) !default;

  $rpl-image-gallery-thumbnail-title-ruleset: ('s', 1.5em, 'bold') !default;
  $rpl-image-gallery-thumbnail-title-text-color: rpl-color('extra_dark_neutral') !default;
  $rpl-image-gallery-thumbnail-title-margin: 0 0 $rpl-space 0 !default;
  $rpl-image-gallery-thumbnail-caption-ruleset: ('xs', 1.14em, 'regular') !default;
  $rpl-image-gallery-thumbnail-caption-text-color: rpl-color('extra_dark_neutral') !default;
  $rpl-image-gallery-thumbnail-caption-margin: 0 !default;
  $rpl-image-gallery-thumbnail-image-height: rem(309px) !default;
  $rpl-image-gallery-thumbnail-navigation-margin-top: ($rpl-image-gallery-thumbnail-image-height / 2) - (rem(32px) / 2) !default;
  $rpl-image-gallery-thumbnail-border-color: rpl_color('mid_neutral_1') !default;
  $rpl-image-gallery-thumbnail-border-width: 1px !default;
  $rpl-image-gallery-thumbnail-border: $rpl-image-gallery-thumbnail-border-width solid $rpl-image-gallery-thumbnail-border-color !default;
  $rpl-image-gallery-thumbnail-background: rpl_color('white') !default;
  $rpl-image-gallery-thumbnail-details-padding: ($rpl-space * 6) !default;
  $rpl-image-gallery-thumbnail-border-radius: rem(4px) !default;

  $rpl-image-gallery-large-image-box-shadow: 0 ($rpl-space * 7) ($rpl-space * 9) 0 rgba(0, 0, 0, 0.36) !default;
  $rpl-image-gallery-large-image-border-radius: rem(4px) !default;
  $rpl-image-gallery-large-details-mobile-background-image: linear-gradient(to bottom, rgba($rpl-image-gallery-modal-background-color, 0), rgba($rpl-image-gallery-modal-background-color, 0) rem(50px), rgba($rpl-image-gallery-modal-background-color, 0.9) rem(94px), $rpl-image-gallery-modal-background-color rem(120px)) !default;
  $rpl-image-gallery-large-details-padding: ($rpl-space * 17) $rpl-space-3 ($rpl-space * 8) !default;
  $rpl-image-gallery-large-details-navigation-height: ($rpl-space * 8) !default;
  $rpl-image-gallery-large-image-wrapper-offset-top-xs: rem(70px) !default;
  $rpl-image-gallery-large-image-wrapper-offset-top-l: rem(114px) !default;
  $rpl-image-gallery-large-title-ruleset: (
    'xs': ('s', 1em, 'bold'),
    'l': ('giga', 1.11em, 'bold')
  ) !default;
  $rpl-image-gallery-large-title-text-color: rpl-color('white') !default;
  $rpl-image-gallery-large-caption-ruleset: (
    'xs': ('xs', 1.43em, 'regular'),
    'l': ('m', 1.33em, 'regular')
  ) !default;
  $rpl-image-gallery-large-caption-text-color: rpl-color('white') !default;
  $rpl-image-gallery-large-count-ruleset: ('s', 1em, 'bold') !default;
  $rpl-image-gallery-large-count-text-color: rpl-color('white') !default;
  $rpl-image-gallery-large-nav-toggle-ruleset: ('xs', 1.14em, 'bold') !default;
  $rpl-image-gallery-large-nav-toggle-text-color: rpl-color('white') !default;
  $rpl-image-gallery-large-nav-toggle-icon-color: rpl-color('secondary') !default;

  .rpl-image-gallery {
    position: relative;

    &__enlarge {
      background-color: $rpl-image-gallery-enlarge-background-color;
      border: 0;
      padding: 0;
      position: absolute;
      top: $rpl-space-3;
      right: $rpl-space-3;
      width: rem(28px);
      height: rem(28px);
      z-index: 1;
      border-radius: $rpl-image-gallery-enlarge-border-radius;
      cursor: pointer;

      svg {
        display: block;
      }
    }

    &__thumbnail {
      position: relative;
      overflow: hidden;
      display: flex;
      flex-wrap: wrap;
      align-content: start;
      box-sizing: border-box;
      border-bottom: $rpl-image-gallery-thumbnail-border;
      background-color: $rpl-image-gallery-thumbnail-background;
      border: $rpl-image-gallery-thumbnail-border;
      border-width: 0;

      @include rpl_breakpoint('m') {
        border-radius: $rpl-image-gallery-thumbnail-border-radius;
        border-width: $rpl-image-gallery-thumbnail-border-width;
      }
    }

    &__thumbnail-image {
      @include object_fit_image(cover);
      width: 100%;
      height: $rpl-image-gallery-thumbnail-image-height;
    }

    &__thumbnail-details {
      padding: $rpl-image-gallery-thumbnail-details-padding;
    }

    &__thumbnail-title {
      @include rpl_typography_ruleset($rpl-image-gallery-thumbnail-title-ruleset);
      color: $rpl-image-gallery-thumbnail-title-text-color;
      margin: $rpl-image-gallery-thumbnail-title-margin;
    }

    &__thumbnail-caption {
      @include rpl_typography_ruleset($rpl-image-gallery-thumbnail-caption-ruleset);
      color: $rpl-image-gallery-thumbnail-caption-text-color;
      margin: $rpl-image-gallery-thumbnail-caption-margin;
    }

    &__thumbnail-navigation {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      margin-top: $rpl-image-gallery-thumbnail-navigation-margin-top;
    }

    &__thumbnail-navigation-button {
      background-color: transparent;
      position: absolute;
      border: 0;
      margin: 0;
      padding: 0;

      &:not([disabled]) {
        cursor: pointer;
      }

      &--prev {
        left: ($rpl-space * 6);
      }

      &--next {
        right: ($rpl-space * 6);
      }
    }

    // =========================================================================

    &__large {
      @include rpl-breakpoint('l') {
        display: flex;
        align-items: flex-end;
      }
    }

    &__large-details-and-image {
      display: inline-block;
      position: relative;
      width: 100%;
      height: 100vh;

      @include rpl-breakpoint('l') {
        height: auto;
      }
    }

    &__large-image-wrapper {
      width: 100%;
      position: absolute;
      height: calc(100vh - #{$rpl-image-gallery-large-image-wrapper-offset-top-xs} - #{$rpl-image-gallery-large-details-navigation-height});
      margin-top: $rpl-image-gallery-large-image-wrapper-offset-top-xs;

      @include rpl-breakpoint('l') {
        bottom: 100%;
        height: calc(100vh - 100% - #{$rpl-image-gallery-large-image-wrapper-offset-top-l});
        margin-top: 0;
      }
    }

    &__large-image-sub-wrapper {
      position: relative;
      height: 100%;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: center;
    }

    &__large-image {
      border-radius: $rpl-image-gallery-large-image-border-radius;
      box-shadow: $rpl-image-gallery-large-image-box-shadow;
      max-height: 100%;
      max-width: 100%;

      @include rpl-breakpoint('l') {
        max-width: calc(100% - #{$rpl-space * 15});
      }
    }

    &__large-details {
      display: none;
      background-image: $rpl-image-gallery-large-details-mobile-background-image;
      z-index: 1;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: $rpl-image-gallery-large-details-padding;

      @include rpl-breakpoint('l') {
        display: block;
        position: relative;
        padding: 0;
        background-color: transparent;
        background-image: none;
        margin-bottom: ($rpl-space * 16);
      }

      &--show {
        display: block;
      }
    }

    &__large-title {
      @include rpl_typography_ruleset($rpl-image-gallery-large-title-ruleset);
      color: $rpl-image-gallery-large-title-text-color;
    }

    &__large-caption {
      @include rpl_typography_ruleset($rpl-image-gallery-large-caption-ruleset);
      color: $rpl-image-gallery-large-caption-text-color;
    }

    &__large-navigation {
      @include rpl-breakpoint('l') {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        display: flex;
        transform: translateY(-50%);
      }
    }

    &__large-details-navigation {
      width: 100%;
      justify-content: space-between;
      padding: 0 $rpl-space-4 $rpl-space-4;
      box-sizing: border-box;
      position: absolute;
      vertical-align: top;
      height: $rpl-image-gallery-large-details-navigation-height;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 2;

      @include rpl-breakpoint('l') {
        display: none;
      }
    }

    &__large-details-navigation-count {
      @include rpl_typography_ruleset($rpl-image-gallery-large-count-ruleset);
      color: $rpl-image-gallery-large-count-text-color;
      float: left;
    }

    &__large-details-navigation-toggle {
      @include rpl_typography_ruleset($rpl-image-gallery-large-nav-toggle-ruleset);
      color: $rpl-image-gallery-large-nav-toggle-text-color;
      background-color: transparent;
      border: 0;
      padding: 0;
      margin: 0;
      cursor: pointer;
      float: right;

      &::after {
        content: '+';
        color: $rpl-image-gallery-large-nav-toggle-icon-color;
        margin-left: $rpl-space;
      }

      &--expanded {
        &::after {
          content: '-';
        }
      }
    }

    &__large-navigation-button {
      background-color: transparent;
      border: 0;
      margin: 0;
      padding: 0;
      display: block;

      &:not([disabled]) {
        cursor: pointer;
      }
    }

    &__large-navigation-button--prev {
      margin-left: $rpl-image-gallery-modal-edge-margin-l;
      margin-right: auto;
    }

    &__large-navigation-button--next {
      margin-left: auto;
      margin-right: $rpl-image-gallery-modal-edge-margin-l;
    }

    &__modal-body {
      height: 100vh;

      .VueCarousel,
      .VueCarousel-wrapper,
      .VueCarousel-inner {
        height: 100%;
      }
    }
  }
</style>
