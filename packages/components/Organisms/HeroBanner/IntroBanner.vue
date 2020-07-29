<template>
  <div class="rpl-intro-banner" :class="{ 'rpl-intro-banner--no-links': !showLinks }">
    <rpl-row>
      <div class="rpl-intro-banner__left">
        <h2 v-if="title" class="rpl-intro-banner__title"><span>{{ title }}</span></h2>
        <p v-if="introText" class="rpl-intro-banner__description">{{ introText }}</p>
      </div>
      <div class="rpl-intro-banner__right" v-if="showLinks">
        <h2 v-if="linkHeading" class="rpl-intro-banner__link-heading">{{ linkHeading }}</h2>
        <ul class="rpl-intro-banner__link-list" v-if="links">
          <li
            v-for="(item, index) of links"
            :key="index"
            class="rpl-intro-banner__link-list-item"
          >
            <rpl-text-link
              class="rpl-intro-banner__link"
              :text="item.text"
              :url="item.url"
              iconSymbol="arrow_right_primary"
              iconColor="primary"
              :underline="true"
              :size="textLinkSize"
            />
          </li>
        </ul>
      </div>
    </rpl-row>
  </div>
</template>

<script>
import breakpoint from '@dpc-sdp/ripple-global/mixins/breakpoint'
import { RplTextLink } from '@dpc-sdp/ripple-link'
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'

export default {
  name: 'RplIntroBanner',
  mixins: [breakpoint],
  props: {
    title: String,
    introText: String,
    linkHeading: String,
    links: Array,
    showLinks: { type: Boolean, default: true }
  },
  components: {
    RplTextLink,
    RplRow,
    RplCol
  },
  computed: {
    textLinkSize () {
      return this.$breakpoint.m ? 'large' : 'small'
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-intro-banner-title-typography-ruleset: ('mega', 1.2em, 'bold') !default;
  $rpl-intro-banner-title-color: var(--rpl-intro-banner-title-color, rpl_color('primary')) !default;
  $rpl-intro-banner-description-typography-ruleset: ('s', 1.5em, 'regular') !default;
  $rpl-intro-banner-description-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-intro-banner-link-heading-typography-rules: (
    'xs': ('xs', 1.7em, 'bold'),
    'm': ('l', 1.4em, 'bold')
  ) !default;
  $rpl-intro-banner-link-heading-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-intro-banner-link-margin: auto auto $rpl-space-2 !default;
  $rpl-intro-banner-link-heading-margin: 0 auto $rpl-space-4 auto !default;
  $rpl-intro-banner-vertical-spacing: (
    'xs': ('top': ($rpl-space * 19), 'bottom': ($rpl-space * 5)),
    's': ('top': ($rpl-space * 20), 'bottom': ($rpl-space * 8)),
  ) !default;

  .rpl-intro-banner {
    $root: &;
    @include rpl_mobile_padding;
    position: relative;

    @each $bp, $spacing in $rpl-intro-banner-vertical-spacing {
      @include rpl_breakpoint($bp) {
        padding-top: map-get($spacing, top);
        padding-bottom: map-get($spacing, bottom);
      }
    }

    @include rpl_print_margin('l');

    &__left {
      @include rpl_grid_full;

      @include rpl_breakpoint('xl') {
        @include rpl_grid_column(8);
      }

      #{$root}--no-links & {
        @include rpl_breakpoint('xl') {
          @include rpl_grid_column(10);
        }
      }
    }

    &__right {
      @include rpl_grid_full;
      z-index: $rpl-zindex-content-top;

      @include rpl_breakpoint('xl') {
        @include rpl_grid_column(4);
      }

      @include rpl_print_hidden;
    }

    &__title {
      @include rpl_typography_ruleset($rpl-intro-banner-title-typography-ruleset);
      @include rpl_text_color($rpl-intro-banner-title-color);
      margin: 0;
    }

    &__description {
      @include rpl_typography_ruleset($rpl-intro-banner-description-typography-ruleset);
      @include rpl_text_color($rpl-intro-banner-description-text-color);
      margin-top: $rpl-space;

      @include rpl_breakpoint(s) {
        margin-top: $rpl-space-2;
      }

      @include rpl_breakpoint(l) {
        margin-top: $rpl-space-4;
      }
    }

    &__link-heading {
      @include rpl_typography_ruleset($rpl-intro-banner-link-heading-typography-rules);
      @include rpl_text_color($rpl-intro-banner-link-heading-text-color);
      margin: $rpl-intro-banner-link-heading-margin;
    }

    &__link-list {
      margin: 0;
      padding: 0;

      @include rpl_breakpoint('s') {
        column-count: 2;
        column-gap: rem(50px);
      }

      @include rpl_breakpoint('m') {
        column-count: auto;
      }
    }

    &__link-list-item {
      list-style: none;
      margin: $rpl-intro-banner-link-margin;
    }
  }
</style>
