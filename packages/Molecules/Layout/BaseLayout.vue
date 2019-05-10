<template>
  <div class="rpl-site-layout">
    <section><slot name="alert"></slot></section>
    <rpl-skip-link />
    <header class="rpl-site-header-container">
      <slot name="header"></slot>
    </header>
    <slot></slot>
    <rpl-back-to-top />
    <footer class="rpl-site-footer-container">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
import RplSkipLink from './SkipLink.vue'
import RplBackToTop from './BackToTop.vue'

export default {
  components: {
    RplSkipLink,
    RplBackToTop
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/tools";

.rpl-site-layout {
  // Prevent grid margins affecting the horizontal scroll.
  @include rpl_grid_container;
}
</style>
