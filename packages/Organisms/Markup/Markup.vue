<template>
  <!-- Keep app-wysiwyg class here for backward compatibility, as some project may use that class for custom style -->
  <div class="rpl-markup tide-wysiwyg app-wysiwyg">
    <!-- Use dynamic component to render string template in runtime -->
    <component :is="{template:getTemplate}"/>
  </div>
</template>

<script>
import markupTranspiler from './markup-transpiler'

// To make runtime build work, we need to register the component globally
import Vue from 'vue'
import RplButton from '@dpc-sdp/ripple-button'
import RplDocumentLink from '@dpc-sdp/ripple-document-link'
import RplEmbeddedVideo from '@dpc-sdp/ripple-embedded-video'
import {RplTextLink} from '@dpc-sdp/ripple-link'

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
        return template
      }
      return html
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/style";
@import "~@dpc-sdp/ripple-markup/scss/iframe";

$rpl-markup-link-color: rpl_color('primary') !default;

$callout-text-color: rpl_color('extra_dark_neutral') !default;
$callout-author-ruleset: (rem(20px), 1.2em, 'medium');
$callout-mark-border: rem(4px) solid rpl_color('mid_neutral_2');
$callout-padding: 0 0 0 ($rpl-space * 6);
$callout-margin: ($rpl-space * 7) auto;

$quotation-padding-xs: 0 0 0 ($rpl-space * 6);
$quotation-padding-s: 0 0 0 ($rpl-space * 8);
$quotation-text-ruleset: (rem(20px), 1.2em, 'medium');
$quotation-text-color: rpl_color('extra_dark_neutral');
$quotation-text-margin: ($rpl-space * 5) auto $rpl-space-2;
$quotation-mark-border: rem(4px) solid rpl_color('mid_neutral_2');
$quotation-mark-end-margin: auto auto (-$rpl-space-2) $rpl-space-2;
$quotation-author-ruleset: (rem(12px), 1em, 'medium');
$quotation-author-color: mix(rpl_color('dark_neutral'), rpl_color('white'), 93%);
$quotation-author-opacity: rpl_color('dark_neutral');

$table-stripe-color: rpl-color('light_neutral');
$table-border: 1px solid rpl-color('mid_neutral_1');
$table-header-ruleset: ('s', 1em, 'bold');
$table-padding: $rpl-space-4;

$embedded-video-link-ruleset: (xs, 1em, 'semibold');
$embedded-video-link-padding: $rpl-space-4 0;
$embedded-video-link-text-colour: rpl_color('primary') !default;
$embedded-video-figcaption-ruleset: ('xxs', 1em, 'medium');
$embedded-video-figcaption-color: rpl_color('dark_neutral') !default;

$responsive-iframe-padding-bottom: 56.25% !default;
$responsive-iframe-padding-top: $rpl-space-4 !default;

.rpl-markup {
  /* Lists  */
  ul {
    list-style-type: disc;

    ul {
      list-style-type: circle;

      ul {
        list-style-type: square;
      }
    }
  }

  &__inner {
    > h2:first-child {
      margin-top: 0;
    }
  }

  a:not(.rpl-button) {
    text-decoration: none;
    color: $rpl-markup-link-color;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
  /* Iframes */
  &__iframe-container {
    @include rpl_responsive_iframe;
    padding-bottom: $responsive-iframe-padding-bottom;
    padding-top: $responsive-iframe-padding-top;
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

    @include rpl_breakpoint('s') {
      padding: $quotation-padding-s;
    }

    p {
      @include rpl_typography_ruleset($quotation-text-ruleset);
      color: $quotation-text-color;
      margin: $quotation-text-margin;

      &::before,
      &::after {
        content: '';
        display: inline-block;
        width: rem(8px);
        height: rem(24px);
        border-left: $quotation-mark-border;
        border-right: $quotation-mark-border;
      }

      &::before {
        position: absolute;
        left: 0;
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
      text-transform: uppercase;
    }
  }

  &__table,
  .table-container {
    border: $table-border;
    border-radius: rem(4px);
    overflow: auto;
    width: 100%;
    -webkit-overflow-scrolling: touch; // sass-lint:disable-line no-vendor-prefixes

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

}
</style>
