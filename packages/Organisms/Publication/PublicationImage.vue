<template>
  <div class="rpl-publication-image">
    <h3 class="rpl-publication-image__title" v-if="title">{{ title }}</h3>
    <rpl-figure v-if="image" :image="image" :caption="caption" :source="source" />
    <!-- Modal button -->
    <button class="rpl-publication-image__button" v-if="fullscreen" @click="showModal = true">
      <rpl-text-icon symbol="view" color="primary" :text="fullscreen" placement="before" />
    </button>
    <!-- Markup button -->
    <button class="rpl-publication-image__button" v-if="expand && !markupVisible" @click="markupVisible = true">
      <rpl-text-icon symbol="table" color="primary" :text="expand" placement="before" />
    </button>
    <div class="rpl-publication-image__expanded-markup" v-if="markupVisible">
      <rpl-text-icon class="rpl-publication-image__expanded-markup-title" symbol="table" color="primary" :text="expandTitle" placement="before" />
      <button class="rpl-publication-image__expanded-markup-close-button" @click="markupVisible = false">
        <rpl-icon symbol="close" color="primary" size="s" />
        <span class="rpl-publication-image__expanded-markup-close-button-text">{{ expandcloseText }}</span>
      </button>
    </div>
    <div class="rpl-publication-image__markup" v-if="markupVisible">
      <rpl-markup :html="html" />
    </div>
    <!-- Download button -->
    <a class="rpl-publication-image__button" v-if="download" :download="downloadFilename" :href="image.src">
      <rpl-text-icon symbol="download" color="primary" :text="download" placement="before" />
    </a>
    <!-- Modal -->
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
  name: 'RplPublicationImage',
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

  $rpl-publication-image-title-ruleset: ('l', 1.2em, 'bold') !default;
  $rpl-publication-image-title-color: rpl-color('extra_dark_neutral') !default;
  $rpl-publication-image-button-ruleset: ('xs', 1em, 'semibold') !default;
  $rpl-publication-image-button-color: rpl-color('primary') !default;
  $rpl-publication-image-expanded-title-ruleset: ('xs', 1em, 'semibold') !default;
  $rpl-publication-image-expanded-title-color: rpl-color('extra_dark_neutral') !default;
  $rpl-publication-image-markup-border: 1px solid rpl-color('mid_neutral_1') !default;
  $rpl-publication-image-item-bottom-margin: $rpl-space-4 !default;

  .rpl-publication-image {
    &__title {
      @include rpl_typography_ruleset($rpl-publication-image-title-ruleset);
      @include rpl_text_color($rpl-publication-image-title-color);
      margin: $rpl-space-4 0;
    }

    .rpl-figure {
      margin-bottom: $rpl-publication-image-item-bottom-margin;

      figcaption {
        span:last-child {
          margin-bottom: 0;
        }
      }
    }

    &__button {
      @include rpl_typography_ruleset($rpl-publication-image-button-ruleset);
      @include rpl_text_color($rpl-publication-image-button-color);
      text-decoration: none;
      background: transparent;
      border: 0;
      margin: 0;
      margin-bottom: $rpl-publication-image-item-bottom-margin;
      padding: 0;
      display: block;
      cursor: pointer;
    }

    &__expanded-markup {
      border: $rpl-publication-image-markup-border;
      padding: $rpl-space-4 ($rpl-space * 5);
      display: flex;
      justify-content: space-between;
      align-items: center;

      &-title {
        @include rpl_typography_ruleset($rpl-publication-image-expanded-title-ruleset);
        @include rpl_text_color($rpl-publication-image-expanded-title-color);
      }

      &-close-button {
        padding: $rpl-space $rpl-space-2;
        margin-right: $rpl-space-2 * -1;
        border: 0;
        background: transparent;
        cursor: pointer;

        &-text {
          @include rpl_visually_hidden;
        }
      }
    }

    &__markup {
      border: $rpl-publication-image-markup-border;
      border-top: 0;
      margin-bottom: $rpl-publication-image-item-bottom-margin;

      .rpl-markup__table {
        border: 0;

        .table-container {
          border: 0;
        }
      }
    }

    .rpl-image-gallery__modal-body {
      height: 100%;
    }
  }
</style>
