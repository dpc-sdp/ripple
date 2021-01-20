<template>
  <!-- Keep app-wysiwyg class here for backward compatibility, as some project may use that class for custom style -->
  <div v-if="html" class="rpl-markup tide-wysiwyg app-wysiwyg">
    <!-- Use dynamic component to render string template in runtime -->
    <component :is="{ template: getTemplate.html, data: () => getTemplate.data }" />
  </div>
</template>

<script>
import markupTranspiler from './markup-transpiler'

// To make runtime build work, we need to register the component globally
import Vue from 'vue'
import RplButton from '@dpc-sdp/ripple-button'
import RplDocumentLink from '@dpc-sdp/ripple-document-link'
import RplEmbeddedVideo from '@dpc-sdp/ripple-embedded-video'
import { RplTextLink } from '@dpc-sdp/ripple-link'

Vue.component('rpl-button', RplButton)
Vue.component('rpl-document-link', RplDocumentLink)
Vue.component('rpl-embedded-video', RplEmbeddedVideo)
Vue.component('rpl-text-link', RplTextLink)

export default {
  name: 'RplMarkup',
  props: {
    'html': String,
    'plugins': { type: Array },
    'options': { type: Object }
  },
  computed: {
    getTemplate () {
      // Run our transpile to turn html into vue template.
      const html = `<div class="rpl-markup__inner">${this.html}</div>`
      const plugins = this.plugins || this.rplOptions.rplMarkup.plugins
      const options = this.options || this.rplOptions.rplMarkup.options

      if (plugins && plugins.length > 0) {
        const template = markupTranspiler(html, plugins, options)
        return {
          html: template.html,
          data: template.data
        }
      }

      return {
        html: html,
        data: {}
      }
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";
@import "~@dpc-sdp/ripple-global/scss/components/table";

$rpl-markup-text-color: rpl-color('extra_dark_neutral') !default;
$rpl-markup-link-color: rpl-color('primary') !default;

$callout-text-color: rpl_color('extra_dark_neutral') !default;
$callout-author-ruleset: (rem(20px), 1.2em, 'medium') !default;
$callout-mark-border: rem(4px) solid rpl_color('mid_neutral_2') !default;
$callout-padding: 0 0 0 ($rpl-space * 6) !default;
$callout-margin: ($rpl-space * 7) 0 !default;

$quotation-padding-xs: 0 0 0 ($rpl-space * 6) !default;
$quotation-text-ruleset: (rem(20px), 1.2em, 'medium') !default;
$quotation-text-color: rpl_color('extra_dark_neutral') !default;
$quotation-text-margin: ($rpl-space * 5) auto $rpl-space-3 !default;
$quotation-mark-border: rem(4px) solid rpl_color('mid_neutral_2') !default;
$quotation-mark-end-margin: auto auto (-$rpl-space-2) $rpl-space-2 !default;
$quotation-author-ruleset: (rem(12px), 1em, 'medium')  !default;
$quotation-author-color: mix(rpl_color('dark_neutral'), rpl_color('white'), 93%) !default;
$quotation-author-opacity: rpl_color('dark_neutral') !default;

$table-stripe-color: rpl-color('light_neutral') !default;
$table-border: 1px solid rpl-color('mid_neutral_1') !default;
$table-header-ruleset: ('s', 1em, 'bold') !default;
$table-padding: $rpl-space-4 !default;
$table-background-color: rpl-color('white') !default;

$embedded-video-link-ruleset: (xs, 1em, 'semibold') !default;
$embedded-video-link-padding: $rpl-space-4 0 !default;
$embedded-video-link-text-colour: rpl_color('primary') !default;
$embedded-video-figcaption-ruleset: ('xxs', 1em, 'medium');
$embedded-video-figcaption-color: rpl_color('dark_neutral') !default;

$responsive-iframe-padding-bottom: 56.25% !default;
$responsive-iframe-padding-top: $rpl-space-4 !default;

$callout-wrapper-border-color: rpl_color('secondary') !default;
$callout-wrapper-background-color: tint(rpl_color('secondary'), 90%) !default;
$callout-wrapper-border-left: rem(4px) solid !default;
$callout-wrapper-list-padding-left: ($rpl-space * 6) !default;
$callout-wrapper-padding: ($rpl-space-3) ($rpl-space * 6) ($rpl-space * 6) ($rpl-space * 6) !default;
$callout-wrapper-heading-margin: ($rpl-space * 5) 0 !default;

.rpl-markup {
  @include rpl_text_color($rpl-markup-text-color);

  /* Lists  */
  ul {
    list-style-type: disc;
    max-width: $rpl-content-max-width;

    ul {
      list-style-type: circle;

      ul {
        list-style-type: square;
      }
    }
  }

  &__inner {
    overflow-wrap: break-word;
    word-wrap: break-word;

    > h2:first-child {
      margin-top: 0;
    }

    p, h2, h3, h4, h5, h6 {
      max-width: $rpl-content-max-width;
    }

    b,
    strong {
      @include rpl_typography_font('s', 1.5em, 'semibold');
    }
  }

  a:not(.rpl-button) {
    .rpl-text-label {
      @include rpl_text_color($rpl-markup-link-color);
    }
  }

  /* Iframes */
  &__iframe-container {
    iframe {
      width: 100%;
      border: 0;
      // Shouldn't be oversize in mobile
      max-height: 80vh;
    }

    &--default {
      iframe {
        width: 100%;
        height: rem(600px);
        border: 0;

        @include rpl_breakpoint(m) {
          height: rem(550px);
        }
      }
    }
  }

  /* Callouts */
  &__callout,
  .wysiwyg-callout {
    @include rpl_typography_ruleset($callout-author-ruleset);
    color: $callout-text-color;
    border-left: $callout-mark-border;
    padding: $callout-padding;
    margin: $callout-margin;
  }

  /* Image */
  &__image,
  .media--type-image {
    img {
      @include rpl_edge('card element');
      display: table;
      height: auto;
      border-radius: rem(4px);

      @include rpl_breakpoint('m') {
        max-width: 100%;
        max-height: rem(400px);
      }

      @include rpl_print_margin('m');
      @media print {
        width: auto;
        height: $rpl-print-image-height;
      }
    }
  }

  /* Quotation */
  &__quotation,
  .quotation {
    position: relative;
    margin-left: 0;
    margin-right: 0;
    padding: $quotation-padding-xs;
    max-width: $rpl-content-max-width;

    p {
      @include rpl_typography_ruleset($quotation-text-ruleset);
      color: $quotation-text-color;
      margin: $quotation-text-margin;
      line-height: rem(24px);

      &::before,
      &::after {
        content: '';
        display: inline-block;
        width: rem(4px);
        height: rem(24px);
        border-left: $quotation-mark-border;
        border-right: $quotation-mark-border;
      }

      &::before {
        position: absolute;
        left: 0;
        margin-top: rem(6px);
      }

      &::after {
        margin: $quotation-mark-end-margin;
        vertical-align: middle;
      }
    }

    &__author,
    &__author-title {
      @include rpl_typography_ruleset($quotation-author-ruleset);
      color: $quotation-author-color;
      font-style: normal;
      display: inline-block;
      line-height: rem(14px);
    }
  }

  &__table,
  .table-container {
    border: $table-border;
    border-radius: rem(4px);
    background-color: $table-background-color;
    overflow: auto;
    width: 100%;
    -webkit-overflow-scrolling: touch; // sass-lint:disable-line no-vendor-prefixes
    @include rpl_table_cols;

    table {
      border-collapse: collapse;
      width: 100%;

      caption {
        text-align: left;
        padding: $table-padding;
        vertical-align: top;
      }

      thead {
        tr {
          background-color: $table-stripe-color;
        }
      }

      tbody {
        tr {
          background-color: $table-background-color;
          &:nth-child(even) {
            background-color: $table-stripe-color;
          }
        }
      }

      th {
        @include rpl_typography_ruleset($table-header-ruleset);
        text-align: left;
      }

      th,
      td {
        padding: $table-padding;
        vertical-align: top;
      }
    }
  }

  &__embedded-video {

    .rpl-embed-video__link {
      padding: $embedded-video-link-padding;
      @include rpl_typography_ruleset($embedded-video-link-ruleset);
    }

    .rpl-embed-video__transcript {
      @include rpl_typography_ruleset($embedded-video-figcaption-ruleset);
      color: $embedded-video-figcaption-color;
      text-transform: uppercase;
    }

  }

  &__callout-wrapper,
  .callout-wrapper {
    padding: $callout-wrapper-padding;
    border-left: $callout-wrapper-border-left;
    border-color: $callout-wrapper-border-color;
    background-color: $callout-wrapper-background-color;
    max-width: $rpl-content-max-width;

    ul {
      padding-left: $callout-wrapper-list-padding-left;
    }

    h2, h3 {
      margin: $callout-wrapper-heading-margin;
    }
  }

}
</style>
