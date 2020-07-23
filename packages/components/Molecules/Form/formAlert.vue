<template>
  <div class="rpl-form-alert" :class="classes">
    <rpl-icon :symbol="icon" :color="color" class="rpl-form-alert__icon"></rpl-icon>
    <div class="rpl-form-alert__message">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import RplIcon from '@dpc-sdp/ripple-icon'

export default {
  name: 'RplFormAlert',
  components: {
    RplIcon
  },
  props: {
    variant: String
  },
  computed: {
    icon () {
      return this.getValues().icon
    },
    color () {
      return this.getValues().color
    },
    classes () {
      const suffix = this.getValues().classSuffix
      return suffix ? 'rpl-form-alert--' + this.getValues().classSuffix : null
    }
  },
  methods: {
    getValues () {
      let icon, color, classSuffix
      switch (this.variant) {
        case 'success':
          icon = 'success'
          color = 'success'
          classSuffix = 'success'
          break

        case 'error':
        case 'danger':
          icon = 'alert_information'
          color = 'danger'
          classSuffix = 'danger'
          break

        default:
          icon = 'alert_information'
          break
      }
      return {
        icon,
        color,
        classSuffix
      }
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

$rpl-form-alert-text-ruleset: ('s', 1em, 'bold') !default;
$rpl-form-alert-border-color-success: rpl-color('success') !default;
$rpl-form-alert-border-color-danger: rpl-color('danger') !default;
$rpl-form-alert-border-radius: rem(4px) !default;

.rpl-form-alert {
  @include rpl_typography_ruleset($rpl-form-alert-text-ruleset);
  border-radius: $rpl-form-alert-border-radius;
  box-sizing: border-box;
  padding: $rpl-space-4;
  margin-bottom: $rpl-space-4;

  @include rpl_breakpoint(m) {
    margin-bottom: $rpl-space * 7;
  }

  &--success {
    color: rpl-color('success');
    background-color: $rpl-success-bg-color;
    border: 1px solid $rpl-form-alert-border-color-success;
  }

  &--danger {
    color: rpl-color('danger');
    background-color: $rpl-danger-bg-color;
    border: 1px solid $rpl-form-alert-border-color-danger;
  }

  &__icon,
  &__message {
    display: inline-block;
    vertical-align: middle;
  }

  &__icon {
    width: rem(24px);
    margin-right: rem(4px);
  }

  &__message {
    width: calc(100% - #{rem(28px)});
  }

}
</style>
