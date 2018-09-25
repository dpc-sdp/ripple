<template>
  <transition name="modal">
    <div class="rpl-image-gallery__modal-mask">
      <div class="rpl-image-gallery__modal-wrapper">
        <div class="rpl-image-gallery__modal-container">
          <div class="rpl-image-gallery__modal-header">
            <button class="rpl-image-gallery__modal-close" @click="$emit('close')">
              Close
            </button>
          </div>
          <div class="rpl-image-gallery__modal-body">
            <slot name="body">
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'RplImageGalleryModal',
  data () {
    return {
      slider: null
    }
  },
  methods: {
    keyNav (event) {
      var key = event.which || event.keyCode
      switch (key) {
        case 39:
        case 40:
          this.slider.next()
          break
        case 37:
        case 38:
          this.slider.prev()
          break
        case 27:
          this.$parent.showModal = false
          break
      }
    },
    loryInit: async function () {
      const Lory = await import('lory.js')
      this.slider = Lory.lory(this.$el.querySelector('.slider'), {
        infinite: 1
      })
      this.slider.slideTo(this.$parent.imageId)
      window.addEventListener('keyup', this.keyNav)
    }
  },
  mounted () {
    this.loryInit()
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";
  @import "./scss/imagegallery";

  .rpl-image-gallery {
    &__modal-mask {
      position: fixed;
      z-index: 9998;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: $_color-overlay-dark;
      display: table;
      transition: opacity .3s ease;
    }

    &__modal-wrapper {
      display: table-cell;
      vertical-align: middle;
    }

    &__modal-container {
      // @include site_container;
      padding: 0;
      transition: opacity .3s ease;

      @include rpl-breakpoint('m') {
        padding: 0 $_modal-padding-lg;
      }

      @include rpl-breakpoint('l') {
        padding: 0 $_modal-padding-xl;
      }
    }

    &__modal-close {
      // @include button_reset;
      // @include icon('cross', 'after');
      font-size: 0;
      float: right;

      &::after {
        color: $_color-text-on-overlay;
        display: block;
        font-size: $font-size-regular;
        width: rem(24px);
        height: rem(24px);

        @include rpl-breakpoint('xl') {
          font-size: $font-size-mega;
        }
      }
    }

    &__modal-header {
      overflow: hidden;
    }

    &__modal-body {
      margin: 0;
    }

    &__modal-default-button {
      float: right;
    }

    &__modal-enter,
    &__modal-leave-active {
      opacity: 0;
    }

    &__modal-leave-active {
      .modal-container {
        transform: scale(1.1);
      }
    }

    &__modal-enter {
      .modal-container {
        transform: scale(1.1);
      }
    }
  }
</style>
