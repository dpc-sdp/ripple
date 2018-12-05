<template>
  <button
    type="button"
    v-bind:class="{'rpl-close-button': true, 'small': size === 'small', 'light': color === 'light'}"
    @click="handleClick()"
  >
    <span v-if="label" class="close-btn__label">{{ label }}</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="17.14" height="17.14" viewBox="0 0 17.14 17.14"><path class="st0" d="M8.57 6.45L2.56.44a1.49 1.49 0 0 0-2.12 0 1.49 1.49 0 0 0 0 2.12l6.01 6.01-6.01 6.01a1.49 1.49 0 0 0 0 2.12c.59.59 1.54.59 2.12 0l6.01-6.01 6.01 6.01c.59.59 1.54.59 2.12 0 .59-.59.59-1.54 0-2.12l-6.01-6.01 6.01-6.01c.59-.59.59-1.54 0-2.12a1.49 1.49 0 0 0-2.12 0L8.57 6.45z"/></svg>
  </button>

</template>

<script>
export default {
  name: 'RplCloseButton',
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

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";

  .rpl-close-button {
    color: grey;
    cursor: pointer;
    padding: 0;
    border: 0;
    border-radius: 5px;
    background: transparent;
    line-height: 1;
    cursor: auto;

    &:hover {
      color: grey;
    }

    &.large {
      width: 30px;
      height: 30px;
    }

    &.small {
      width: 20px;
      height: 20px;
    }

    &.light {
      color: white;
    }

    &__label {
      font-size: rem-calc(14);
      font-weight: 500;
      margin-right: 0.5rem;
      display: inline-block;
      position: relative;
      top: -3px;
    }
  }

</style>
