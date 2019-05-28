<template>
  <ul class="rpl-publication-download-print">
    <li v-for="(link, index) in links" :key="index">
      <rpl-document-link class="rpl-publication-download-print__print-item" v-bind="link" @click.native="downloadClick(link.name)" />
    </li>
    <li v-if="showPrint" class="rpl-publication-download-print__print-list-item">
      <button class="rpl-publication-download-print__print-item rpl-publication-download-print__print-button" @click="printClick()">
        <rpl-icon class="rpl-publication-download-print__print-button-icon" symbol="print" color="primary" size="l" />
        <div class="rpl-publication-download-print__print-button-info">
          <span class="rpl-publication-download-print__print-button-title">{{ printText }}</span>
        </div>
      </button>
    </li>
  </ul>
</template>

<script>
import RplIcon from '@dpc-sdp/ripple-icon'
import DocumentLink from '@dpc-sdp/ripple-document-link'

export default {
  name: 'RplPublicationDownloadPrint',
  components: {
    RplIcon,
    DocumentLink
  },
  props: {
    links: Array,
    showPrint: { type: Boolean, default: true },
    printText: { type: String, default: 'Print this page' }
  },
  mounted () {
    this.$on('publicationPrint', function () {
      if (typeof window !== 'undefined') {
        window.print()
      }
    })
  },
  methods: {
    printClick () {
      this.$emit('publicationPrint')
    },
    downloadClick (downloadName) {
      this.$emit('publicationDownload', downloadName)
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  @import "~@dpc-sdp/ripple-document-link/scss/document-link";

  $rpl-publication-download-print-background: rpl-color('white') !default;
  $rpl-publication-download-print-border: 1px solid rpl-color('mid_neutral_1') !default;
  $rpl-publication-download-print-padding-xs: 0 ($rpl-space * 5) !default;
  $rpl-publication-download-print-padding-m: 0 ($rpl-space * 8) !default;
  $rpl-publication-download-print-padding-xxl: 0 ($rpl-space * 6) !default;
  $rpl-publication-download-print-link-margin: $rpl-space-4 0 !default;
  $rpl-publication-download-print-link-title-color: rpl_color('extra_dark_neutral') !default;
  $rpl-publication-download-print-link-info-margin: rem(11px) !important;
  $rpl-publication-download-print-dividing-border: 1px solid rpl-color('mid_neutral_1') !default;

  .rpl-publication-download-print {
    $root: &;
    list-style: none;
    margin-top: 0;
    border: $rpl-publication-download-print-border;
    border-radius: $rpl-button-border-radius;
    background: $rpl-publication-download-print-background;
    padding: $rpl-publication-download-print-padding-xs;

    @include rpl-breakpoint(m) {
      padding: $rpl-publication-download-print-padding-m;
    }

    @include rpl-breakpoint(xxl) {
      padding: $rpl-publication-download-print-padding-xxl;
    }

    @include rpl_print_hidden;

    &__print-list-item {
      border-top: $rpl-publication-download-print-dividing-border;
    }

    &__print-item,
    &__print-item.rpl-document-link {
      margin: $rpl-publication-download-print-link-margin;
    }

    &__print-button {
      background-color: transparent;
      border: 0;
      padding: 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      cursor: pointer;

      &:hover,
      &:focus {
        #{$root}__print-button-title {
          @include rpl_text_color($rpl-document-link-title-color-hover);
        }
      }
    }

    &__print-button-icon {
      flex: $rpl-document-link-icon-flex;
    }

    &__print-button-info {
      margin-left: $rpl-publication-download-print-link-info-margin;
    }

    &__print-button-title {
      @include rpl_typography_ruleset($rpl-document-link-title-ruleset);
      @include rpl_text_color($rpl-document-link-title-color);
    }
  }
</style>
