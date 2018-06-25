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
  data () {
    return {
      icon: null,
      classes: [],
      color: null
    }
  },
  created () {
    switch (this.variant) {
      case 'success':
        this.icon = 'success'
        this.color = 'success'
        break

      case 'danger':
        this.icon = 'alert_information'
        this.color = 'danger'
        break

      default:
        this.icon = 'alert_information'
        break
    }

    this.classes = [ 'rpl-form-alert--' + this.variant ]
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/style";

$rpl-form-alert-text-ruleset: ('s', 1em, 'bold') !default;
$rpl-form-alert-border-color-success: rpl-color('success');
$rpl-form-alert-border-color-danger: rpl-color('danger');
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
