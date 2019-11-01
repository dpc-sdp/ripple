<template>
  <div :class="[colClass, childErrorClass]" >
    <slot></slot>
    <rpl-dev-error v-if="gotChildError" :errors="childErrors" />
  </div>
</template>

<script>
import catchChildError from '@dpc-sdp/ripple-global/mixins/catch-child-error'
import { RplDevError } from '@dpc-sdp/ripple-global'

export default {
  props: {
    'cols': {
      type: String,
      default: 'full'
    },
    'colsBp': Object,
    'pull': Object,
    'push': Object
  },
  components: {
    RplDevError
  },
  mixins: [catchChildError],
  computed: {
    colClass: function () {
      let colClass = 'rpl-col'
      colClass = `${colClass} rpl-col--${this.cols}`
      for (let item in this.colsBp) {
        colClass = `${colClass} rpl-col--${this.colsBp[item]}-${item}`
      }
      for (let item in this.pull) {
        colClass = `${colClass} rpl-col--pull-${this.pull[item]}-${item}`
      }
      for (let item in this.push) {
        colClass = `${colClass} rpl-col--push-${this.push[item]}-${item}`
      }
      return colClass
    }
  }
}
</script>

<style lang="scss">
  // Make the col invisibale if the child component throw a error.
  .rpl-col {
    &.rpl-child-component-error {
      display: none;
    }
  }

  // Show col has error child in Ripple dev mode
  .ripple-dev-mode {
    .rpl-col {
      &.rpl-child-component-error {
        display: block;
      }
    }
  }
</style>
