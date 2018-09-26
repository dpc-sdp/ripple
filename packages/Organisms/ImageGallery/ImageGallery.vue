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
      <button class="rpl-image-gallery__thumbnail-navigation-button rpl-image-gallery__thumbnail-navigation-button--prev" role="button" @click="prevSlide" :aria-label="previousLabel">
        <rpl-icon symbol="arrow_left_secondary" color="white" size="1.6" />
      </button>
      <button class="rpl-image-gallery__thumbnail-navigation-button rpl-image-gallery__thumbnail-navigation-button--next" role="button" @click="nextSlide" :aria-label="nextLabel">
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
                <button class="rpl-image-gallery__large-details-navigation-toggle" :class="{ 'rpl-image-gallery__large-details-navigation-toggle--expanded': toggleCaption}" @click="toggleCaption = !toggleCaption">View Caption</button>
              </div>
              <div class="rpl-image-gallery__large-details" :class="{ 'rpl-image-gallery__large-details--show': toggleCaption}">
                <h2 class="rpl-image-gallery__large-title">{{ (index + 1) }} / {{ totalSlides + 1 }} - {{ item.title }}</h2>
                <p class="rpl-image-gallery__large-caption">{{ item.caption }}</p>
              </div>
            </div>
          </slide>
        </carousel>
        <div class="rpl-image-gallery__large-navigation">
          <button class="rpl-image-gallery__large-navigation-button rpl-image-gallery__large-navigation-button--prev" role="button" @click="prevSlide" :aria-label="previousLabel">
            <rpl-icon symbol="arrow_left_secondary" color="white" size="2.8" />
          </button>
          <button class="rpl-image-gallery__large-navigation-button rpl-image-gallery__large-navigation-button--next" role="button" @click="nextSlide" :aria-label="nextLabel">
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
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";

  $rpl-image-gallery-thumbnail-border-color: rpl_color('mid_neutral_1') !default;
  $rpl-image-gallery-thumbnail-border-width: 1px !default;
  $rpl-image-gallery-thumbnail-border: $rpl-image-gallery-thumbnail-border-width solid $rpl-image-gallery-thumbnail-border-color !default;
  $rpl-image-gallery-thumbnail-background: rpl_color('white') !default;
  $rpl-image-gallery-thumbnail-details-padding: ($rpl-space * 6) !default;
  $rpl-image-gallery-thumbnail-border-radius: rem(4px) !default;

  .rpl-image-gallery {
    position: relative;

    &__enlarge {
      background-color: rpl-color('white');
      border: 0;
      padding: 0;
      position: absolute;
      top: $rpl-space-3;
      right: $rpl-space-3;
      width: 28px;
      height: 28px;
      z-index: 1000;
      border-radius: rem(4px);
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
      height: rem(309px);
    }

    &__thumbnail-details {
      padding: $rpl-image-gallery-thumbnail-details-padding;
    }

    &__thumbnail-title {
      @include rpl_typography_ruleset(('s', 1.5em, 'bold'));
      color: rpl-color('extra_dark_neutral');
      margin: 0 0 $rpl-space 0;
    }

    &__thumbnail-caption {
      @include rpl_typography_ruleset(('xs', 1.14em, 'regular'));
      color: rpl-color('extra_dark_neutral');
      margin: 0;
    }

    &__thumbnail-navigation {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      margin-top: ((309px / 2) - (32px / 2));
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
      // outline: 1px solid red;

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
      // outline: 1px solid yellow;
      width: 100%;
      position: absolute;
      height: calc(100vh - #{32px} - #{70px});
      margin-top: 70px;

      @include rpl-breakpoint('l') {
        bottom: 100%;
        height: calc(100vh - 100% - #{56px + 32px});
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
      border-radius: rem(4px);
      box-shadow: 0 27px 36px 0 rgba(0, 0, 0, 0.36);
      max-height: 100%;
      max-width: 100%;

      @include rpl-breakpoint('l') {
        max-width: calc(100% - #{$rpl-space * 15});
      }
    }

    &__large-details {
      // outline: 1px solid green;
      background-color: rgba(rpl-color('extra_dark_neutral'), 0.5);
      z-index: 1;
      position: absolute;
      bottom: 0;
      padding: 0 $rpl-space-3;
      margin-bottom: ($rpl-space * 8);
      display: none;

      @include rpl-breakpoint('l') {
        display: block;
        position: relative;
        padding: 0;
        background-color: transparent;
        margin-bottom: 64px;
      }

      &--show {
        display: block;
      }
    }

    &__large-title {
      @include rpl_typography_ruleset((
        'xs': ('s', 1em, 'bold'),
        'l': ('giga', 1.11em, 'bold')
      ));
      color: rpl-color('white');
    }

    &__large-caption {
      @include rpl_typography_ruleset((
        'xs': ('xs', 1.43em, 'regular'),
        'l': ('m', 1.33em, 'regular')
      ));
      color: rpl-color('white');
    }

    &__large-navigation {
      @include rpl-breakpoint('l') {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        justify-content: space-between;
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
      height: 32px;
      bottom: 0;
      left: 0;
      right: 0;

      @include rpl-breakpoint('l') {
        display: none;
      }
    }

    &__large-details-navigation-count {
      @include rpl_typography_ruleset(('s', 1em, 'bold'));
      color: rpl-color('white');
      float: left;
    }

    &__large-details-navigation-toggle {
      @include rpl_typography_ruleset(('xs', 1.14em, 'bold'));
      background-color: transparent;
      border: 0;
      padding: 0;
      margin: 0;
      color: rpl-color('white');
      cursor: pointer;
      float: right;

      &::after {
        content: '+';
        color: rpl-color('secondary');
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

      &:not([disabled]) {
        cursor: pointer;
      }
    }

    &__large-navigation-button--prev {
      margin-left: 32px;
    }

    &__large-navigation-button--next {
      margin-right: 32px;
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
