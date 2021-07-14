<template>
  <div class="rpl-row" :class="{'rpl-row--gutter': rowGutter}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    rowGutter: Boolean
  }
}
</script>
