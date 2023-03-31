<script lang="ts" setup>
interface Props {
  hideMobileSidebar?: boolean
}

withDefaults(defineProps<Props>(), {
  hideMobileSidebar: false
})
</script>

<template>
  <div
    :class="{ 'rpl-grid': true, 'docs-hide-mobile-sidebar': hideMobileSidebar }"
  >
    <aside
      class="docs-sidebar rpl-col-12 rpl-col-3-l"
      :style="{
        '--local-vertical-nav-background': 'transparent',
        '--local-vertical-nav-item-gutter': 'var(--rpl-sp-3)',
        '--local-vertical-nav-hover-bg': 'var(--rpl-clr-neutral-100)'
      }"
    >
      <slot name="aside" />
    </aside>
    <main class="docs-main rpl-col-12 rpl-col-9-l">
      <slot name="pageHeader" />
      <div class="docs-content">
        <slot />
      </div>
    </main>
  </div>
</template>

<style>
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

:root {
  --rpl-content-max-width: none;
}

.docs-main {
  @media (--rpl-bp-l) {
    padding-left: var(--rpl-sp-9);
  }
}

.docs-hide-mobile-sidebar .docs-sidebar {
  display: none;

  @media (--rpl-bp-l) {
    display: block;
  }
}

.docs-content {
  padding-top: var(--rpl-sp-3);
  padding-bottom: var(--rpl-sp-4);

  @media (--rpl-bp-m) {
    padding-top: var(--rpl-sp-4);
  }
}
</style>
