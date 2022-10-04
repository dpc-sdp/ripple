<script lang="ts">
export default { name: 'TideGrantLayout' }
</script>

<template>
  <slot name="aboveContainer"></slot>
  <div class="tide-grant__layout">
    <slot></slot>
  </div>
</template>
