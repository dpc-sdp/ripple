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
  margin: var(--rpl-sp-3) 0;

  @media (--rpl-bp-m) {
    grid-template-columns: 1fr 1fr;
    grid-gap: var(--rpl-sp-6);
  }

  @media (--rpl-bp-l) {
    margin: var(--rpl-sp-4) 0;
  }
}
</style>
