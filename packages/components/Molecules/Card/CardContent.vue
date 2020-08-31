<template>
  <rpl-link
    class="rpl-card-content"
    :href="link.url"
    :class="{
      'rpl-card-content--no-image': !image,
      'rpl-card-content--has-border': (border && !image),
      'rpl-card-content--center': (center && !image),
      'rpl-card-content--default': (type === 'default'),
      'rpl-card-content--simple': (type === 'simple'),
      'rpl-card-content--inline': (type === 'inline'),
      'rpl-card-content--has-link-text': link.text
    }"
    :innerWrap="false"
    v-if="link"
  >
    <div class="rpl-card-content__image-wrapper" v-if="computedImg">
      <rpl-responsive-img class="rpl-card-content__image" v-bind="computedImg" alt="" :srcSet="[{ size: 'xs', height: 534, width: 764  }, { size: 's', height: 200, width: 764  }, {  size: 'm', height: 232, width: 448 }, {  size: 'l', height: 232, width: 333 }]" />
    </div>
    <div class="rpl-card-content__details">
      <slot></slot>
      <div class="rpl-card-content__link" v-if="link.text && (type === 'inline')">
        <rpl-text-icon :text="link.text" :symbol="iconSymbol" color="primary" size="0.7" />
      </div>
    </div>
    <div class="rpl-card-content__link" v-if="link.text && (type !== 'inline')">
      <rpl-text-icon :text="link.text" :symbol="iconSymbol" color="primary" size="0.7" />
    </div>
  </rpl-link>
</template>

<script>
import RplLink from '@dpc-sdp/ripple-link'
import { RplTextIcon } from '@dpc-sdp/ripple-icon'
import { isExternalUrl } from '@dpc-sdp/ripple-global/utils/helpers.js'
import RplResponsiveImg from '@dpc-sdp/ripple-responsive-img'

