<template>
  <div class="rpl-alert-base" :class="baseBackgroundColor" v-if="visible">
    <rpl-icon class="rpl-alert-base__icon" :symbol="iconSymbol" :color="iconColor" />
    <div class="rpl-alert-base__content" :class="baseTextColor">
      <slot></slot>
    </div>
    <button @click="close()" class="rpl-alert-base__close">
      <rpl-icon symbol="close" :color="closeIconColor" /><span>{{ closeText }}</span>
    </button>
  </div>
</template>

<script>
import RplIcon from '@dpc-sdp/ripple-icon'

export default {
  name: 'RplAlertBase',
  components: {
    RplIcon
  },
  props: {
    backgroundColor: { type: String, default: 'dark_neutral' },
    textColor: { type: String, default: 'white' },
    iconColor: { type: String, default: 'white' },
    iconSymbol: { type: String, default: 'alert_information' },
    closeText: { type: String, default: 'Close' },
    closeIconColor: { type: String, default: 'white' }
  },
  data () {
    return {
      visible: true
    }
  },
  methods: {
    close () {
      this.visible = false
      this.$emit('rplAlertClose')
    }
  },
  computed: {
    baseBackgroundColor () {
      return this.backgroundColor ? `rpl-alert-base--color-${this.backgroundColor}` : null
    },
    baseTextColor () {
      return this.textColor ? `rpl-alert-base__content--color-${this.textColor}` : null
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/style";

$rpl-alert-base-background-color: rpl-color('dark_neutral') !default;
$rpl-alert-base-padding: ($rpl-space * 5) !default;
$rpl-alert-base-ruleset: (
  'xs': ('xs', 1em, 'bold'),
  's': ('s', 1em, 'bold')
) !default;
$rpl-alert-base-text-color: rpl-color('white') !default;
$rpl-alert-base-icom-margin: 0 $rpl-space-4 0 0 !default;

.rpl-alert-base {
  background-color: $rpl-alert-base-background-color;
  padding: $rpl-alert-base-padding;
  display: flex;
  align-items: center;

  @each $color-name, $color-value in $rpl-colors {
    &--color-#{str-replace($color-name, ' ', '-')} {
      background-color: rpl-color($color-name);
    }
  }

  &__icon {
    margin: $rpl-alert-base-icom-margin;
  }

  &__content {
    @include rpl_typography_ruleset($rpl-alert-base-ruleset);
    color: $rpl-alert-base-text-color;
    @each $color-name, $color-value in $rpl-colors {
      &--color-#{str-replace($color-name, ' ', '-')} {
        color: rpl-color($color-name);
      }
    }
  }

  &__close {
    background: transparent;
    border: 0;
    margin-left: auto;
    cursor: pointer;

    svg {
      display: block;
    }

    span {
      @include rpl_visually_hidden;
    }
  }
}
</style>
