<template>
  <rpl-link class="rpl-card-navigation-featured" :href="url" v-if="url" :innerWrap="false">
    <div class="rpl-card-navigation-featured__inner">
      <img class="rpl-card-navigation-featured__image" :src="image" alt="">
      <div class="rpl-card-navigation-featured__meta_and_title" v-if="title || date || topic">
        <div class="rpl-card-navigation-featured__meta" v-if="date || topic">
          <span class="rpl-card-navigation-featured__date" v-if="date">{{ formatDate(date) }}</span>
          <span class="rpl-card-navigation-featured__tag" v-if="topic">{{ topic }}</span>
        </div>
        <h2
          v-if="title"
          class="rpl-card-navigation-featured__title"
        ><span>{{ title }}</span></h2>
      </div>
    </div>
    <p v-if="summary" class="rpl-card-navigation-featured__summary">{{ summary }}</p>
    <rpl-icon v-if="summary" symbol="arrow_right_primary" color="white" />
  </rpl-link>
</template>

<script>
import formatdate from '@dpc-sdp/ripple-global/mixins/formatdate'
import RplLink from '@dpc-sdp/ripple-link'
import RplIcon from '@dpc-sdp/ripple-icon'

export default {
  name: 'RplCardNavigationFeatured',
  mixins: [formatdate],
  props: {
    title: String,
    summary: String,
    url: String,
    image: String,
    date: String,
    topic: String
  },
  components: {
    RplLink,
    RplIcon
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  @import "scss/card";

  $rpl-card-navigation-featured-margin-xs: $rpl-space-3 auto !default;
  $rpl-card-navigation-featured-margin-s: ($rpl-space * 5) auto !default;
  $rpl-card-navigation-featured-background: rpl_color('primary') !default;
  $rpl-card-navigation-featured-max-width: rem(818px) !default;
  $rpl-card-navigation-featured-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-navigation-featured-border-radius: rem(4px) !default;
  $rpl-card-navigation-featured-title-ruleset: (
    'xs': ('mega', 1.3em, 'bold', true),
    's': ('giga', 1.6em, 'bold', true)
  ) !default;
  $rpl-card-navigation-featured-summary-ruleset: (
    'xs': ('xs', 1.4em, 'bold'),
    's': ('s', 1.5em, 'bold')
  ) !default;
  $rpl-card-navigation-featured-summary-color: rpl_color('white') !default;
  $rpl-card-navigation-featured-summary-background: transparent url(rpl_graphic_right_angled_triangle('secondary')) no-repeat bottom right !default;
  $rpl-card-navigation-featured-summary-background-hover: rpl_color('secondary') url(rpl_graphic_right_angled_triangle('primary')) no-repeat bottom right !default;
  $rpl-card-navigation-featured-summary-xs: ($rpl-space * 11) $rpl-component-padding-xs ($rpl-space * 7) !default;
  $rpl-card-navigation-featured-summary-s: ($rpl-space * 6) $rpl-component-padding-s ($rpl-space * 7) !default;
  $rpl-card-navigation-featured-summary-m: ($rpl-space * 6) $rpl-component-padding-m ($rpl-space * 7) !default;
  $rpl-card-navigation-featured-summary-l: ($rpl-space * 11) $rpl-component-padding-l ($rpl-space * 7) !default;
  $rpl-card-navigation-featured-summary-xl: ($rpl-space * 6) $rpl-component-padding-xl ($rpl-space * 7) !default;
  $rpl-card-navigation-featured-meta-background: rpl_color('secondary') !default;
  $rpl-card-navigation-featured-meta-text-color: rpl_color('white') !default;
  $rpl-card-navigation-featured-meta-padding: 0 $rpl-space-2 !default;
  $rpl-card-navigation-featured-date-ruleset: ('xs', 1em, 'semibold') !default;
  $rpl-card-navigation-featured-tag-ruleset: ('xxs', 1em, 'medium') !default;
  $rpl-card-navigation-featured-meta-divider-margin: auto $rpl-space-2 !default;

  .rpl-card-navigation-featured {
    $root: &;
    @include rpl_text_color($rpl-card-navigation-featured-color);
    overflow: hidden;
    display: block;
    position: relative;
    background-color: $rpl-card-navigation-featured-background;
    max-width: $rpl-card-navigation-featured-max-width;
    border-radius: $rpl-card-navigation-featured-border-radius;

    @include rpl_print_hidden;

    &:hover,
    &:focus {
      @include rpl_dropshadow;

      &.rpl-link {
        text-decoration: none;
      }

      #{$root}__summary {
        background: $rpl-card-navigation-featured-summary-background-hover;
      }
    }

    &__inner {
      position: relative;
    }

    &__image {
      display: table;
      width: 100%;
      @include rpl_breakpoint('s') {
        border-radius: $rpl-card-navigation-featured-border-radius $rpl-card-navigation-featured-border-radius 0 0;
      }
    }

    &__meta_and_title {
      position: absolute;
      left: $rpl-component-padding-xs;
      right: $rpl-component-padding-xs;
      bottom: $rpl-space * -8;
      z-index: 1;
      @include rpl_breakpoint('s') {
        left: $rpl-component-padding-s;
        right: $rpl-component-padding-s;
        bottom: ($rpl-space * 5);
      }
      @include rpl_breakpoint('m') {
        left: $rpl-component-padding-m;
        right: $rpl-component-padding-m;
      }
      @include rpl_breakpoint('l') {
        left: $rpl-component-padding-l;
        right: $rpl-component-padding-l;
        bottom: $rpl-space * -8;
      }
      @include rpl_breakpoint('xl') {
        left: $rpl-component-padding-xl;
        right: $rpl-component-padding-xl;
        bottom: ($rpl-space * 5);
      }
    }

    &__meta {
      @include rpl_text_color($rpl-card-navigation-featured-meta-text-color);
      display: inline-block;
      background-color: $rpl-card-navigation-featured-meta-background;
      padding: $rpl-card-navigation-featured-meta-padding;
      margin-bottom: $rpl-space;

      span + span {
        &:before {
          content: '|';
          margin: $rpl-card-navigation-featured-meta-divider-margin;
        }
      }
    }

    &__date {
      @include rpl_typography_ruleset($rpl-card-navigation-featured-date-ruleset);
    }

    &__tag {
      @include rpl_typography_ruleset($rpl-card-navigation-featured-tag-ruleset);
      text-transform: uppercase;
    }

    &__title {
      @include rpl_typography_ruleset($rpl-card-navigation-featured-title-ruleset);
      margin: 0;

      span {
        line-height: 1.5em;
      }
    }

    &__summary {
      background: $rpl-card-navigation-featured-summary-background;
      @include rpl_typography_ruleset($rpl-card-navigation-featured-summary-ruleset);
      @include rpl_text_color($rpl-card-navigation-featured-summary-color);
      margin: 0;
      padding: $rpl-card-navigation-featured-summary-xs;
      @include rpl_breakpoint('s') {
        padding: $rpl-card-navigation-featured-summary-s;
      }
      @include rpl_breakpoint('l') {
        padding: $rpl-card-navigation-featured-summary-m;
      }
      @include rpl_breakpoint('l') {
        padding: $rpl-card-navigation-featured-summary-l;
      }
      @include rpl_breakpoint('xl') {
        padding: $rpl-card-navigation-featured-summary-xl;
      }
    }

    .rpl-icon {
      position: absolute;
      bottom: $rpl-space-3;
      right: $rpl-space-3;
    }
  }
</style>
