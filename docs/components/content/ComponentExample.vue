<template>
  <div class="docs-component-example flex content-center rounded-md">
    <div
      class="docs-component-example__inner m-auto p-4 space-x-4"
      :class="innerClasses"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  fullWidth: {
    type: Boolean,
    default: false
  }
})
const innerClasses = props.fullWidth
  ? ['block', 'w-full']
  : ['flex', 'flex-row']
</script>

<style>
.docs-component-example {
  background: repeating-conic-gradient(#eee 0% 25%, transparent 0% 50%) 50% /
    20px 20px;
  font-family: var(--rpl-type-font-family) !important;
}
</style>
