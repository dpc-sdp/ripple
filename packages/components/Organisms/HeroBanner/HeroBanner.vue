<template>
  <div class="rpl-hero-banner" :class="{
    'rpl-hero-banner--no-links': !showLinks,
    'rpl-hero-banner--has-logo': logo
  }" :style="heroBannerStyles">
    <rpl-row v-if="logo">
      <div class="rpl-hero-banner__left">
        <img class="rpl-hero-banner__logo" :src="logo" alt="" />
      </div>
    </rpl-row>
    <rpl-row>
      <div class="rpl-hero-banner__left">
        <h1
          v-if="title"
          class="rpl-hero-banner__title"
          :class="{ 'rpl-hero-banner__title--dark': (theme === 'dark') }"
        >
          <span>{{ title }}</span>
        </h1>
        <p
          v-if="introText"
          class="rpl-hero-banner__description"
          :class="{ 'rpl-hero-banner__description--dark': (theme === 'dark') }"
        >
          {{ introText }}
        </p>
        <slot name="leftbottom"></slot>
      </div>
      <div class="rpl-hero-banner__right" v-if="showLinks">
        <h2
          v-if="linkHeading"
          class="rpl-hero-banner__link-heading"
          :class="{ 'rpl-hero-banner__link-heading--dark': (theme === 'dark') }"
        >
          {{ linkHeading }}
        </h2>
        <ul class="rpl-hero-banner__link-list" v-if="links || moreLink">
          <li
            v-for="(item, index) of links"
            :key="index"
            class="rpl-hero-banner__link-list-item"
          >
            <rpl-text-link
              class="rpl-hero-banner__link"
              :text="item.text"
              :url="item.url"
              iconSymbol="arrow_right_primary"
              iconColor="primary"
              :underline="true"
              :theme="theme"
              :size="textLinkSize"
            />
          </li>
          <li
            v-if="moreLink"
            class="rpl-hero-banner__link-list-item"
          >
            <rpl-text-link
              class="rpl-hero-banner__more-link"
              :text="moreLink.text"
              :url="moreLink.url"
              iconSymbol="arrow_right_primary"
              iconColor="primary"
              :underline="true"
              :theme="theme"
              :emphasis="true"
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
  name: 'RplHeroBanner',
  mixins: [breakpoint],
  props: {
    title: String,
    introText: String,
    linkHeading: String,
    links: Array,
    moreLink: Object,
    theme: { type: String, default: 'light' },
    showLinks: { type: Boolean, default: true },
    logo: String,
    backgroundGraphic: String
  },
  components: {
    RplTextLink,
    RplRow,
    RplCol
  },
  computed: {
    heroBannerStyles () {
      return this.backgroundGraphic ? { 'background-image': `url(${this.backgroundGraphic})` } : null
    },
    textLinkSize () {
      return this.$breakpoint.m ? 'large' : 'small'
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-hero-banner-border: 1px solid rpl_color('mid_neutral_1') !default;
  $rpl-hero-banner-title-typography-ruleset: (
    'xs': ('mega', 1.11em, 'bold'),
    's': ('giga', 1.11em, 'bold'),
    'm': ('xgiga', 1.08em, 'bold'),
    'l': ('tera', 1.07em, 'bold')
  ) !default;
  $rpl-hero-banner-title-typography-ruleset-dark: (
    'xs': ('mega', 1.11em, 'bold', true),
    's': ('giga', 1.11em, 'bold', true),
    'm': ('xgiga', 1.08em, 'bold', true),
    'l': ('tera', 1.07em, 'bold', true)
  ) !default;
  $rpl-hero-banner-title-color: rpl_color('primary') !default;
  $rpl-hero-banner-description-typography-ruleset: (
    'xs': ('m', 1.22em, 'medium'),
    'm': ('mega', 1.29em, 'medium')
  ) !default;
  $rpl-hero-banner-description-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-hero-banner-description-text-color-dark: rpl_color('white') !default;
  $rpl-hero-banner-description-letter-spacing: rem(-0.12px) !default;
  $rpl-hero-banner-link-heading-typography-rules: (
    'xs': ('xs', 1.7em, 'bold'),
    'm': ('l', 1.4em, 'bold')
  ) !default;
  $rpl-hero-banner-link-heading-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-hero-banner-link-heading-text-color-dark: rpl_color('white') !default;
  $rpl-hero-banner-link-margin: auto auto rem(16px) !default;
  $rpl-hero-banner-link-heading-margin: 0 auto rem(15px) auto !default;
  $rpl-hero-banner-vertical-spacing-logo-offset: (
    'xs': 0rem,
    's': rem(48px - 26px),
    'm': rem(48px - 26px),
    'l': rem(48px - 26px),
    'xl': rem(48px - 26px),
    'xxl': rem(48px - 36px)
  ) !default;
  $rpl-hero-banner-vertical-spacing: (
    'xs': ('top': rem(56px), 'bottom': rem(100px)),
    's': ('top': rem(88px), 'bottom': rem(64px)),
    'm': ('top': rem(124px), 'bottom': rem(80px)),
    'l': ('top': rem(142px), 'bottom': rem(77px)),
    'xl': ('top': rem(142px), 'bottom': rem(77px)),
    'xxl': ('top': rem(152px), 'bottom': rem(68px))
  ) !default;

  $rpl-hero-banner-left-padding: rem(60px) - $rpl-component-gutter-l;

  .rpl-hero-banner {
    $root: &;
    @include rpl_mobile_padding;
    position: relative;
    background-repeat: no-repeat;

    // ---------
    $hero-banner-grid-container-gutter-s: 20px;
    $hero-banner-grid-container-gutter-m: 32px;
    $hero-banner-grid-container-gutter-l: 68px;
    $hero-banner-grid-container-gutter-xl: '((100vw - 1056px)/2)';
    $hero-banner-links-padding-xl: rpl_grid_get_gutter($rpl-grid) / 2;
    $hero-banner-bg-links-overlap: 100px;
    $hero-banner-bg-vert-offset-xs: ($rpl-space * -5);
    $hero-banner-bg-vert-offset-s: -16px;
    $hero-banner-bg-vert-offset-xxl: -68px;
    $hero-banner-bg-horiz-offset-xxl: 33px;
    // ---------

    background-size: 18rem;
    background-position: right bottom $hero-banner-bg-vert-offset-xs;

    @include rpl_breakpoint('s') {
      background-size: 20rem;
      background-position: left calc(100vw - #{$hero-banner-grid-container-gutter-s} - #{$hero-banner-bg-links-overlap} ) bottom $hero-banner-bg-vert-offset-s;
    }

    @include rpl_breakpoint('m') {
      border-bottom: $rpl-hero-banner-border;
      background-position: left calc(100vw - #{$hero-banner-grid-container-gutter-m} - #{$hero-banner-bg-links-overlap} ) bottom;
    }

    @include rpl_breakpoint('l') {
      background-position: left calc(100vw - #{$hero-banner-grid-container-gutter-l} - #{$hero-banner-bg-links-overlap} ) bottom;
    }

    @include rpl_breakpoint('xl') {
      background-position: left calc(100vw - #{$hero-banner-grid-container-gutter-xl} - #{$hero-banner-bg-links-overlap} ) bottom;
    }

    @media (min-width: 1490px) {
      background-position: right bottom;
    }

    @include rpl_breakpoint('xxl') {
      background-size: 40rem;
      background-position: left calc(100vw - #{$hero-banner-grid-container-gutter-xl} - #{$hero-banner-bg-links-overlap} - #{$hero-banner-bg-horiz-offset-xxl} ) bottom $hero-banner-bg-vert-offset-xxl;
    }

    @media (min-width: 2072px) {
      background-position: right bottom $hero-banner-bg-vert-offset-xxl;
    }

    @include rpl_breakpoint('xxxl') {
      background-position: right bottom $hero-banner-bg-vert-offset-xxl;
    }

    @media (min-width: 2660px) {
      background-position: right bottom;
    }

    @each $bp, $spacing in $rpl-hero-banner-vertical-spacing {
      @include rpl_breakpoint($bp) {
        padding-top: map-get($spacing, top);
        padding-bottom: map-get($spacing, bottom);
      }
    }

    @include rpl_print {
      padding: 0;
      border: 0;
      background-image: none !important; // Needs to override inline definition.
    }

    &__left {
      @include rpl_grid_full;

      @include rpl_breakpoint('xl') {
        @include rpl_grid_column(8);
        padding-right: $rpl-hero-banner-left-padding;
      }

      @include rpl_print {
        @include rpl_grid_full;
        padding-right: 0;
      }
    }

    &__right {
      position: relative;
      background-color: rgba(orange, 0.5);
      @include rpl_grid_full;
      z-index: $rpl-zindex-content-top;

      @include rpl_breakpoint('xl') {
        @include rpl_grid_column(4);
      }

      @include rpl_print_hidden;

      &::after {
        content: '';
        background: red;
        display: block;
        width: 100px;
        height: 100px;
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }

    &__logo {
      display: block;
      max-height: rem(64px);
      margin-bottom: $rpl-space-2;
      @include rpl_breakpoint('l') {
      margin-bottom: $rpl-space-3;
        max-height: rem(100px);
      }
    }

    &__title {
      @include rpl_typography_ruleset($rpl-hero-banner-title-typography-ruleset);
      @include rpl_text_color($rpl-hero-banner-title-color);
      margin: 0;

      &--dark {
        @include rpl_typography_ruleset($rpl-hero-banner-title-typography-ruleset-dark);
      }
    }

    &__description {
      @include rpl_typography_ruleset($rpl-hero-banner-description-typography-ruleset);
      @include rpl_text_color($rpl-hero-banner-description-text-color);
      letter-spacing: $rpl-hero-banner-description-letter-spacing;
      margin-top: $rpl-space;

      @include rpl_breakpoint(s) {
        margin-top: $rpl-space-2;
      }

      @include rpl_breakpoint(l) {
        margin-top: $rpl-space-4;
      }

      @include rpl_print_margin('s');

      &--dark {
        color: $rpl-hero-banner-description-text-color-dark;
      }
    }

    &__link-heading {
      @include rpl_typography_ruleset($rpl-hero-banner-link-heading-typography-rules);
      color: $rpl-hero-banner-link-heading-text-color;
      letter-spacing: rem(-0.08px);
      margin: $rpl-hero-banner-link-heading-margin;

      &--dark {
        color: $rpl-hero-banner-link-heading-text-color-dark;
      }
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
      margin: $rpl-hero-banner-link-margin;
    }

    &--no-links {
      & #{$root}__left {
        @include rpl_breakpoint('xl') {
          @include rpl_grid_column(10);
        }
      }
    }

    &--has-logo {
      @each $bp, $spacing in $rpl-hero-banner-vertical-spacing {
        @include rpl_breakpoint($bp) {
          padding-top: calc(#{map-get($spacing, top)} - #{map-get($rpl-hero-banner-vertical-spacing-logo-offset, $bp)});
        }
      }
    }
  }
</style>
