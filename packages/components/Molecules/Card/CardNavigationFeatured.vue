<template>
  <rpl-link class="rpl-card-navigation-featured" :href="url" v-if="url" :innerWrap="false">
    <div class="rpl-card-navigation-featured__inner">
      <rpl-responsive-img class="rpl-card-navigation-featured__image" v-bind="computedImg" alt="" />
      <div
        v-if="title || date || topic"
        class="rpl-card-navigation-featured__meta_and_title"
        :class="{
          'rpl-card-navigation-featured__meta_and_title--image': image,
          'rpl-card-navigation-featured__meta_and_title--no-image': !image,
          'rpl-card-navigation-featured__meta_and_title--summary': summary
        }"
      >
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
    <p
      v-if="summary"
      class="rpl-card-navigation-featured__summary"
      :class="{
        'rpl-card-navigation-featured__summary--image': image,
        'rpl-card-navigation-featured__summary--meta-no-image': !image && (title || date || topic)
      }"
    >{{ summary }}</p>
    <rpl-icon v-if="!(image && !summary)" symbol="arrow_right_primary" color="white" />
  </rpl-link>
</template>

<script>
import formatdate from '@dpc-sdp/ripple-global/mixins/formatdate'
import RplLink from '@dpc-sdp/ripple-link'
import RplIcon from '@dpc-sdp/ripple-icon'
import RplResponsiveImg from '@dpc-sdp/ripple-responsive-img'

export default {
  name: 'RplCardNavigationFeatured',
  mixins: [formatdate],
  props: {
    title: String,
    summary: String,
    url: {
      type: String,
      required: true
    },
    image: [Object, String],
    date: String,
    topic: String
  },
  components: {
    RplResponsiveImg,
    RplLink,
    RplIcon
  },
  created () {
    // We will throw a error to let parent component(card or card container) to handle.
    // The reason we are not handle it here is we want the card container to know the error so it can apply different style.
    if (!this.url) {
      throw new Error('Invalid url is provided to card navigation featured component.')
    }
  },
  computed: {
    computedImg () {
      return typeof this.image === 'string' ? { src: this.image } : this.image
    }
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
  $rpl-card-navigation-featured-background-alter: rpl_color('secondary') !default;
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
  $rpl-card-navigation-featured-summary-background: $rpl-card-navigation-featured-background url(rpl_graphic_right_angled_triangle('secondary')) no-repeat bottom right !default;
  $rpl-card-navigation-featured-summary-background-hover: $rpl-card-navigation-featured-background-alter url(rpl_graphic_right_angled_triangle('primary')) no-repeat bottom right !default;
  $rpl-card-navigation-featured-summary-xs: ($rpl-space * 11) $rpl-component-padding-xs ($rpl-space * 7) !default;
  $rpl-card-navigation-featured-summary-s: ($rpl-space * 6) $rpl-component-padding-s ($rpl-space * 7) !default;
  $rpl-card-navigation-featured-summary-m: ($rpl-space * 6) $rpl-component-padding-m ($rpl-space * 7) !default;
  $rpl-card-navigation-featured-summary-l: ($rpl-space * 11) $rpl-component-padding-l ($rpl-space * 7) !default;
  $rpl-card-navigation-featured-summary-xl: ($rpl-space * 6) $rpl-component-padding-xl ($rpl-space * 7) !default;
  $rpl-card-navigation-featured-title-xs: ($rpl-space * 9) $rpl-component-padding-xs !default;
  $rpl-card-navigation-featured-title-s: ($rpl-space * 9) $rpl-component-padding-s !default;
  $rpl-card-navigation-featured-title-m: ($rpl-space * 9) $rpl-component-padding-m !default;
  $rpl-card-navigation-featured-title-l: ($rpl-space * 9) $rpl-component-padding-l !default;
  $rpl-card-navigation-featured-title-xl: ($rpl-space * 9) $rpl-component-padding-xl !default;
  $rpl-card-navigation-featured-meta-background: $rpl-card-navigation-featured-background-alter !default;
  $rpl-card-navigation-featured-meta-text-color: rpl_color('white') !default;
  $rpl-card-navigation-featured-meta-padding: 0 $rpl-space-2 !default;
  $rpl-card-navigation-featured-date-ruleset: ('xs', 1em, 'semibold') !default;
  $rpl-card-navigation-featured-tag-ruleset: ('xxs', 1em, 'medium') !default;
  $rpl-card-navigation-featured-meta-divider-margin: auto $rpl-space-2 !default;
  $rpl-card-navigation-featured-image-height: 355px !default;

  .rpl-card-navigation-featured {
    $root: &;
    @include rpl_text_color($rpl-card-navigation-featured-color);
    overflow: hidden;
    display: block;
    position: relative;
    background-color: $rpl-card-navigation-featured-background;
    max-width: $rpl-card-navigation-featured-max-width;
    border-radius: $rpl-card-navigation-featured-border-radius;
    background: $rpl-card-navigation-featured-summary-background;

    &:hover,
    &:focus {
      @include rpl_dropshadow;
      background: $rpl-card-navigation-featured-summary-background-hover;

      &.rpl-link {
        text-decoration: none;
      }
    }

    &__inner {
      position: relative;
    }

    &__image {
      display: table;
      width: 100%;
      height: $rpl-card-navigation-featured-image-height;
      @include rpl_breakpoint('s') {
        border-radius: $rpl-card-navigation-featured-border-radius $rpl-card-navigation-featured-border-radius 0 0;
      }
    }

    &__meta_and_title {
      &--no-image {
        padding: $rpl-card-navigation-featured-title-xs;
        @include rpl_breakpoint('s') {
          padding: $rpl-card-navigation-featured-title-s;
        }
        @include rpl_breakpoint('l') {
          padding: $rpl-card-navigation-featured-title-m;
        }
        @include rpl_breakpoint('l') {
          padding: $rpl-card-navigation-featured-title-l;
        }
        @include rpl_breakpoint('xl') {
          padding: $rpl-card-navigation-featured-title-xl;
        }

        &#{$root}__meta_and_title--summary {
          padding-bottom: 0;
        }
      }

      &--image {
        position: absolute;
        left: $rpl-component-padding-xs;
        right: $rpl-component-padding-xs;
        bottom: ($rpl-space * 5);
        z-index: 1;
        @include rpl_breakpoint('s') {
          left: $rpl-component-padding-s;
          right: $rpl-component-padding-s;
        }
        @include rpl_breakpoint('m') {
          left: $rpl-component-padding-m;
          right: $rpl-component-padding-m;
        }
        @include rpl_breakpoint('l') {
          left: $rpl-component-padding-l;
          right: $rpl-component-padding-l;
        }
        @include rpl_breakpoint('xl') {
          left: $rpl-component-padding-xl;
          right: $rpl-component-padding-xl;
        }

        &#{$root}__meta_and_title--summary {
          bottom: $rpl-space * -8;
          @include rpl_breakpoint('s') {
            bottom: ($rpl-space * 5);
          }
          @include rpl_breakpoint('l') {
            bottom: $rpl-space * -8;
          }
          @include rpl_breakpoint('xl') {
            bottom: ($rpl-space * 5);
          }
        }
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
      @include rpl_typography_ruleset($rpl-card-navigation-featured-summary-ruleset);
      @include rpl_text_color($rpl-card-navigation-featured-summary-color);
      margin: 0;
      min-height: $rpl-space * 12;
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

      &--meta-no-image {
        padding-top: $rpl-space-4;
      }
    }

    .rpl-icon {
      position: absolute;
      bottom: $rpl-space-3;
      right: $rpl-space-3;
    }
  }
</style>
