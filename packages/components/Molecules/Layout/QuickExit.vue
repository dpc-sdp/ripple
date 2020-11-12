<template>
  <div class="rpl-quick-exit" :class="{ 'rpl-quick-exit--sticky': stickyActive }" :data-text="text">
    <a
      class="rpl-quick-exit__button"
      ref="button"
      :href="escapeURL"
      :class="{
        'rpl-quick-exit__button--stickable': isSticky,
        'rpl-quick-exit__button--sticky': stickyActive,
        'rpl-quick-exit__button--header-visible': (stickyActive && headerVisible),
      }"
      @click="quickExit"
    >{{ text }}</a>
  </div>
</template>

<script>
import { isClient } from '@dpc-sdp/ripple-global/utils/helpers.js'

export default {
  name: 'RplQuickExit',
  props: {
    text: { type: String, default: 'Quick exit' },
    isSticky: { type: Boolean, default: true },
    menuOffsetSelector: { type: String, default: null }
  },
  data () {
    return {
      escapeURL: null,
      menuStickyActive: false,
      stickyActive: false,
      headerVisible: true,
      offsetTop: 0,
      lastPageScrollTop: 0,
      menuOffsetElement: null
    }
  },
  methods: {
    quickExit () {
      const newTab = window.open(this.escapeURL, '_blank')
      if (newTab) {
        newTab.focus()
      }
    },
    scroll () {
      const pageScrollTop = window.pageYOffset || document.documentElement.scrollTop
      const isScrollingUp = (pageScrollTop <= this.lastPageScrollTop)
      const elStyle = getComputedStyle(this.$refs.button)
      const elTop = parseInt(elStyle.top) || 0
      const elMargin = isScrollingUp ? parseInt(elStyle.marginTop) : 0
      const elStickPoint = this.$el.offsetTop - elMargin - elTop
      const menuStickPoint = this.menuOffsetElement.offsetTop
      const menuStickyActive = (pageScrollTop > menuStickPoint)

      this.stickyActive = (pageScrollTop > elStickPoint) || (isScrollingUp && menuStickyActive)
      this.headerVisible = isScrollingUp || !this.stickyActive
      this.lastPageScrollTop = pageScrollTop <= 0 ? 0 : pageScrollTop
    }
  },
  created () {
    this.escapeURL = this.rplOptions.quickexiturl
  },
  mounted () {
    if (isClient() && this.isSticky) {
      this.menuOffsetElement = document.querySelector(this.menuOffsetSelector)
      window.addEventListener('scroll', this.scroll)
    }
  },
  beforeDestroy () {
    if (isClient() && this.isSticky) {
      window.removeEventListener('scroll', this.scroll)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  @import "~@dpc-sdp/ripple-global/scss/components/button";

  $rpl-quick-exit-menu-header-height-xs: rem(48px) !default;
  $rpl-quick-exit-menu-header-height-m: rem(62px) !default;
  $rpl-quick-exit-menu-button-spacing: $rpl-space !default;

  .rpl-quick-exit {
    padding-left: $rpl-space;
    margin-left: auto;
    z-index: $rpl-zindex-tooltip;

    @include rpl_print_hidden;

    &--sticky {
      &::before {
        // A phantom button to keep the space available.
        content: attr(data-text);
        @include rpl_narrow_button;
        pointer-events: none;
        opacity: 0;
      }
    }

    &__button {
      @include rpl_narrow_button;
      @include rpl_narrow_button_danger;

      &--stickable {
        z-index: $rpl-zindex-popover;
        top: $rpl-header-horizontal-padding-xs;
        right: $rpl-header-horizontal-padding-xs;

        @include rpl_breakpoint('s') {
          top: $rpl-header-horizontal-padding-s;
          right: $rpl-header-horizontal-padding-s;
        }
      }

      &--sticky {
        position: fixed;
        transition: margin ease-in .3s;
        left: auto;
      }

      &--header-visible {
        transition: margin ease-out .2s;
        margin-top: $rpl-quick-exit-menu-header-height-xs + $rpl-quick-exit-menu-button-spacing;

        @include rpl_breakpoint('m') {
          margin-top: $rpl-quick-exit-menu-header-height-m + $rpl-quick-exit-menu-button-spacing;
        }
      }

      &:hover,
      &:focus {
        text-decoration: none;
        background-color: $rpl-button-danger-hover-background-color;
      }
    }
  }
</style>
