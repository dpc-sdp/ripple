<template>
  <span v-if="text && symbol && placement === 'before'">
    <span v-if="textWordCount > 1" class="rpl-text-icon__group"><rpl-icon v-bind="iconProps" />{{ textFirstWord }} </span>
    <span v-if="textWordCount > 1">{{ textWithoutFirstWord }}</span>
    <span v-else class="rpl-text-icon__group"><rpl-icon v-bind="iconProps" />{{ text }}</span>
  </span>
  <span v-else-if="text && symbol && placement === 'after'">
    <span v-if="textWordCount > 1">{{ textWithoutLastWord }}</span>
    <span v-if="textWordCount > 1" class="rpl-text-icon__group"> {{ textLastWord }}<rpl-icon v-bind="iconProps" /></span>
    <span v-else class="rpl-text-icon__group">{{ text }}<rpl-icon v-bind="iconProps" /></span>
  </span>
  <span v-else-if="text">{{ text }}</span>
</template>

<script>
import RplIcon from './Icon.vue'

/**
 * Text Icon allows user to display text with an icon that can be placed before or after.
 * This is commonly used in an anchor <a> tag where the icon helps represents the action of the text.
 */
export default {
  name: 'RplTextIcon',
  props: {
    symbol: { default: null, type: String },
    color: { default: 'primary', type: String },
    placement: { default: 'after', type: String },
    size: { default: 'm', type: String },
    text: { default: null, type: String }
  },
  components: {
    RplIcon
  },
  computed: {
    trimmedText: function () {
      return this.text.trim()
    },
    textArray () {
      return this.trimmedText.split(' ')
    },
    textWordCount: function () {
      return this.textArray.length
    },
    textWithoutLastWord: function () {
      const textWithoutLastWord = this.textArray.slice(0, this.textWordCount - 1)

      return textWithoutLastWord.join(' ')
    },
    textLastWord: function () {
      return this.textArray[this.textWordCount - 1]
    },
    textWithoutFirstWord: function () {
      const textWithoutFirstWord = this.textArray.slice(1)
      return textWithoutFirstWord.join(' ')
    },
    textFirstWord: function () {
      return this.textArray[0]
    },
    iconProps: function () {
      return {
        symbol: this.symbol,
        color: this.color,
        size: this.size,
        class: `rpl-text-icon--${this.placement}`
      }
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";

  $rpl-text-link-before-margin: auto $rpl-space auto auto !default;
  $rpl-text-link-after-margin: auto auto auto $rpl-space !default;

  .rpl-text-icon {
    &__group {
      white-space: normal;
    }

    &--before {
      margin: $rpl-text-link-before-margin;
    }

    &--after {
      margin: $rpl-text-link-after-margin;
    }
  }
</style>
