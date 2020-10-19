<template>
  <div class="rpl-complex-image">
    <h3 class="rpl-complex-image__title" v-if="title">{{ title }}</h3>
    <rpl-figure v-if="image" :image="image" :caption="caption" :source="source" />
    <div class="rpl-complex-image__controls">
      <!-- Fullscreen modal button -->
      <button class="rpl-complex-image__button" v-if="fullscreenLabel && image" @click="showModal = true">
        <rpl-text-icon symbol="view" color="primary" :text="fullscreenLabel" placement="before" />
      </button>
      <!-- Markup expander -->
      <button class="rpl-complex-image__button" v-if="expandLabel && !markupVisible && html" @click="markupVisible = true">
        <rpl-text-icon symbol="table" color="primary" :text="expandLabel" placement="before" />
      </button>
      <div class="rpl-complex-image__expander" :class="{ 'rpl-complex-image__expander--open': markupVisible }">
        <div class="rpl-complex-image__expander-header">
          <rpl-text-icon class="rpl-complex-image__expander-title" symbol="table" color="primary" :text="expandTitleLabel" placement="before" />
          <button class="rpl-complex-image__expander-close-button" @click="markupVisible = false">
            <rpl-icon symbol="close" color="primary" size="s" />
            <span class="rpl-complex-image__expander-close-button-text">{{ expandcloseText }}</span>
          </button>
        </div>
        <div class="rpl-complex-image__expander-markup" v-if="html">
          <rpl-markup :html="html" />
        </div>
      </div>
      <!-- Download button -->
      <a class="rpl-complex-image__button" v-if="downloadLabel && downloadFilename" :download="downloadFilename" :href="image.src">
        <rpl-text-icon symbol="download" color="primary" :text="downloadLabel" placement="before" />
      </a>
    </div>
    <!-- Fullscreen modal -->
    <rpl-image-gallery-modal v-if="showModal" @close="showModal = false">
      <template slot="body">
        <rpl-fullscreen-image :image="image" :title="title" :caption="caption" />
      </template>
    </rpl-image-gallery-modal>
  </div>
</template>

<script>
import { RplIcon, RplTextIcon } from '@dpc-sdp/ripple-icon'
import RplFigure from '@dpc-sdp/ripple-figure'
import RplMarkup from '@dpc-sdp/ripple-markup'
import { RplImageGalleryModal, RplFullscreenImage } from '@dpc-sdp/ripple-image-gallery'

