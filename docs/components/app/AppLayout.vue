<template>
  <Html lang="en" />
  <Meta property="og:image" content="/cover.jpg" />
  <Meta name="twitter:card" content="summary_large_image" />
  <RplIconSprite />
  <AppNavbar>
    <template #menuContents>
      <slot name="menuContents" />
    </template>
  </AppNavbar>
  <slot name="aboveBody" />
  <div
    :class="{
      'docs-layout-content': true,
      'docs-layout-content--grey': background === 'alt'
    }"
  >
    <div class="rpl-container">
      <slot />
    </div>
  </div>
  <slot name="belowBody" />
  <AppFooter />
</template>

<script lang="ts" setup>
interface Props {
  background?: 'default' | 'alt'
}

withDefaults(defineProps<Props>(), {
  background: 'default'
})
</script>

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
}

.docs-layout-content--grey {
  background: var(--rpl-clr-neutral-100);
}
</style>