export default {
  name: 'RplCardContent',
  props: {
    link: {
      type: Object,
      required: true
    },
    image: [String, Object],
    border: { type: Boolean, default: true },
    center: { type: Boolean, default: false },
    type: { type: String, default: 'default' }
  },
  components: {
    RplLink,
    RplTextIcon,
    RplResponsiveImg
  },
  computed: {
    iconSymbol () {
      return isExternalUrl(this.link.url, this.rplOptions.hostname) ? 'external_link' : 'arrow_right_primary'
    },
    computedImg () {
      return typeof this.image === 'string' ? { src: this.image } : this.image
    }
  },
  created () {
    // We will throw a error to let parent component(card or card container) to handle.
    // The reason we are not handle it here is we want the card container to handle it in UI, so user can see it.
    if (!this.link || typeof this.link.url === 'undefined') {
      throw new Error('Invalid link is provided to card component.')
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  @import "scss/card";

  $rpl-card-content-border-color: rpl_color('mid_neutral_1') !default;
  $rpl-card-content-border: 1px solid $rpl-card-content-border-color !default;
  $rpl-card-content-border-radius: rem(4px) !default;
  $rpl-card-content-border-height: rem(8px) !default;
  $rpl-card-content-background: rpl_color('white') !default;
  $rpl-card-content-no-image-padding: (rem(56px) - $rpl-card-vertical-padding) 0 0 0 !default;
  $rpl-card-content-no-image-background-image: rpl_gradient('decorative_gradient') !default;
  $rpl-card-content-default-link-ruleset: ('xs', 1em, 'semibold') !default;
  $rpl-card-content-simple-link-ruleset: (
    'xs': ('xs', 1em, 'semibold'),
    's': ('s', 1em, 'semibold')
  ) !default;
  $rpl-card-content-inline-link-ruleset: (
    'xs': ('xs', 1em, 'semibold'),
    'm': ('s', 1em, 'semibold')
  ) !default;
  $rpl-card-content-link-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-content-link-color-hover: rpl_color('primary') !default;
  $rpl-card-content-link-line-space-xs: $rpl-component-padding-xs !default;
  $rpl-card-content-link-line-space-s: $rpl-component-padding-s !default;
  $rpl-card-content-link-line-space-m: $rpl-card-horizontal-padding-m !default;
  $rpl-card-content-default-details-padding-xs: $rpl-card-vertical-padding $rpl-component-padding-xs !default;
  $rpl-card-content-default-details-padding-s: $rpl-card-vertical-padding $rpl-component-padding-s !default;
  $rpl-card-content-default-details-padding-m: $rpl-card-vertical-padding $rpl-card-horizontal-padding-m !default;
  $rpl-card-content-default-link-padding-xs: $rpl-space-3 $rpl-component-padding-xs !default;
  $rpl-card-content-default-link-padding-s: $rpl-space-3 $rpl-component-padding-s !default;
  $rpl-card-content-default-link-padding-m: $rpl-space-3 $rpl-card-horizontal-padding-m !default;
  $rpl-card-content-simple-details-padding-xs: ($rpl-space * 6) ($rpl-space * 6) !default;
  $rpl-card-content-simple-details-padding-s: ($rpl-space * 8) ($rpl-space * 8) !default;
  $rpl-card-content-simple-details-padding-m: ($rpl-space * 8) ($rpl-space * 8) !default;
  $rpl-card-content-simple-link-padding-xs: $rpl-space-3 ($rpl-space * 6) ($rpl-space * 6) ($rpl-space * 6) !default;
  $rpl-card-content-simple-link-padding-s: $rpl-space-3 ($rpl-space * 8) ($rpl-space * 8) ($rpl-space * 8) !default;
  $rpl-card-content-simple-link-padding-m: $rpl-space-3 ($rpl-space * 8) ($rpl-space * 8) ($rpl-space * 8) !default;
  $rpl-card-content-inline-padding-xs: ($rpl-space * 6) ($rpl-space * 6) !default;
  $rpl-card-content-inline-padding-s: ($rpl-space * 8) ($rpl-space * 8) !default;
  $rpl-card-content-inline-padding-m: ($rpl-space * 8) ($rpl-space * 8) !default;
  $rpl-card-content-inline-link-padding-xs: $rpl-space-3 0 $rpl-space-3 0 !default;
  $rpl-card-content-inline-link-padding-s: $rpl-space-3 0 $rpl-space-3 0 !default;
  $rpl-card-content-inline-link-padding-m: $rpl-space-3 0 0 0 !default;
  $rpl-card-content-img-height: (
    'xs': rem(300px),
    'm': rem(200px),
    'l': rem(232px),
    'xl': rem(200px)
  ) !default;

  .rpl-card-content {
    $root: &;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    background-color: $rpl-card-content-background;
    border: $rpl-card-content-border;
    border-radius: $rpl-card-content-border-radius;

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
      @include rpl_breakpoint('m') {
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

      &#{$root}--center {
        @include rpl_breakpoint('m') {
          padding-top: 0;
          flex-direction: column;
          width: 100%;
        }
      }
    }

    &--inline {
      @include rpl_breakpoint('m') {
        flex-wrap: nowrap;
        padding: $rpl-card-content-inline-padding-m;
      }
    }

    &--has-border {
      background-image: $rpl-card-content-no-image-background-image;
      background-size: 100% $rpl-card-content-border-height;
      background-repeat: no-repeat;
    }

    &__image-wrapper {
      width: 100%;
      #{$root}--default &,
      #{$root}--simple & {
        @each $bp, $height in $rpl-card-content-img-height {
          @include rpl_breakpoint($bp) {
            height: $height;
          }
        }
      }

      #{$root}--inline & {
        @include rpl_breakpoint('m') {
          margin-right: $rpl-space * 6;
          width: 40%;
          max-width: rem(304px);
        }
      }
    }

    &__image {
      width: 100%;
      display: table;

      #{$root}--default &,
      #{$root}--simple & {
        @each $bp, $height in $rpl-card-content-img-height {
          @include rpl_breakpoint($bp) {
            height: $height;
          }
        }
      }
      #{$root}--inline & {
        @include rpl_breakpoint('m') {
          border-radius: $rpl-card-content-border-radius;
        }
      }
    }

    &__details {
      width: 100%;
      box-sizing: border-box;

      #{$root}--default & {
        padding: $rpl-card-content-default-details-padding-xs;
        @include rpl_breakpoint('s') {
          padding: $rpl-card-content-default-details-padding-s;
        }
        @include rpl_breakpoint('m') {
          padding: $rpl-card-content-default-details-padding-m;
        }
      }

      #{$root}--default#{$root}--center & {
        @include rpl_breakpoint('m') {
          margin: auto 0;
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

      #{$root}--inline & {
        padding: $rpl-card-content-default-details-padding-xs;
        @include rpl_breakpoint('s') {
          padding: $rpl-card-content-default-details-padding-s;
        }
        @include rpl_breakpoint('m') {
          display: flex;
          flex-wrap: wrap;
          padding: 0;
          width: 60%;
        }
      }

      #{$root}--has-link-text & {
        padding-bottom: 0;
        @include rpl_breakpoint('s') {
          padding-bottom: 0;
        }
        @include rpl_breakpoint('m') {
          padding-bottom: 0;
        }
      }
    }

    &__link {
      color: $rpl-card-content-link-color;
      align-self: flex-end;
      display: block;
      box-sizing: border-box;
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

      #{$root}--inline & {
        @include rpl_typography_ruleset($rpl-card-content-inline-link-ruleset);
        padding: $rpl-card-content-inline-link-padding-xs;
        @include rpl_breakpoint('s') {
          padding: $rpl-card-content-inline-link-padding-s;
        }
        @include rpl_breakpoint('m') {
          padding: $rpl-card-content-inline-link-padding-m;
        }
      }

      .rpl-icon {
        vertical-align: middle;
      }
    }
  }
</style>
