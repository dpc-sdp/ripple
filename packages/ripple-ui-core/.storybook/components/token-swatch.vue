<script>
export default {
  props: {
    size: {
      type: Number,
      default: 4
    },
    color: {
      type: String,
      default: 'grey'
    }
  }
}
</script>
<template>
  <div
    class="sb-token-swatch"
    :style="`width: ${size}px; height: ${size}px; background-color: ${color};`"
  >
    <slot v-if="size > 12"></slot>
  </div>
</template>
<style>
.sb-token-swatch {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
