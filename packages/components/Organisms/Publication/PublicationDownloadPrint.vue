<template>
  <ul class="rpl-publication-download-print">
    <li v-for="(link, index) in links" :key="index">
      <rpl-document-link class="rpl-publication-download-print__print-item" v-bind="link" @click.native="downloadClick(link.name)" />
    </li>
    <li v-if="printLink || printPage" class="rpl-publication-download-print__print-list-item">
      <rpl-link v-if="printLink" class="rpl-publication-download-print__print-item rpl-publication-download-print__print-link" :href="printLink.href">
        <rpl-icon class="rpl-publication-download-print__print-link-icon" symbol="print" color="primary" size="l" />
        <div class="rpl-publication-download-print__print-link-info">
          <span class="rpl-publication-download-print__print-link-title">{{ printLink.text }}</span>
        </div>
      </rpl-link>
      <button v-if="printPage" class="rpl-publication-download-print__print-item rpl-publication-download-print__print-link" @click="printClick()">
        <rpl-icon class="rpl-publication-download-print__print-link-icon" symbol="print" color="primary" size="l" />
        <div class="rpl-publication-download-print__print-link-info">
          <span class="rpl-publication-download-print__print-link-title">Print this page</span>
        </div>
      </button>
    </li>
  </ul>
</template>

<script>
import { isClient } from '@dpc-sdp/ripple-global/utils/helpers.js'
import RplIcon from '@dpc-sdp/ripple-icon'
import RplLink from '@dpc-sdp/ripple-link'
import DocumentLink from '@dpc-sdp/ripple-document-link'

export default {
  name: 'RplPublicationDownloadPrint',
  components: {
    RplIcon,
    RplLink,
    DocumentLink
  },
  props: {
    links: Array,
    printPage: { type: Boolean, default: false },
    printLink: {
      type: [Object, Boolean],
      default: false
    }
  },
  methods: {
    printClick () {
      this.$emit('publicationPrint')
      if (isClient() && !process.env.TEST) {
        window.print()
      }
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

    li + &__print-list-item {
      border-top: $rpl-publication-download-print-dividing-border;
    }

    &__print-item,
    &__print-item.rpl-document-link {
      margin: $rpl-publication-download-print-link-margin;
    }

    &__print-link {
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

      .rpl-link__inner {
          display: flex;
          align-items: center;
      }
    }

    &__print-link-icon {
      flex: $rpl-document-link-icon-flex;
    }

    &__print-link-info {
      margin-left: $rpl-publication-download-print-link-info-margin;
    }

    &__print-link-title {
      @include rpl_typography_ruleset($rpl-document-link-title-ruleset);
      @include rpl_text_color($rpl-document-link-title-color);
    }
  }
</style>
