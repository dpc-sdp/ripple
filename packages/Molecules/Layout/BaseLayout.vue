<template>
  <div class="rpl-site-layout">
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
