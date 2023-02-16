<template>
  <Html lang="en" />
  <Meta property="og:image" content="/cover.jpg" />
  <Meta name="twitter:card" content="summary_large_image" />
  <RplIconSprite />
  <AppNavbar />
  <slot name="aboveBody" />
  <div class="docs-layout-content">
    <slot />
  </div>
  <RplFooter />
</template>

<style>
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

.rpl-container {
  @media (--rpl-bp-l) {
    padding: 0 var(--rpl-sp-9);
  }
}

.docs-layout-content {
  padding-top: var(--rpl-sp-8);
  padding-bottom: var(--rpl-sp-8);

  @media (--rpl-bp-m) {
    padding-top: var(--rpl-sp-10);
    padding-bottom: var(--rpl-sp-10);
  }

  @media (--rpl-bp-l) {
    padding-top: var(--rpl-sp-12);
    padding-bottom: var(--rpl-sp-12);
  }

  @media (--rpl-bp-xl) {
    padding-top: var(--rpl-sp-13);
    padding-bottom: var(--rpl-sp-13);
  }
}
</style>
