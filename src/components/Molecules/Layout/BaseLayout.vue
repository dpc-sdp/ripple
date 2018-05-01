<template>
  <div class="rpl-site-layout">
    <header class="rpl-site-header">
      <slot name="header"></slot>
    </header>
    <slot></slot>
    <footer class="rpl-site-footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
