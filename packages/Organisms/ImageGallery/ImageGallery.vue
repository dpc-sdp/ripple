<template>
  <div class="rpl-image-gallery">
    <button class="rpl-image-gallery__enlarge" @click="openModal(0)">{{ enlargeText }}</button>
    <div class="rpl-image-gallery__thumbnails">
      <template v-for="(item, index) in galleryData">
        <div class="rpl-image-gallery__thumbnail" @click="openModal(index)" :key="item.id">
          <rpl-fitted-img v-if="index === 0" :img-src="item.image" :img-alt="item.alt" />
          <rpl-fitted-img v-else :img-src="item.thumbnail" :img-alt="item.alt" />
        </div>
      </template>
    </div>
    <div class="rpl-image-gallery__count" @click="openModal(0)">
      <div class="rpl-image-gallery__count-sm" v-cloak v-if="total >= thumbnailsNumber">+{{ countSm }}</div>
      <div class="rpl-image-gallery__count-md" v-cloak v-if="total > thumbnailsNumber">+{{ countMd }}</div>
    </div>
    <rpl-image-gallery-modal v-if="showModal" @close="showModal = false">
      <rpl-image-gallery-slides slot="body" :items-data="galleryData"></rpl-image-gallery-slides>
    </rpl-image-gallery-modal>
  </div>
</template>

<script>
import RplFittedImg from './FittedImg.vue'
import RplImageGalleryModal from './ImageGalleryModal.vue'
import RplImageGallerySlides from './ImageGallerySlides.vue'

export default {
  name: 'RplImageGallery',
  components: {
    RplFittedImg,
    RplImageGalleryModal,
    RplImageGallerySlides
  },
  props: {
    galleryData: Array,
    enlargeText: String
  },
  data: function () {
    return {
      total: null,
      thumbnailsNumber: 6,
      countSm: null,
      countMd: null,
      showModal: false,
      imageId: 0
    }
  },
  methods: {
    countForSmallScreen () {
      return this.total - this.thumbnailsNumber + 2
    },
    countForNormalScreen () {
      return this.total - this.thumbnailsNumber
    },
    openModal (index) {
      this.showModal = true
      this.imageId = index
    }
  },
  mounted () {
    this.total = this.galleryData.length
    this.countSm = this.countForSmallScreen()
    this.countMd = this.countForNormalScreen()
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";
  @import "./scss/imagegallery";

  .rpl-image-gallery {
    position: relative;

    &__enlarge {
      // @include icon('enlarge', 'after');
      position: absolute;
      top: 0;
      right: 0;
      z-index: $_zindex-middle;
      background-color: $_color-overlay;
      color: $_color-text-on-overlay;
      font-size: rem(12px);
      line-height: rem(30px);
      height: rem(30px);
      padding: 0 rem(40px) 0 rem(8px);

      &::after {
        position: absolute;
        top: rem(4px);
        right: rem(8px);
        font-size: rem(22px);
      }
    }

    &__thumbnails {
      display: flex;
      flex-wrap: wrap;
      margin-left: -$_thumbnail-gutter;
    }

    &__thumbnail {
      display: none;
      position: relative;
      cursor: pointer;
      box-sizing: border-box;
      margin-left: $_thumbnail-gutter;

      &:first-child {
        width: calc(100% - #{$_thumbnail-gutter});
        display: block;
        margin-bottom: 1px;

        img {
          height: rem(240px);

          @include rpl-breakpoint('s') {
            height: rem(300px);
          }

          @include rpl-breakpoint('m') {
            height: rem(400px);
          }

          @include rpl-breakpoint('xxl') {
            height: rem(500px);
          }
        }
      }

      &:not(:first-child) {
        height: $_thumbnail-height;
        overflow: hidden;

        @include rpl-breakpoint('xxl') {
          height: $_thumbnail-height * 1.2;
        }

        &::before {
          display: block;
          position: absolute;
          background-color: $_color-overlay;
          width: 100%;
          height: 100%;
          content: '';
        }

        img {
          height: $_thumbnail-height;

          @include rpl-breakpoint('xxl') {
            height: $_thumbnail-height * 1.2;
          }
        }
      }

      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(4) {
        width: calc(33.33% - #{$_thumbnail-gutter});
        display: block;
      }

      @include rpl-breakpoint('m') {
        &:nth-child(2),
        &:nth-child(3),
        &:nth-child(4),
        &:nth-child(5),
        &:nth-child(6) {
          width: calc(20% - #{$_thumbnail-gutter});
          display: block;
        }
      }

      img {
        @include object_fit_image(cover);
        width: 100%;
        display: block;
      }

    }

    &__count {
      font-size: $font-size-xlg;
      line-height: $font-size-xlg;
      color: $_color-text-on-overlay;
      text-align: center;
      position: absolute;
      bottom: rem(32px);
      right: 15%;

      @include rpl-breakpoint('m') {
        font-size: $font-size-xmega;
        line-height: $font-size-xmega;
        right: 9%;
      }

      &-sm {
        @include rpl-breakpoint('m') {
          display: none;
        }
      }

      &-md {
        display: none;

        @include rpl-breakpoint('m') {
          display: block;
        }
      }
    }
  }
</style>
