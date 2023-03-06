<template>
  <div class="docs-card-grid">
    <slot></slot>
  </div>
</template>

<style scoped>
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';
.docs-card-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--rpl-sp-4);

  @media (--rpl-bp-m) {
    grid-template-columns: 1fr 1fr;
    grid-gap: var(--rpl-sp-6);
  }
}
</style>
