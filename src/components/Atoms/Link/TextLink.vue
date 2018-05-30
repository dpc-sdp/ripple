<template>
  <rpl-link class="rpl-text-link" :class="{
    'rpl-text-link--underline': underline,
    'rpl-text-link--dark': (theme === 'dark'),
    'rpl-text-link--small': (size === 'small'),
    'rpl-text-link--large': (size === 'large'),
    'rpl-text-link--emphasis': emphasis
  }" :href="url">
    <span v-if="iconPlacement === 'before'">
      <span v-if="textWordCount > 1" class="rpl-text-link__group"><rpl-icon v-if="iconSymbol" :symbol="iconSymbol" :color="iconColor" :size="iconSize" class="rpl-text-link--before"/>{{ textFirstWord }}</span>
      <span v-if="textWordCount > 1">{{ textWithoutFirstWord }}</span>
      <span v-if="textWordCount <= 1" class="rpl-text-link__group"><rpl-icon v-if="iconSymbol" :symbol="iconSymbol" :color="iconColor" :size="iconSize" class="rpl-text-link--before"/>{{ text }}</span>
    </span>
    <span v-else-if="iconPlacement === 'after'">
      <span v-if="textWordCount > 1">{{ textWithoutLastWord }}</span>
      <span v-if="textWordCount > 1" class="rpl-text-link__group">{{ textLastWord }}<rpl-icon v-if="iconSymbol" :symbol="iconSymbol" :color="iconColor" :size="iconSize" class="rpl-text-link--after" /></span>
      <span v-if="textWordCount <= 1" class="rpl-text-link__group">{{ text }}<rpl-icon v-if="iconSymbol" :symbol="iconSymbol" :color="iconColor" :size="iconSize" class="rpl-text-link--after" /></span>
    </span>
    <span v-else>{{ text }}</span>
  </rpl-link>
</template>

<script>
import RplIcon from '@dpc-sdp/ripple-icon'
import RplLink from './Link.vue'

export default {
  name: 'RplTextLink',
  props: {
    iconSymbol: {default: null, type: String},
    iconColor: {default: 'primary', type: String},
    iconPlacement: {default: 'after', type: String},
    iconSize: {default: 'm', type: String},
    text: {default: null, type: String},
    url: {default: null, type: String},
    underline: {default: false, type: Boolean},
    theme: {default: 'light', type: String},
    size: {default: null, type: String},
    emphasis: {default: false, type: Boolean}
  },
  components: {
    RplIcon,
    RplLink
  },
  computed: {
    textWordCount: function () {
      return this.text.length > 0 ? this.text.match(/[\w\d]+/gi).length : 0
    },
    textWithoutLastWord: function () {
      return this.text.substr(0, this.text.lastIndexOf(' '))
    },
    textLastWord: function () {
      return this.text.substr(this.text.lastIndexOf(' '))
    },
    textWithoutFirstWord: function () {
      return this.text.substr(this.text.indexOf(' '))
    },
    textFirstWord: function () {
      return this.text.substr(0, this.text.indexOf(' '))
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";

  $rpl-text-link-before-margin: auto $rpl-space-2 auto auto !default;
  $rpl-text-link-after-margin: auto auto auto $rpl-space-2 !default;
  $rpl-text-link-light-underline: rem(4px) solid #E8EBEE !default;
  $rpl-text-link-light-underline-hover: rem(4px) solid #E8EBEE !default;
  $rpl-text-link-dark-underline: rem(4px) solid rpl-color('secondary') !default;
  $rpl-text-link-dark-underline-hover: rem(4px) solid rpl-color('white') !default;
  $rpl-text-link-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-text-link-text-color-hover: rpl_color('primary') !default;
  $rpl-text-link-dark-text-color: rpl-color('white') !default;
  $rpl-text-link-dark-text-color-hover: rpl-color('white') !default;
  $rpl-text-link-small-typography: ('xs', 1.7em, 'medium') !default;
  $rpl-text-link-large-typography: ('l', 1.7em, 'medium') !default;
  $rpl-text-link-small-typography-emphasis: ('xs', 1.7em, 'bold') !default;
  $rpl-text-link-large-typography-emphasis: ('l', 1.7em, 'bold') !default;

  .rpl-text-link {
    $root: &;
    text-decoration: none;
    color: $rpl-text-link-text-color;

    &:hover,
    &:focus {
      color: $rpl-text-link-text-color-hover;
    }

    &__group {
      white-space: nowrap;
    }

    &--before {
      margin: $rpl-text-link-before-margin;
    }

    &--after {
      margin: $rpl-text-link-after-margin;
    }

    &--underline {
      border-bottom: $rpl-text-link-light-underline;

      &:hover,
      &:focus {
        border-bottom: $rpl-text-link-light-underline-hover;
        &.rpl-link {
          text-decoration: none;
        }
      }
    }

    &--small {
      @include rpl_typography_ruleset($rpl-text-link-small-typography);
    }

    &--large {
      @include rpl_typography_ruleset($rpl-text-link-large-typography);
    }

    &--emphasis {
      &#{$root}--small {
        @include rpl_typography_ruleset($rpl-text-link-small-typography-emphasis);
      }

      &#{$root}--large {
        @include rpl_typography_ruleset($rpl-text-link-large-typography-emphasis);
      }
    }

    &--dark {
      color: $rpl-text-link-dark-text-color;

      &:hover,
      &:focus {
        color: $rpl-text-link-dark-text-color-hover;
      }

      &#{$root}--underline {
        border-bottom: $rpl-text-link-dark-underline;

        &:hover,
        &:focus {
          border-bottom: $rpl-text-link-dark-underline-hover;
        }
      }
    }
  }
</style>
