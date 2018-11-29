<template>
  <div class="rpl-quick-exit">
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
export default {
  name: 'RplQuickExit',
  props: {
    text: { type: String, default: 'Quick exit' },
    isSticky: { type: Boolean, default: true },
    escapeURL: { type: String, default: 'https://www.google.com' },
    menuOffsetElement: HTMLDivElement
  },
  data () {
    return {
      menuStickyActive: false,
      stickyActive: false,
      headerVisible: true,
      offsetTop: 0,
      lastPageScrollTop: 0
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
  mounted () {
    if (process.browser && this.isSticky) {
      window.addEventListener('scroll', this.scroll)
    }
  },
  beforeDestroy () {
    if (process.browser && this.isSticky) {
      window.removeEventListener('scroll', this.scroll)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@dpc-sdp/ripple-global/style";

  $rpl-quick-exit-text-color: rpl-color('white') !default;
  $rpl-quick-exit-background-color: rpl-color('danger') !default;

  .rpl-quick-exit {
    height: rem(48px);

    @include rpl_breakpoint('m') {
      height: rem(50px);
    }

    &__button {
      @include rpl_button;
      width: auto;
      white-space: nowrap;
      border-radius: $rpl-button-border-radius;
      background-color: $rpl-quick-exit-background-color;
      color: $rpl-quick-exit-text-color;
      padding: $rpl-space-4 ($rpl-space * 4);

      @include rpl_breakpoint('m') {
        padding: $rpl-button-padding;
      }

      &:active {
        background-image: none;
        background-color: $rpl-quick-exit-background-color;
        color: $rpl-quick-exit-text-color;
      }

      &--stickable {
        z-index: $rpl-zindex-header;
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
        margin-top: 48px + 4px;

        @include rpl_breakpoint('s') {
          margin-top: 62px + 4px;
        }
      }
    }
  }
</style>
