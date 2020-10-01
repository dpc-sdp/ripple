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

/**
 * Hero banners - Compulsory component for every page, providing introduction and context.
 * Hero banners contain display text, optional supplementary copy,
 * and optional set of links designed to connect users through specific streams of content.
 * Graphics switch across templates to create a visually interesting experience.
 */
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
    'xs': ('mega', 1.14em, 'bold'),
    's': ('giga', 1.11em, 'bold'),
    'm': ('xgiga', 1.08em, 'bold'),
    'l': ('tera', 1.07em, 'bold'),
    'xxl': ('tera', 1em, 'bold')
  ) !default;

  $rpl-hero-banner-title-print-line-height: 1.2em;
  $rpl-hero-banner-title-typography-ruleset-dark: (
    'xs': ('mega', 1.14em, 'bold', true),
    's': ('giga', 1.11em, 'bold', true),
    'm': ('xgiga', 1.08em, 'bold', true),
    'l': ('tera', 1.07em, 'bold', true),
    'xxl': ('tera', 1em, 'bold', true)
  ) !default;
  $rpl-hero-banner-title-color: rpl_color('primary') !default;
  $rpl-hero-banner-description-typography-ruleset: (
    'xs': ('l', 1.2em, 'medium'),
    'm': ('xl', 1.17em, 'medium'),
    'xxl': ('mega', 1.14em, 'medium')
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
  $rpl-hero-banner-link-margin: auto auto $rpl-space-3 !default;
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

  // Background graphic positioning - Set positioning for a breakpoint:
  //  - pos: 'edge / right' - Edge starts graphic at right screen edge.
  //  - size: The graphic size. This matches the top layout graphic.
  //  - gutter: Edge only. Defines space between container & screen edge.
  //  - v-offset: Edge & Right. Additional vertical offset to place on graphic.
  //  - h-offset: Edge only. Additional horizontal offset to place on graphic.
  $rpl-hero-banner-background-graphic-links-overlap: rem(100px) !default;
  $rpl-hero-banner-background-graphic-gutter-xl: '((100vw - #{map-get(map-get($rpl-layout, 'site_max_width'), 'xl')})/2)';
  $rpl-hero-banner-background-graphic-v-offset-xxl: rem(-68px);
  $rpl-hero-banner-background-graphic: (
    'xs': ('pos': 'right', 'size': 18rem, 'v-offset': ($rpl-space * -5)),
    's': ('pos': 'edge', 'size': 20rem, 'gutter': $rpl-component-padding-xs, 'v-offset': rem(-16px)),
    'm': ('pos': 'edge', 'gutter': map-get(map-get($rpl-layout, 'site_padding'), 'm')),
    'l': ('pos': 'edge', 'gutter': map-get(map-get($rpl-layout, 'site_padding'), 'l')),
    'xl': ('pos': 'edge', 'gutter': $rpl-hero-banner-background-graphic-gutter-xl),
    '1490px': ('pos': 'right'),
    'xxl': ('pos': 'edge', 'size': 40rem, 'gutter': $rpl-hero-banner-background-graphic-gutter-xl, 'h-offset': rem(33px), 'v-offset': $rpl-hero-banner-background-graphic-v-offset-xxl),
    '2072px': ('pos': 'right', 'v-offset': $rpl-hero-banner-background-graphic-v-offset-xxl),
    'xxxl': ('pos': 'right', 'v-offset': $rpl-hero-banner-background-graphic-v-offset-xxl),
    '2660px': ('pos': 'right')
  ) !default;

  $rpl-hero-banner-with-image-padding-s: rem(28px) 0;

  @mixin rpl_position_background_graphic($vars) {
    $pos: map-get($vars, 'pos');
    $size: map-get($vars, 'size');
    $gutter: map-get($vars, 'gutter');
    $h-offset: map-get($vars, 'h-offset');
    $v-offset: map-get($vars, 'v-offset');
    @if $size {
      background-size: $size;
    }
    @if $pos == 'edge' {
      $static-offset: $rpl-hero-banner-background-graphic-links-overlap;
      @if $h-offset {
        $static-offset: $static-offset + $h-offset;
      }
      $left-offset: calc(100vw - #{$gutter} - #{$static-offset});
      background-position: left #{$left-offset} bottom #{$v-offset};
    } @else {
      background-position: right bottom #{$v-offset};
    }
  }

  .rpl-hero-banner {
    $root: &;
    @include rpl_mobile_padding;
    position: relative;
    background-repeat: no-repeat;

    // Background graphic positions.
    @each $bp, $vars in $rpl-hero-banner-background-graphic {
      @if str-index($bp, 'px') {
        @media screen and (min-width: $bp) {
          @include rpl_position_background_graphic($vars);
        }
      } @else {
        @include rpl_breakpoint($bp) {
          @include rpl_position_background_graphic($vars);
        }
      }
    }

    @include rpl_breakpoint('m') {
      border-bottom: $rpl-hero-banner-border;
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
      margin-bottom: $rpl-space-4 * 3;
    }

    &__left {
      @include rpl_grid_full;

      @include rpl_breakpoint('l') {
        @include rpl_grid_column(8);
        padding-right: $rpl-hero-banner-left-padding;
      }

      @include rpl_print {
        @include rpl_grid_full;
        padding-right: 0;
      }
    }

    &__right {
      @include rpl_grid_full;
      z-index: $rpl-zindex-content-top;

      @include rpl_breakpoint('l') {
        @include rpl_grid_column(4);
      }

      @include rpl_print_hidden;
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
      word-wrap: break-word;
      margin: 0;

      @include rpl_print {
        line-height: $rpl-hero-banner-title-print-line-height;
      }

      &--dark {
        @include rpl_typography_ruleset($rpl-hero-banner-title-typography-ruleset-dark);
      }
    }

    &__description {
      @include rpl_typography_ruleset($rpl-hero-banner-description-typography-ruleset);
      @include rpl_text_color($rpl-hero-banner-description-text-color);
      letter-spacing: $rpl-hero-banner-description-letter-spacing;
      margin-top: $rpl-space-3;

      @include rpl_breakpoint(s) {
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
      column-count: auto;
    }

    &__link-list-item {
      list-style: none;
      margin: $rpl-hero-banner-link-margin;
    }

    &--no-links {
      & #{$root}__left {
        @include rpl_breakpoint('l') {
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
