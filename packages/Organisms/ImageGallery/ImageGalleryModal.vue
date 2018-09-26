<template>
  <div class="rpl-image-gallery__modal-mask">
    <div class="rpl-image-gallery__modal-container">
      <button class="rpl-image-gallery__modal-close" @click="closeModal()">
        <rpl-icon symbol="close" color="white" size="3.375" /><span>Close</span>
      </button>
      <div class="rpl-image-gallery__modal-body">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { RplIcon } from '@dpc-sdp/ripple-icon'

export default {
  name: 'RplImageGalleryModal',
  components: {
    RplIcon
  },
  methods: {
    closeModal () {
      this.$emit('close')
    },
    keyNav (event) {
      var key = event.which || event.keyCode
      switch (key) {
        case 27:
          this.closeModal()
          break
      }
    }
  },
  mounted () {
    if (process.browser) {
      window.addEventListener('keyup', this.keyNav)
    }
  },
  destroyed () {
    if (process.browser) {
      window.removeEventListener('keyup', this.keyNav)
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";

  .rpl-image-gallery {
    &__modal-mask {
      position: fixed;
      z-index: 9998;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rpl-color('extra_dark_neutral');
      display: flex;
      align-items: center;
    }

    &__modal-container {
      padding: 0;
      width: calc(100% - #{($rpl-space * 30)});
      margin-left: ($rpl-space * 15);
      margin-right: ($rpl-space * 15);
    }

    &__modal-close {
      position: absolute;
      background: transparent;
      top: ($rpl-space * 8);
      right: ($rpl-space * 8);
      border: 0;
      margin: 0;
      padding: 0;
      cursor: pointer;
      z-index: 1;

      svg {
        display: block;
      }

      span {
        @include rpl_visually_hidden;
      }
    }
  }
</style>
