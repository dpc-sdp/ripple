<script setup lang="ts">
const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: null
  },
  filename: {
    type: String,
    default: null
  },
  highlights: {
    type: Array as () => number[],
    default: () => []
  },
  meta: {
    type: String,
    default: null
  },
  class: {
    type: String,
    default: null
  }
})
</script>

<template>
  <div class="docs-code-block">
    <pre :class="props.class"><slot /></pre>
  </div>
</template>

<style scoped>
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

.docs-code-block {
  padding: var(--rpl-sp-5);
  background: var(--rpl-clr-neutral-100);
  border: var(--rpl-border-1) solid var(--rpl-clr-neutral-300);
  white-space: pre;
  overflow-x: auto;
  display: block;
  margin: var(--rpl-sp-3) 0;

  @media (--rpl-bp-l) {
    margin: var(--rpl-sp-4) 0;
  }
}
</style>

<style>
pre code .line {
  display: block;
  min-height: 1rem;
}
</style>
