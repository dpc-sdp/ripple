<template>
  <div class="rpl-image-gallery__slides slider js_percentage percentage" @mouseover="mouseOver" @mouseleave="mouseLeave">
    <div class="frame js_frame">
      <ul class="slides js_slides">
        <li class="rpl-image-gallery__slide js_slide"
            v-for="item in itemsData"
            :key="item.id"
        >
          <div class="rpl-image-gallery__slide-image">
            <div class="loader">Loading...</div>
            <rpl-fitted-img :img-src="item.image" :img-alt="item.alt" />
          </div>
          <div class="rpl-image-gallery__slide-caption" v-html="item.caption"></div>
        </li>
      </ul>
    </div>
    <button class="js_prev prev" v-show="hover">prev</button>
    <button class="js_next next" v-show="hover">next</button>
  </div>
</template>

<script>
import RplFittedImg from './FittedImg.vue'

export default {
  name: 'RplImageSlides',
  components: {
    RplFittedImg
  },
  props: {
    itemsData: { type: Array, required: true }
  },
  data () {
    return {
      hover: false
    }
  },
  methods: {
    mouseOver: function () {
      this.hover = true
    },
    mouseLeave: function () {
      this.hover = false
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";
  @import "./scss/imagegallery";

  .rpl-image-gallery {
    &__slides {
      position: relative;
      width: 100%;

      .frame {
        width: 100%;
        position: relative;
        margin: 0 auto;
        font-size: 0;
        line-height: 0;
        overflow: hidden;
        white-space: nowrap;
      }

      .slides {
        display: block;
        margin: 0;
      }

      li {
        position: relative;
        display: inline-block;
        width: 100%;
        text-align: center;
      }

      .next {
        // @include icon('chevron-right');
        right: 6%;

        @include rpl-breakpoint('m') {
          right: $_modal-padding-md;
        }

        @include rpl-breakpoint('l') {
          right: $_modal-padding-lg;
        }
      }

      .prev {
        // @include icon('chevron-left');
        left: 6%;

        @include rpl-breakpoint('m') {
          left: $_modal-padding-md;
        }

        @include rpl-breakpoint('l') {
          left: $_modal-padding-lg;
        }
      }

      .prev,
      .next {
        position: absolute;
        top: $_slide-height-sm / 2;
        margin-top: rem(-30px);
        font-size: 0;

        &::before {
          display: block;
          width: rem(60px);
          height: rem(60px);
          cursor: pointer;
          background-color: $_color-overlay;
          color: $_color-text-on-overlay;
          border-radius: rem(30px);
          font-size: $font-size-xlg;
          line-height: rem(60px);
          text-align: center;

          // Rem Line-height does not work in Pseudo elements in IE 11 on Win 8.1 and Win 7.
          // See https://paulund.co.uk/rem-line-height-doesnt-work-pseudo-elements-ie
          @include ie10_plus {
            line-height: 60px;
          }
        }

        @include rpl-breakpoint('xs') {
          top: $_slide-height-xs / 2;
        }

        @include rpl-breakpoint('s') {
          top: $_slide-height-sm-landscape / 2;
        }

        @include rpl-breakpoint('m') {
          top: $_slide-height-md / 2;
        }

        @include rpl-breakpoint('xxl') {
          top: $_slide-height-lg / 2;
        }
      }
    }

    &__slide {
      padding-bottom: rem(150px);

      @include rpl-breakpoint('m') {
        padding-bottom: rem(120px);
      }
    }

    &__slide-caption {
      font-size: $font-size-regular;
      color: $_color-text-on-overlay;
      line-height: $font-size-regular;
      white-space: normal;
      position: absolute;
      left: 0;
      right: 0;
      margin: $_modal-padding-md auto 0;
      padding: 0 $_modal-padding-sm;

      @include rpl-breakpoint('m') {
        font-size: $font-size-xlg;
        line-height: $font-size-xlg;
      }

      p {
        color: $_color-text-on-overlay;
        margin: 0;
      }
    }

    &__slide-image {
      img {
        @include object_fit_image(contain);
        width: 100%;
        height: $_slide-height-sm;

        @include rpl-breakpoint('xs') {
          height: $_slide-height-xs;
        }

        @include rpl-breakpoint('s') {
          height: $_slide-height-sm-landscape;
        }

        @include rpl-breakpoint('m') {
          height: $_slide-height-md;
        }

        @include rpl-breakpoint('xxl') {
          height: $_slide-height-lg;
        }
      }
    }

    .loader {
      position: absolute;
      top: calc(50% - 6.5rem);
      left: calc(50% - 1.25rem);
      z-index: -1;
    }
  }
</style>
