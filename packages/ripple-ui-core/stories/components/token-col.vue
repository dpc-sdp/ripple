<script>
export default {
  props: {
    center: Boolean,
    collapse: Boolean,
    expand: Boolean,
    width: {
      type: String,
      required: true
    }
  }
}
</script>
<template>
  <div
    :style="{ minWidth: width }"
    class="sb-token-table-col"
    :class="{
      'sb-token-table-col--center': center,
      'sb-token-table-col--collapse': collapse,
      'sb-token-table-col--expand': expand
    }"
  >
    <slot></slot>
  </div>
</template>

<style>
.sb-token-table-col {
  font-size: 1.4em;
  flex: 1;
  padding: var(--rpl-sp-2);
  text-align: left;
  align-self: center;
  &--padded {
    padding: 0 var(--rpl-sp-2);
  }
  &--collapse {
    flex: 0;
  }
  &--expand {
    flex: 2;
  }
  &--center {
    text-align: center;
  }
}
</style>
