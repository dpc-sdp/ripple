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
      <button v-if="navTo > 0" class="rpl-image-gallery__thumbnail-navigation-button rpl-image-gallery__thumbnail-navigation-button--prev" @click="prevSlide" :aria-label="previousLabel">
        <rpl-icon symbol="arrow_left_secondary" color="white" size="1.6" />
      </button>
      <button v-if="navTo < totalSlides" class="rpl-image-gallery__thumbnail-navigation-button rpl-image-gallery__thumbnail-navigation-button--next" @click="nextSlide" :aria-label="nextLabel">
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
          <slide v-for="(item, index) in galleryData" :key="index">
            <rpl-fullscreen-image
              :image="{ src: item.image, alt: item.alt }"
              :title="item.title"
              :caption="item.caption"
              :aboveCaption="`${(index + 1)} / ${totalSlides + 1}`"
            />
          </slide>
        </carousel>
        <div class="rpl-image-gallery__large-navigation">
          <button :disabled="navTo === 0" class="rpl-image-gallery__large-navigation-button rpl-image-gallery__large-navigation-button--prev" @click="prevSlide" :aria-label="previousLabel">
            <rpl-icon symbol="arrow_left_secondary" :color="arrowColor" :size="arrowSize" />
          </button>
          <button :disabled="navTo === totalSlides" class="rpl-image-gallery__large-navigation-button rpl-image-gallery__large-navigation-button--next" @click="nextSlide" :aria-label="nextLabel">
            <rpl-icon symbol="arrow_right_secondary" :color="arrowColor" :size="arrowSize" />
          </button>
        </div>
      </template>
    </rpl-image-gallery-modal>
  </div>
</template>

<script>
import breakpoint from '@dpc-sdp/ripple-global/mixins/breakpoint'
import RplFittedImg from './FittedImg.vue'
import RplImageGalleryModal from './ImageGalleryModal.vue'
import RplFullscreenImage from './FullscreenImage.vue'
import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'RplImageGallery',
  mixins: [breakpoint],
  components: {
    RplFittedImg,
    RplImageGalleryModal,
    RplFullscreenImage,
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
    },
    arrowSize () {
      return this.$breakpoint.l ? '2.8' : '0.7'
    },
    arrowColor () {
      return this.$breakpoint.l ? 'white' : 'secondary'
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
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
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
  $rpl-image-gallery-thumbnail-border: 1px solid $rpl-image-gallery-thumbnail-border-color !default;
  $rpl-image-gallery-thumbnail-background: rpl_color('white') !default;
  $rpl-image-gallery-thumbnail-details-padding: ($rpl-space * 6) !default;
  $rpl-image-gallery-thumbnail-border-radius: rem(4px) !default;

  .rpl-image-gallery {
    position: relative;

    @include rpl_print_hidden;

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
      align-content: flex-start;
      box-sizing: border-box;
      border-bottom: $rpl-image-gallery-thumbnail-border;
      background-color: $rpl-image-gallery-thumbnail-background;
      border: $rpl-image-gallery-thumbnail-border;
      border-radius: $rpl-image-gallery-thumbnail-border-radius;
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

    &__large-navigation {
      display: flex;
      position: absolute;
      left: $rpl-space * 13;
      height: $rpl-space-4;
      bottom: $rpl-image-gallery-fullscreen-details-navigation-padding-bottom;

      @include rpl-breakpoint('l') {
        top: 50%;
        left: 0;
        right: 0;
        bottom: auto;
        height: auto;
        transform: translateY(-50%);
      }
    }

    &__large-navigation-button {
      background-color: transparent;
      border: 0;
      margin: 0;
      padding: 0 $rpl-space-4;
      display: flex;

      &:not([disabled]) {
        cursor: pointer;
      }

      &[disabled] {
        opacity: 0;
      }

      @include rpl-breakpoint('l') {
        padding: 0;
        display: block;
      }
    }

    &__large-navigation-button--prev {
      @include rpl-breakpoint('l') {
        margin-left: $rpl-image-gallery-modal-edge-margin-l;
        margin-right: auto;
      }
    }

    &__large-navigation-button--next {
      @include rpl-breakpoint('l') {
        margin-left: auto;
        margin-right: $rpl-image-gallery-modal-edge-margin-l;
      }
    }

    &__modal-body {
      height: 100%;

      .VueCarousel,
      .VueCarousel-wrapper,
      .VueCarousel-inner {
        // Force 100% height to override inline auto height introduced in:
        // https://github.com/SSENSE/vue-carousel/commit/f1e631427f533b5f7846f95fa7099abd818e1683
        height: 100% !important; // sass-lint:disable-line no-important
      }
    }
  }
</style>
