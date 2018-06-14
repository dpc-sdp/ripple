<template>
  <div class="rpl-form-alert" :class="classes">
    <rpl-icon :symbol="icon"></rpl-icon>
    <slot></slot>
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
      classes: []
    }
  },
  created () {
    // TODO: all icons are not right one for now, need to be reworked in theme task.
    switch (this.variant) {
      case 'success':
        this.icon = 'alert_information'
        break

      case 'danger':
        this.icon = 'alert_fire'
        break

      default:
        this.icon = 'alert_transport'
        break
    }

    this.classes = [ 'rpl-form-alert--' + this.variant ]
  }
}
</script>
