<template>
  <div :class="colClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    'cols': String,
    'colsBp': Object,
    'pull': Object,
    'push': Object
  },
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
