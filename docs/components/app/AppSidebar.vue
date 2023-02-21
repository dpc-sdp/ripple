<template>
  <aside>
    <slot name="above"></slot>
    <nav
      :style="{
        '--local-vertical-nav-background': 'transparent',
        '--local-vertical-nav-item-gutter': 'var(--rpl-sp-3)',
        '--local-vertical-nav-hover-bg': 'var(--rpl-clr-neutral-100)',
        '--local-vertical-nav-active-highlight': 'green'
      }"
    >
      <DocsSidebarNavigation />
    </nav>
    <slot name="below"></slot>
  </aside>
</template>
