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
            <div class="rpl-image-gallery__large-image-wrapper">
              <img class="rpl-image-gallery__large-image" :src="item.image" :alt="item.alt" />
            </div>
            <div class="rpl-image-gallery__large-details">
              <h2 class="rpl-image-gallery__large-title">{{ (index + 1) }} / {{ totalSlides + 1 }} - {{ item.title }}</h2>
              <p class="rpl-image-gallery__large-caption">{{ item.caption }}</p>
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
      navTo: 0
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
      display: flex;
      flex-wrap: wrap;
      align-content: space-evenly;
      padding-top: (56px + 32px);
    }

    &__large-image-wrapper {
      text-align: center;
      width: 100%;
      max-height: 70%;
    }

    &__large-image {
      border-radius: rem(4px);
      box-shadow: 0 27px 36px 0 rgba(0, 0, 0, 0.36);
      width: auto;
      max-height: 100%;
      max-width: calc(100% - #{$rpl-space * 15})
    }

    &__large-details {

    }

    &__large-title {
      @include rpl_typography_ruleset(('giga', 1.11em, 'bold'));
      color: rpl-color('white');
    }

    &__large-caption {
      @include rpl_typography_ruleset(('m', 1.33em, 'regular'));
      color: rpl-color('white');
    }

    &__large-navigation {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      justify-content: space-between;
      display: flex;
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
