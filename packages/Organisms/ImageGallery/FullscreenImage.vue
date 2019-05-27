<template>
  <div class="rpl-fullscreen-image">
    <div class="rpl-fullscreen-image__details-and-image">
      <div class="rpl-fullscreen-image__image-wrapper">
        <div class="rpl-fullscreen-image__image-sub-wrapper">
          <img v-if="image" class="rpl-fullscreen-image__image" :src="image.src" :alt="image.alt" />
        </div>
      </div>
      <div class="rpl-fullscreen-image__details-navigation">
        <div class="rpl-fullscreen-image__details-navigation-count" v-if="aboveCaption">{{ aboveCaption }}</div>
        <button
          class="rpl-fullscreen-image__details-navigation-toggle"
          :class="{ 'rpl-fullscreen-image__details-navigation-toggle--expanded': toggleCaption }"
          @click="toggleCaption = !toggleCaption"
        >
          <span v-if="!toggleCaption">{{ showCaption }}</span>
          <span v-if="toggleCaption">{{ hideCaption }}</span>
        </button>
      </div>
      <div class="rpl-fullscreen-image__details" :class="{ 'rpl-fullscreen-image__details--show': toggleCaption}">
        <h2 class="rpl-fullscreen-image__title">{{ title }}</h2>
        <p class="rpl-fullscreen-image__caption">{{ caption }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FullscreenImage',
  props: {
    image: Object,
    title: String,
    caption: String,
    aboveCaption: String,
    showCaption: { default: 'View caption', type: String },
    hideCaption: { default: 'Close caption', type: String }
  },
  data: function () {
    return {
      toggleCaption: false
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  @import "./scss/image_gallery";

  $rpl-fullscreen-image-image-box-shadow: 0 ($rpl-space * 7) ($rpl-space * 9) 0 rgba(0, 0, 0, 0.36) !default;
  $rpl-fullscreen-image-image-border-radius: rem(4px) !default;
  $rpl-fullscreen-image-details-mobile-background-image: linear-gradient(to bottom, rgba($rpl-image-gallery-modal-background-color, 0), rgba($rpl-image-gallery-modal-background-color, 0) rem(50px), rgba($rpl-image-gallery-modal-background-color, 0.9) rem(94px), $rpl-image-gallery-modal-background-color rem(120px)) !default;
  $rpl-fullscreen-image-details-padding: ($rpl-space * 17) $rpl-space-3 ($rpl-space * 8) !default;
  $rpl-fullscreen-image-details-navigation-height: ($rpl-space * 8) !default;
  $rpl-fullscreen-image-image-wrapper-offset-top-xs: rem(70px) !default;
  $rpl-fullscreen-image-image-wrapper-offset-top-l: rem(114px) !default;
  $rpl-fullscreen-image-title-ruleset: (
    'xs': ('s', 1em, 'bold'),
    'l': ('giga', 1.11em, 'bold')
  ) !default;
  $rpl-fullscreen-image-title-text-color: rpl-color('white') !default;
  $rpl-fullscreen-image-caption-ruleset: (
    'xs': ('xs', 1.43em, 'regular'),
    'l': ('m', 1.33em, 'regular')
  ) !default;
  $rpl-fullscreen-image-caption-text-color: rpl-color('white') !default;
  $rpl-fullscreen-image-count-ruleset: ('s', 1em, 'bold') !default;
  $rpl-fullscreen-image-count-text-color: rpl-color('white') !default;
  $rpl-fullscreen-image-nav-toggle-ruleset: ('xs', 1.14em, 'bold') !default;
  $rpl-fullscreen-image-nav-toggle-text-color: rpl-color('white') !default;
  $rpl-fullscreen-image-nav-toggle-icon-color: rpl-color('secondary') !default;

  .rpl-fullscreen-image {
    position: relative;
    height: 100%;

    @include rpl-breakpoint('l') {
      display: flex;
      align-items: flex-end;
    }

    &__details-and-image {
      display: inline-block;
      position: relative;
      width: 100%;
      height: 100%;

      @include rpl-breakpoint('l') {
        height: auto;
      }
    }

    &__image-wrapper {
      width: 100%;
      position: absolute;
      height: calc(100% - #{$rpl-fullscreen-image-image-wrapper-offset-top-xs} - #{$rpl-fullscreen-image-details-navigation-height});
      margin-top: $rpl-fullscreen-image-image-wrapper-offset-top-xs;

      @include rpl-breakpoint('l') {
        bottom: 100%;
        height: calc(100vh - 100% - #{$rpl-fullscreen-image-image-wrapper-offset-top-l});
        margin-top: 0;
      }
    }

    &__image-sub-wrapper {
      position: relative;
      height: 100%;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: center;
    }

    &__image {
      border-radius: $rpl-fullscreen-image-image-border-radius;
      box-shadow: $rpl-fullscreen-image-image-box-shadow;
      max-height: 100%;
      max-width: 100%;

      @include rpl-breakpoint('l') {
        max-width: calc(100% - #{$rpl-space * 15});
      }
    }

    &__details {
      display: none;
      background-image: $rpl-fullscreen-image-details-mobile-background-image;
      z-index: 1;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: $rpl-fullscreen-image-details-padding;

      @include rpl-breakpoint('l') {
        display: block;
        position: relative;
        padding: 0;
        background-color: transparent;
        background-image: none;
        margin-bottom: ($rpl-space * 16);
      }

      &--show {
        display: block;
      }
    }

    &__details-navigation {
      width: 100%;
      justify-content: space-between;
      padding: 0 $rpl-space-4 $rpl-image-gallery-fullscreen-details-navigation-padding-bottom;
      box-sizing: border-box;
      position: absolute;
      vertical-align: top;
      height: $rpl-fullscreen-image-details-navigation-height;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 2;

      @include rpl-breakpoint('l') {
        display: none;
      }
    }

    &__details-navigation-count {
      @include rpl_typography_ruleset($rpl-fullscreen-image-count-ruleset);
      color: $rpl-fullscreen-image-count-text-color;
      float: left;
    }

    &__details-navigation-toggle {
      @include rpl_typography_ruleset($rpl-fullscreen-image-nav-toggle-ruleset);
      color: $rpl-fullscreen-image-nav-toggle-text-color;
      background-color: transparent;
      border: 0;
      padding: 0;
      margin: 0;
      cursor: pointer;
      float: right;

      &::after {
        content: '+';
        color: $rpl-fullscreen-image-nav-toggle-icon-color;
        margin-left: $rpl-space;
      }

      &--expanded {
        &::after {
          content: '-';
        }
      }
    }

    &__title {
      @include rpl_typography_ruleset($rpl-fullscreen-image-title-ruleset);
      color: $rpl-fullscreen-image-title-text-color;
    }

    &__caption {
      @include rpl_typography_ruleset($rpl-fullscreen-image-caption-ruleset);
      color: $rpl-fullscreen-image-caption-text-color;
    }

    &__navigation {
      display: flex;
      position: absolute;
      left: $rpl-space * 13;
      height: $rpl-space-4;
      bottom: $rpl-image-gallery-fullscreen-details-navigation-padding-bottom;

      @include rpl-breakpoint('l') {
        top: 50%;
        left: 0;
        right: 0;
        bottom: auto;
        height: auto;
        transform: translateY(-50%);
      }
    }
  }
</style>
