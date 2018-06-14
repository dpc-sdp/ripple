<template>
  <rpl-link
    class="rpl-card-content"
    :href="link.url"
    :class="{
      'rpl-card-content--no-image': !image
    }"
  >
    <div class="rpl-card-content__image-wrapper" v-if="image">
      <img class="rpl-card-content__image" v-if="image" :src="image" alt="" />
    </div>
    <div class="rpl-card-content__details">
      <slot></slot>
    </div>
    <div class="rpl-card-content__link" v-if="link">
      <span v-if="linkTextWordCount > 1">{{ linkTextWithoutLastWord }}</span>
      <span v-if="linkTextWordCount > 1" class="rpl-card-content__text-link-group">{{ linkTextLastWord }} <rpl-icon symbol="arrow_right_primary_s" color="primary" size="m" /></span>
      <span v-if="linkTextWordCount <= 1" class="rpl-card-content__text-link-group">{{ link.text }} <rpl-icon symbol="arrow_right_primary_s" color="primary" size="m" /></span>
    </div>
  </rpl-link>
</template>

<script>
import RplLink from '@dpc-sdp/ripple-link'
import RplIcon from '@dpc-sdp/ripple-icon'

export default {
  name: 'RplCardContent',
  props: {
    image: String,
    link: Object
  },
  components: {
    RplLink,
    RplIcon
  },
  computed: {
    linkTextWordCount: function () {
      return this.link.text.length > 0 ? this.link.text.match(/[\w\d]+/gi).length : 0
    },
    linkTextWithoutLastWord: function () {
      return this.link.text.substr(0, this.link.text.lastIndexOf(' '))
    },
    linkTextLastWord: function () {
      return this.link.text.substr(this.link.text.lastIndexOf(' '))
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";
  @import "scss/card";

  $rpl-card-content-border-color: rpl_color('mid_neutral_1') !default;
  $rpl-card-content-border: 1px solid $rpl-card-content-border-color !default;
  $rpl-card-content-background: rpl_color('white') !default;
  $rpl-card-content-border-radius: rem(4px) !default;
  $rpl-card-content-icon-after-margin: auto auto auto $rpl-space-2 !default;
  $rpl-card-content-no-image-padding: (rem(56px) - $rpl-card-vertical-padding) 0 0 0 !default;
  $rpl-card-content-no-image-background-image: rpl_gradient('decorative_gradient') !default;
  $rpl-card-content-details-padding-xs: $rpl-card-vertical-padding $rpl-component-padding-xs 0 !default;
  $rpl-card-content-details-padding-s: $rpl-card-vertical-padding $rpl-component-padding-s 0 !default;
  $rpl-card-content-details-padding-m: $rpl-card-vertical-padding $rpl-card-horizontal-padding-m 0 !default;
  $rpl-card-content-link-ruleset: ('xs', 1em, 'semibold') !default;
  $rpl-card-content-link-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-content-link-color-hover: rpl_color('primary') !default;
  $rpl-card-content-link-padding-xs: $rpl-space-3 $rpl-component-padding-xs !default;
  $rpl-card-content-link-padding-s: $rpl-space-3 $rpl-component-padding-s !default;
  $rpl-card-content-link-padding-m: $rpl-space-3 $rpl-card-horizontal-padding-m !default;
  $rpl-card-content-link-line-space-xs: $rpl-component-padding-xs !default;
  $rpl-card-content-link-line-space-s: $rpl-component-padding-s !default;
  $rpl-card-content-link-line-space-m: $rpl-card-horizontal-padding-m !default;

  .rpl-card-content {
    $root: &;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    border-bottom: $rpl-card-content-border;
    background-color: $rpl-card-content-background;
    @include rpl_breakpoint('m') {
      border-radius: $rpl-card-content-border-radius;
      border: $rpl-card-content-border;
      height: rem(460px);
    }
    @include rpl_breakpoint('l') {
      height: rem(500px);
    }
    @include rpl_breakpoint('xl') {
      height: rem(460px);
    }

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

    &--no-image {
      padding: $rpl-card-content-no-image-padding;
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
      object-fit: cover;
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
      padding: $rpl-card-content-details-padding-xs;
      @include rpl_breakpoint('s') {
        padding: $rpl-card-content-details-padding-s;
      }
      @include rpl_breakpoint('m') {
        padding: $rpl-card-content-details-padding-m;
      }
    }

    &__link {
      @include rpl_typography_ruleset($rpl-card-content-link-ruleset);
      color: $rpl-card-content-link-color;
      padding: $rpl-card-content-link-padding-xs;
      align-self: flex-end;
      display: block;
      position: relative;
      width: 100%;
      @include rpl_breakpoint('s') {
        padding: $rpl-card-content-link-padding-s;
      }
      @include rpl_breakpoint('m') {
        padding: $rpl-card-content-link-padding-m;
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

      .rpl-icon {
        margin: $rpl-card-content-icon-after-margin;
        vertical-align: middle;
      }
    }

    &__text-link-group {
      white-space: nowrap;
    }
  }
</style>
