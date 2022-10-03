<script lang="ts">
export default { name: 'RplPageAction' }
</script>

<template>
  <div class="rpl-page-action">
    <div v-if="$slots.upper" class="rpl-page-action__upper">
      <slot name="upper" />
    </div>
    <slot></slot>
  </div>
</template>

<style src="./page-action.css" />
