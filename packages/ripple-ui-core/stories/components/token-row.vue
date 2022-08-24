<script>
export default {
  props: {
    lined: Boolean
  },
  computed: {
    classes() {
      const name = 'sb-token-table-row'
      return {
        [`${name}`]: true,
        [`${name}--lined`]: this.lined
      }
    }
  }
}
</script>
<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<style>
.sb-token-table-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: var(--rpl-sp-4) var(--rpl-sp-2);
  &--lined {
    border-bottom: 1px solid #1a1a1a;
  }
  &--tight {
    padding-top: var(--rpl-sp-2);
    padding-bottom: var(--rpl-sp-2);
  }
}
</style>
