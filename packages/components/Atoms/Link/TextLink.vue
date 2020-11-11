<template>
  <rpl-link v-if="url !== null" class="rpl-text-link" :class="{ 'rpl-text-link--underline': underline, 'rpl-text-link--dark': (theme === 'dark') }" :href="url" :innerWrap="innerWrap">
    <rpl-text-label :theme="theme" :size="size" :underline="underline" :emphasis="emphasis">
      <rpl-text-icon :text="textDecoded" :symbol="iconSymbolFinal" :color="iconColor" :placement="iconPlacement" :size="iconSize" />
    </rpl-text-label>
  </rpl-link>
</template>

<script>
import { RplTextIcon } from '@dpc-sdp/ripple-icon'
import RplLink from './Link.vue'
import RplTextLabel from './TextLabel.vue'
import { isExternalUrl, decodeSpecialCharacters } from '@dpc-sdp/ripple-global/utils/helpers.js'

export default {
  name: 'RplTextLink',
  props: {
    iconSymbol: { default: null, type: String },
    iconColor: { default: 'primary', type: String },
    iconPlacement: { default: 'after', type: String },
    iconSize: { default: 'm', type: String },
    text: { default: null, type: String },
    url: { default: null, type: String },
    innerWrap: { default: true, type: Boolean },
    underline: { default: false, type: Boolean },
    theme: { default: 'light', type: String },
    size: { default: null, type: String },
    emphasis: { default: false, type: Boolean }
  },
  components: {
    RplTextIcon,
    RplLink,
    RplTextLabel
  },
  computed: {
    textDecoded: function () {
      // TODO: This is a temporary fix.
      // In Markup component, We can't avoid taking HTML encoded link text(especially for `"`) from CMS and feeding them into the text icon.
      // We may just change all link text to HTML to solve this issue eventally.
      return this.text ? decodeSpecialCharacters(this.text) : null
    },
    iconSymbolFinal () {
      if (isExternalUrl(this.url, this.rplOptions.hostname)) {
        return 'external_link'
      }
      return this.iconSymbol
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-text-link-light-underline-hover: rpl-color('mid_neutral_2') !default;
  $rpl-text-link-dark-underline-hover: rpl-color('white') !default;
  $rpl-text-link-text-color-hover: rpl_color('primary') !default;
  $rpl-text-link-dark-text-color-hover: rpl-color('white') !default;

  .rpl-text-link {
    &--underline {
      &.rpl-link {
        &:hover,
        &:focus {
          text-decoration: none;
        }
      }
    }

    &--dark {
      @include rpl_focus_dark;
    }

    &:hover,
    &:focus {
      color: $rpl-text-link-text-color-hover;

      .rpl-text-label {
        color: inherit;

        &--small {
          &--underline {
            border-bottom-color: $rpl-text-link-light-underline-hover;
          }
        }

        &--large {
          &--underline {
            border-bottom-color: $rpl-text-link-light-underline-hover;
          }
        }

        &--dark {
          &--underline {
            color: $rpl-text-link-dark-text-color-hover;
            border-bottom-color: $rpl-text-link-dark-underline-hover;
          }
        }
      }
    }
  }
</style>
