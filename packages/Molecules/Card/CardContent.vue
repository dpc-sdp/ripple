<template>
  <rpl-link
    class="rpl-card-content"
    :href="link.url"
    :class="{
      'rpl-card-content--no-image': !image,
      'rpl-card-content--has-border': (border && !image),
      'rpl-card-content--default': (type === 'default'),
      'rpl-card-content--simple': (type === 'simple')
    }"
    v-if="link"
  >
    <div class="rpl-card-content__image-wrapper" v-if="image">
      <img class="rpl-card-content__image" v-if="image" :src="image" alt="" />
    </div>
    <div class="rpl-card-content__details">
      <slot></slot>
    </div>
    <div class="rpl-card-content__link" v-if="link">
      <rpl-text-icon :text="link.text" :symbol="iconSymbol" color="primary" size="0.7" />
    </div>
  </rpl-link>
</template>

<script>
import RplLink from '@dpc-sdp/ripple-link'
import {RplTextIcon} from '@dpc-sdp/ripple-icon'
import { isExternalUrl } from '@dpc-sdp/ripple-global/utils/helpers.js'
import objectFitImages from 'object-fit-images'
objectFitImages('img.rpl-card-content__image')

export default {
  name: 'RplCardContent',
  props: {
    link: Object,
    image: String,
    border: { type: Boolean, default: true },
    type: { type: String, default: 'default' }
  },
  components: {
    RplLink,
    RplTextIcon
  },
  computed: {
    iconSymbol () {
      return isExternalUrl(this.link.url, this.rplOptions.hostname) ? 'external_link' : 'arrow_right_primary'
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";
  @import "scss/card";

  $rpl-card-content-border-color: rpl_color('mid_neutral_1') !default;
  $rpl-card-content-border-width: 1px !default;
  $rpl-card-content-border: $rpl-card-content-border-width solid $rpl-card-content-border-color !default;
  $rpl-card-content-border-radius: rem(4px) !default;
  $rpl-card-content-background: rpl_color('white') !default;
  $rpl-card-content-no-image-padding: (rem(56px) - $rpl-card-vertical-padding) 0 0 0 !default;
  $rpl-card-content-no-image-background-image: rpl_gradient('decorative_gradient') !default;
  $rpl-card-content-default-link-ruleset: ('xs', 1em, 'semibold') !default;
  $rpl-card-content-simple-link-ruleset: (
    'xs': ('xs', 1em, 'semibold'),
    's': ('s', 1em, 'semibold')
  ) !default;
  $rpl-card-content-link-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-content-link-color-hover: rpl_color('primary') !default;
  $rpl-card-content-link-line-space-xs: $rpl-component-padding-xs !default;
  $rpl-card-content-link-line-space-s: $rpl-component-padding-s !default;
  $rpl-card-content-link-line-space-m: $rpl-card-horizontal-padding-m !default;
  $rpl-card-content-default-details-padding-xs: $rpl-card-vertical-padding $rpl-component-padding-xs 0 !default;
  $rpl-card-content-default-details-padding-s: $rpl-card-vertical-padding $rpl-component-padding-s 0 !default;
  $rpl-card-content-default-details-padding-m: $rpl-card-vertical-padding $rpl-card-horizontal-padding-m 0 !default;
  $rpl-card-content-default-link-padding-xs: $rpl-space-3 $rpl-component-padding-xs !default;
  $rpl-card-content-default-link-padding-s: $rpl-space-3 $rpl-component-padding-s !default;
  $rpl-card-content-default-link-padding-m: $rpl-space-3 $rpl-card-horizontal-padding-m !default;
  $rpl-card-content-simple-details-padding-xs: ($rpl-space * 6) ($rpl-space * 6) 0 !default;
  $rpl-card-content-simple-details-padding-s: ($rpl-space * 8) ($rpl-space * 8) 0 !default;
  $rpl-card-content-simple-details-padding-m: ($rpl-space * 8) ($rpl-space * 8) 0 !default;
  $rpl-card-content-simple-link-padding-xs: $rpl-space-3 ($rpl-space * 6) ($rpl-space * 6) ($rpl-space * 6) !default;
  $rpl-card-content-simple-link-padding-s: $rpl-space-3 ($rpl-space * 8) ($rpl-space * 8) ($rpl-space * 8) !default;
  $rpl-card-content-simple-link-padding-m: $rpl-space-3 ($rpl-space * 8) ($rpl-space * 8) ($rpl-space * 8) !default;

  .rpl-card-content {
    $root: &;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    border-bottom: $rpl-card-content-border;
    background-color: $rpl-card-content-background;
    border: $rpl-card-content-border;

    &:hover,
    &:focus {
      @include rpl_dropshadow;

      &.rpl-link {
        text-decoration: none;
      }

      #{$root}__link {
        color: $rpl-card-content-link-color-hover;
      }
    }

    &--default {
      border-width: 0;
      @include rpl_breakpoint('m') {
        border-radius: $rpl-card-content-border-radius;
        border-width: $rpl-card-content-border-width;
        height: rem(460px);
      }
      @include rpl_breakpoint('l') {
        height: rem(500px);
      }
      @include rpl_breakpoint('xl') {
        height: rem(460px);
      }

      &#{$root}--no-image {
        padding: $rpl-card-content-no-image-padding;
      }
    }

    &--simple {
      border-radius: $rpl-card-content-border-radius;
    }

    &--has-border {
      &:before {
        content: '';
        position: absolute;
        background-image: $rpl-card-content-no-image-background-image;
        top: 0;
        left: 0;
        right: 0;
        height: rem(8px);
      }
    }

    &__image-wrapper {
      width: 100%;
      @include rpl_breakpoint('m') {
        height: rem(200px);
      }
      @include rpl_breakpoint('l') {
        height: rem(232px);
      }
      @include rpl_breakpoint('xl') {
        height: rem(200px);
      }
    }

    &__image {
      @include object_fit_image(cover);
      width: 100%;
      display: table;
      @include rpl_breakpoint('m') {
        height: rem(200px);
      }
      @include rpl_breakpoint('l') {
        height: rem(232px);
      }
      @include rpl_breakpoint('xl') {
        height: rem(200px);
      }
    }

    &__details {
      #{$root}--default & {
        padding: $rpl-card-content-default-details-padding-xs;
        @include rpl_breakpoint('s') {
          padding: $rpl-card-content-default-details-padding-s;
        }
        @include rpl_breakpoint('m') {
          padding: $rpl-card-content-default-details-padding-m;
        }
      }

      #{$root}--simple & {
        padding: $rpl-card-content-simple-details-padding-xs;
        @include rpl_breakpoint('s') {
          padding: $rpl-card-content-simple-details-padding-s;
        }
        @include rpl_breakpoint('m') {
          padding: $rpl-card-content-simple-details-padding-m;
        }
      }
    }

    &__link {
      color: $rpl-card-content-link-color;
      align-self: flex-end;
      display: block;
      position: relative;
      width: 100%;

      #{$root}--default & {
        @include rpl_typography_ruleset($rpl-card-content-default-link-ruleset);
        padding: $rpl-card-content-default-link-padding-xs;
        @include rpl_breakpoint('s') {
          padding: $rpl-card-content-default-link-padding-s;
        }
        @include rpl_breakpoint('m') {
          padding: $rpl-card-content-default-link-padding-m;
        }

        &::before {
          content: '';
          background-color: $rpl-card-content-border-color;
          height: 1px;
          display: block;
          position: absolute;
          top: 0;
          left: $rpl-card-content-link-line-space-xs;
          right: $rpl-card-content-link-line-space-xs;
          @include rpl_breakpoint('s') {
            left: $rpl-card-content-link-line-space-s;
            right: $rpl-card-content-link-line-space-s;
          }
          @include rpl_breakpoint('m') {
            left: $rpl-card-content-link-line-space-m;
            right: $rpl-card-content-link-line-space-m;
          }
        }
      }

      #{$root}--simple & {
        @include rpl_typography_ruleset($rpl-card-content-simple-link-ruleset);
        padding: $rpl-card-content-simple-link-padding-xs;
        @include rpl_breakpoint('s') {
          padding: $rpl-card-content-simple-link-padding-s;
        }
        @include rpl_breakpoint('m') {
          padding: $rpl-card-content-simple-link-padding-m;
        }
      }

      .rpl-icon {
        vertical-align: middle;
      }
    }
  }
</style>
