<template>
  <div
    class="p-12 border-t-4 docs-usage rounded"
    :class="use ? 'docs-usage--use' : 'docs-usage--dontuse'"
  >
    <h4 class="rpl-type-h4 rpl-type-weight-bold relative">
      <Icon
        class="-ml-8 mt-1 absolute"
        :name="use ? 'fa6-solid:circle-check' : 'fa6-solid:circle-xmark'"
      ></Icon>
      <slot name="title">
        <template v-if="use">Do</template>
        <template v-if="!use">Don't</template>
      </slot>
    </h4>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  use: Boolean
}>()
</script>

<style scoped>
.docs-usage--use {
  border-color: var(--rpl-clr-success);
  background-color: #dff3f4;
  svg {
    color: var(--rpl-clr-success);
  }
}
.docs-usage--dontuse {
  border-color: var(--rpl-clr-error);
  background-color: #fdf1f4;
  svg {
    color: var(--rpl-clr-error);
  }
}
</style>
