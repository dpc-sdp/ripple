<template>
  <rpl-link
    v-if="href"
    :href="href"
    class="rpl-button"
    :class="{
      'rpl-button--primary': (theme === 'primary'),
      'rpl-button--secondary': (theme === 'secondary'),
      'rpl-button--disabled': disabled
    }"
  >
    <slot></slot>
  </rpl-link>
  <button
    v-else
    class="rpl-button"
    :disabled="disabled"
    :class="{
      'rpl-button--primary': (theme === 'primary'),
      'rpl-button--secondary': (theme === 'secondary'),
      'rpl-button--disabled': disabled
    }"
  >
    <slot></slot>
  </button>
</template>

<script>
import RplLink from '@dpc-sdp/ripple-link'

export default {
  name: 'RplButton',
  props: {
    href: String,
    theme: String,
    disabled: Boolean
  },
  components: {
    RplLink
  },
  data: function () {
    return {}
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  @import "~@dpc-sdp/ripple-global/scss/components/button";

  .rpl-button {
    @include rpl_button;

    &--primary {
      @include rpl_button_primary;
    }

    &--secondary {
      @include rpl_button_secondary;
    }

    &--disabled {
      @include rpl_button_disabled;
    }

    &--primary,
    &--secondary {
      &.rpl-link {
        &:hover,
        &:focus {
          text-decoration: none;
        }
      }
    }
  }
</style>