export default {
  name: 'RplComplexImage',
  components: {
    RplIcon,
    RplTextIcon,
    RplFigure,
    RplMarkup,
    RplImageGalleryModal,
    RplFullscreenImage
  },
  props: {
    title: String,
    image: Object,
    caption: String,
    source: String,
    fullscreen: String,
    expand: String,
    expandTitle: String,
    html: String,
    download: String,
    expandcloseText: { default: 'Close', type: String }
  },
  data () {
    return {
      markupVisible: false,
      showModal: false
    }
  },
  computed: {
    fullscreenLabel () {
      if (this.fullscreen) {
        return this.fullscreen
      } else if (this.title) {
        return `View ${this.title} in full screen`
      }
    },
    downloadLabel () {
      if (this.download) {
        return this.download
      } else if (this.title) {
        return `Download ${this.title}`
      }
    },
    expandLabel () {
      if (this.expand) {
        return this.expand
      } else if (this.title) {
        return `View ${this.title} in table format`
      }
    },
    expandTitleLabel () {
      if (this.expandTitle) {
        return this.expandTitle
      } else if (this.title) {
        return this.title
      }
    },
    downloadFilename () {
      const name = this.image.src
      return name.substr(name.lastIndexOf('/') + 1)
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-complex-image-title-ruleset: ('l', 1.2em, 'bold') !default;
  $rpl-complex-image-title-color: rpl-color('extra_dark_neutral') !default;
  $rpl-complex-image-title-margin: $rpl-space-4 0 !default;
  $rpl-complex-image-button-ruleset: ('xs', 1em, 'semibold') !default;
  $rpl-complex-image-button-color: rpl-color('primary') !default;
  $rpl-complex-image-expander-title-ruleset: ('xs', 1em, 'semibold') !default;
  $rpl-complex-image-expander-title-color: rpl-color('extra_dark_neutral') !default;
  $rpl-complex-image-expander-markup-padding: ($rpl-space * 5) !default;
  $rpl-complex-image-expander-header-padding: $rpl-space-2 $rpl-complex-image-expander-markup-padding !default;
  $rpl-complex-image-expander-close-padding: $rpl-space $rpl-space-2 !default;
  $rpl-complex-image-expander-close-margin: 0 ($rpl-space-2 * -1) 0 0 !default;
  $rpl-complex-image-markup-border: 1px solid rpl-color('mid_neutral_1') !default;
  $rpl-complex-image-item-bottom-margin: $rpl-space-3 !default;
  $rpl-complex-image-markup-ruleset: ('xs', 1.2em, 'regular') !default;
  $rpl-complex-image-markup-table-head-ruleset: ('xs', 1.2em, 'bold') !default;
  $rpl-complex-image-markup-background: rpl-color('white') !default;

  .rpl-complex-image {
    &__title {
      @include rpl_typography_ruleset($rpl-complex-image-title-ruleset);
      @include rpl_text_color($rpl-complex-image-title-color);
      margin: $rpl-complex-image-title-margin;
    }

    .rpl-figure {
      margin-bottom: $rpl-complex-image-item-bottom-margin;

      figcaption {
        span:last-child {
          margin-bottom: 0;
        }
      }
    }

    &__controls {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
    }

    &__button {
      @include rpl_typography_ruleset($rpl-complex-image-button-ruleset);
      @include rpl_text_color($rpl-complex-image-button-color);
      text-decoration: none;
      background: transparent;
      border: 0;
      margin: 0;
      margin-bottom: $rpl-complex-image-item-bottom-margin;
      padding: 0;
      cursor: pointer;
    }

    &__expander {
      width: 100%;
      background: $rpl-complex-image-markup-background;
      display: none;
      margin-bottom: $rpl-complex-image-item-bottom-margin;

      &--open {
        display: block;
      }

      @include rpl_print {
        display: block;
      }

      &-header {
        border: $rpl-complex-image-markup-border;
        padding: $rpl-complex-image-expander-header-padding;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      &-title {
        @include rpl_typography_ruleset($rpl-complex-image-expander-title-ruleset);
        @include rpl_text_color($rpl-complex-image-expander-title-color);
      }

      &-close-button {
        padding: $rpl-complex-image-expander-close-padding;
        margin: $rpl-complex-image-expander-close-margin;
        border: 0;
        background: transparent;
        cursor: pointer;

        &-text {
          @include rpl_visually_hidden;
        }
      }

      &-markup {
        @include rpl_typography_ruleset($rpl-complex-image-markup-ruleset);
        border: $rpl-complex-image-markup-border;
        border-top: 0;
        padding: $rpl-complex-image-expander-markup-padding;

        .rpl-markup {
          width: 100%;

          &__table {
            border: 0;
            // Tables negate the padding and sit against the edge of container.
            width: calc(100% + #{$rpl-complex-image-expander-markup-padding * 2});
            margin-top: $rpl-complex-image-expander-markup-padding * -1;
            margin-left: $rpl-complex-image-expander-markup-padding * -1;
            margin-bottom: $rpl-complex-image-expander-markup-padding * -1;

            table th,
            .table-container table th {
              @include rpl_typography_ruleset($rpl-complex-image-markup-table-head-ruleset);
            }

            .table-container {
              border: 0;
            }
          }
        }

      }
    }

    .rpl-image-gallery__modal-body {
      height: 100%;
    }
  }
</style>
