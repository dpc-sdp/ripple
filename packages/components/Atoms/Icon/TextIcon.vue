<template>
  <span v-if="text && symbol && placement === 'before'">
    <span v-if="textWordCount > 1" class="rpl-text-icon__group"><rpl-icon :symbol="symbol" :color="color" :size="size" class="rpl-text-icon--before"/>{{ textFirstWord }}</span>
    <span v-if="textWordCount > 1">{{ textWithoutFirstWord }}</span>
    <span v-if="textWordCount <= 1" class="rpl-text-icon__group"><rpl-icon :symbol="symbol" :color="color" :size="size" class="rpl-text-icon--before"/>{{ text }}</span>
  </span>
  <span v-else-if="text && symbol && placement === 'after'">
    <span v-if="textWordCount > 1">{{ textWithoutLastWord }}</span>
    <span v-if="textWordCount > 1" class="rpl-text-icon__group">{{ textLastWord }}<rpl-icon :symbol="symbol" :color="color" :size="size" class="rpl-text-icon--after" /></span>
    <span v-if="textWordCount <= 1" class="rpl-text-icon__group">{{ text }}<rpl-icon :symbol="symbol" :color="color" :size="size" class="rpl-text-icon--after" /></span>
  </span>
  <span v-else-if="text">{{ text }}</span>
</template>

<script>
import RplIcon from './Icon.vue'

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
    textWordCount: function () {
      return (this.text.match(/[.*]|[^ \r\n]+/gi) || []).length
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
  @import "~@dpc-sdp/ripple-global/scss/settings";

  $rpl-text-link-before-margin: auto $rpl-space-2 auto auto !default;
  $rpl-text-link-after-margin: auto auto auto $rpl-space-2 !default;

  .rpl-text-icon {
    &__group {
      white-space: nowrap;
    }

    &--before {
      margin: $rpl-text-link-before-margin;
    }

    &--after {
      margin: $rpl-text-link-after-margin;
    }
  }
</style>
