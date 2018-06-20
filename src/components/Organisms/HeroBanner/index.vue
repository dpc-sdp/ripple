<template>
  <div class="rpl-hero-banner">
    <div class="rpl-row">
      <div class="rpl-hero-banner__left">
        <h1 class="rpl-hero-banner__title"><span>{{ title }}</span></h1>
        <p class="rpl-hero-banner__description">{{ introText }}</p>
      </div>
      <div class="rpl-hero-banner__right">
        <h2 class="rpl-hero-banner__link-heading">{{ linkHeading }}</h2>
        <ul class="rpl-hero-banner__link-list">
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
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { RplTextLink } from '@dpc-sdp/ripple-link'

export default {
  name: 'RplHeroBanner',
  props: {
    title: String,
    introText: String,
    linkHeading: String,
    links: Array,
    moreLink: Object
  },
  components: {
    RplTextLink
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";

  $rpl-hero-banner-title-typography-ruleset: (
    'xs': ('mega', 1.11em, 'bold'),
    's': ('giga', 1.11em, 'bold'),
    'm': ('xgiga', 1.08em, 'bold'),
    'l': ('tera', 1.07em, 'bold')
  ) !default;
  $rpl-hero-banner-title-color: rpl_color('primary') !default;
  $rpl-hero-banner-description-typography-ruleset: (
    'xs': ('m', 1.22em, 'medium'),
    'm': ('mega', 1.29em, 'medium')
  ) !default;
  $rpl-hero-banner-description-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-hero-banner-description-letter-spacing: rem(-0.12px) !default;
  $rpl-hero-banner-link-heading-typography-rules: (
    'xs': ('xs', 1.7em, 'bold'),
    'm': ('l', 1.4em, 'bold')
  ) !default;
  $rpl-hero-banner-link-heading-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-hero-banner-link-typography-rules: (
    'xs': ('xs', 1.7em, 'medium'),
    'm': ('l', 1.7em, 'medium')
  ) !default;
  $rpl-hero-banner-link-margin: auto auto rem(16px) !default;
  $rpl-hero-banner-more-link-typography-rules: (
    'xs': ('xs', 1.7em, 'bold'),
    'm': ('l', 1.7em, 'bold')
  ) !default;
  $rpl-hero-banner-margin-xs: rem(76px) auto rem(20px) auto !default;
  $rpl-hero-banner-margin-s: rem(88px) auto rem(64px) auto !default;
  $rpl-hero-banner-margin-m: rem(124px) auto rem(80px) auto !default;
  $rpl-hero-banner-margin-l: rem(142px) auto rem(77px) auto !default;
  $rpl-hero-banner-margin-xl: rem(142px) auto rem(77px) auto !default;
  $rpl-hero-banner-margin-xxl: rem(152px) auto rem(68px) auto !default;
  $rpl-hero-banner-link-heading-margin: 0 auto rem(15px) auto !default;

  .rpl-hero-banner {
    @include rpl_mobile_padding;
    @include rpl_grid_container;
    margin: $rpl-hero-banner-margin-xs;

    @include rpl_breakpoint('s') {
      margin: $rpl-hero-banner-margin-s;
    }

    @include rpl_breakpoint('m') {
      margin: $rpl-hero-banner-margin-m;
    }

    @include rpl_breakpoint('l') {
      margin: $rpl-hero-banner-margin-l;
    }

    @include rpl_breakpoint('xl') {
      margin: $rpl-hero-banner-margin-xl;
    }

    @include rpl_breakpoint('xxl') {
      margin: $rpl-hero-banner-margin-xxl;
    }

    &__left {
      @include rpl_grid_full;

      @include rpl_breakpoint('l') {
        @include rpl_grid_column(8);
      }
    }

    &__right {
      @include rpl_grid_full;

      @include rpl_breakpoint('l') {
        @include rpl_grid_column(4);
      }
    }

    &__title {
      @include rpl_typography_ruleset($rpl-hero-banner-title-typography-ruleset);
      color: $rpl-hero-banner-title-color;
      margin: 0;
    }

    &__description {
      @include rpl_typography_ruleset($rpl-hero-banner-description-typography-ruleset);
      color: $rpl-hero-banner-description-text-color;
      letter-spacing: $rpl-hero-banner-description-letter-spacing;
      margin-top: $rpl-space;

      @include rpl_breakpoint(s) {
        margin-top: $rpl-space-2;
      }

      @include rpl_breakpoint(l) {
        margin-top: $rpl-space-4;
      }
    }

    &__link-heading {
      @include rpl_typography_ruleset($rpl-hero-banner-link-heading-typography-rules);
      color: $rpl-hero-banner-link-heading-text-color;
      letter-spacing: rem(-0.08px);
      margin: $rpl-hero-banner-link-heading-margin;
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

    &__link {
      @include rpl_typography_ruleset($rpl-hero-banner-link-typography-rules);
    }

    &__more-link {
      @include rpl_typography_ruleset($rpl-hero-banner-more-link-typography-rules);
    }
  }
</style>
