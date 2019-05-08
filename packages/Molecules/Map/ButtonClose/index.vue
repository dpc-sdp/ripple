<template>
  <button
    type="button"
    v-bind:class="{'rpl-map-close-btn': true, 'rpl-map-close-btn--small': size === 'small', 'rpl-map-close-btn--light': color === 'light'}"
    @click="handleClick()"
  >
    <span v-if="label" class="rpl-map-close-btn__label">{{ label }}</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="17.14" height="17.14" viewBox="0 0 17.14 17.14"><path class="st0" d="M8.57 6.45L2.56.44a1.49 1.49 0 0 0-2.12 0 1.49 1.49 0 0 0 0 2.12l6.01 6.01-6.01 6.01a1.49 1.49 0 0 0 0 2.12c.59.59 1.54.59 2.12 0l6.01-6.01 6.01 6.01c.59.59 1.54.59 2.12 0 .59-.59.59-1.54 0-2.12l-6.01-6.01 6.01-6.01c.59-.59.59-1.54 0-2.12a1.49 1.49 0 0 0-2.12 0L8.57 6.45z"/></svg>
  </button>
</template>

<script>
export default {
  props: {
    size: {
      // one of 'large|small'
      type: String,
      default: 'large'
    },
    label: {
      // string or null
      type: String,
      default: null
    },
    color: {
      // one of 'dark|light'
      type: String,
      default: 'dark'
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  $rpl-map-close-btn-color: rpl-color('black') !default;
  $rpl-map-close-btn-color-revse: rpl-color('white') !default;
  $rpl-map-close-btn-color-hover: rpl-color('dark_neutral') !default;

  .rpl-map-close-btn {
    fill: $rpl-map-close-btn-color;
    cursor: pointer;
    padding: 0;
    border: 0;
    background: transparent;
    line-height: 1;

    &:hover {
      fill: $rpl-map-close-btn-color-hover;
    }
    &--large {
      // This is not in used at this moment.
      width: rem(30px);
      height: rem(30px);
    }
    &--small {
      width: rem(20px);
      height: rem(20px);
    }
    &--light {
      // This is not in used at this moment.
      fill: $rpl-map-close-btn-color-revse;
    }
    &__label {
      // This is not in used at this moment, design may need to be reviewed.
      font-size: rpl-font-size('xs');
      line-height: 1.2rem;
    }
  }
</style>
