<template>
  <div class="rpl-image-gallery__modal-mask">
    <div class="rpl-image-gallery__modal-container">
      <button class="rpl-image-gallery__modal-close" @click="closeModal()">
        <rpl-icon symbol="close" color="white" :size="iconSize" /><span>Close</span>
      </button>
      <rpl-quick-exit class="rpl-image-gallery__modal__quickexit"  v-if="rplOptions.quickexit" />
      <div class="rpl-image-gallery__modal-body">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { isClient } from '@dpc-sdp/ripple-global/utils/helpers.js'
import breakpoint from '@dpc-sdp/ripple-global/mixins/breakpoint'
import { RplIcon } from '@dpc-sdp/ripple-icon'
import RplQuickExit from '@dpc-sdp/ripple-layout/QuickExit.vue'

export default {
  name: 'RplImageGalleryModal',
  mixins: [breakpoint],
  components: {
    RplIcon,
    RplQuickExit
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
  computed: {
    iconSize () {
      return this.$breakpoint.l ? '3.375' : '1.75'
    }
  },
  mounted () {
    if (isClient()) {
      window.addEventListener('keyup', this.keyNav)
    }
  },
  destroyed () {
    if (isClient()) {
      window.removeEventListener('keyup', this.keyNav)
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  @import "./scss/image_gallery";

  $rpl-image-gallery-modal-quickexit-margin-top-xs: ($rpl-space-4 * 4);
  $rpl-image-gallery-modal-quickexit-right-position-xs: $rpl-space-2;
  $rpl-image-gallery-modal-quickexit-margin-top-l: ($rpl-space-4 * 7);
  $rpl-image-gallery-modal-quickexit-right-position-l: ($rpl-space * 7);

  .rpl-image-gallery {
    &__modal-mask {
      position: fixed;
      z-index: $rpl-zindex-modal;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: $rpl-image-gallery-modal-background-color;
      display: flex;
      align-items: center;
    }

    &__modal-container {
      padding: 0;
      width: 100%;
      height: 100%;

      @include rpl-breakpoint('l') {
        width: calc(100% - #{($rpl-space * 30)});
        margin-left: ($rpl-space * 15);
        margin-right: ($rpl-space * 15);
      }

    }

    &__modal-close {
      position: absolute;
      background: transparent;
      border: 0;
      margin: 0;
      padding: 0;
      cursor: pointer;
      z-index: 1;
      top: $rpl-image-gallery-modal-edge-margin-s;
      right: $rpl-image-gallery-modal-edge-margin-s;

      @include rpl-breakpoint('l') {
        top: $rpl-image-gallery-modal-edge-margin-l;
        right: $rpl-image-gallery-modal-edge-margin-l;
      }

      svg {
        display: block;
      }

      span {
        @include rpl_visually_hidden;
      }
    }

    & &__modal__quickexit {
      position: absolute;

      @include rpl_breakpoint('xs') {
        margin-top: $rpl-image-gallery-modal-quickexit-margin-top-xs;
        right: $rpl-image-gallery-modal-quickexit-right-position-xs;
      }

      @include rpl_breakpoint('l') {
        margin-top: $rpl-image-gallery-modal-quickexit-margin-top-l;
        right: $rpl-image-gallery-modal-quickexit-right-position-l;
      }
    }
  }
</style>
