<template>
  <div v-if="expected || show" class="rpl-back-to-top">
    <div
      class="rpl-back-to-top__inner"
      :class="{ 'rpl-back-to-top__inner--sticky': sticky }"
    >
      <transition name="rpl-back-to-top__fade">
        <a v-if="show" class="rpl-back-to-top__button" href="#rpl-skip-link">
          <span class="rpl-back-to-top__text">Back to top</span>
          <rpl-icon symbol="arrow_up_primary" color="primary" />
        </a>
      </transition>
    </div>
  </div>
</template>

<script>
import RplIcon from '@dpc-sdp/ripple-icon'

export default {
  name: 'RplBackToTop',
  components: {
    RplIcon
  },
  data () {
    return {
      show: false,
      sticky: true,
      expected: false,
      stickyPos: 1200
    }
  },
  methods: {
    setScrollVisibility () {
      let scrollY = window.scrollY || window.pageYOffset

      // Enable / Disable sticky on button.
      if (scrollY > (this.$el.offsetTop + this.$el.offsetHeight - window.innerHeight)) {
        if (this.sticky) {
          this.sticky = false
        }
      } else if (!this.sticky) {
        this.sticky = true
      }

      // Show / Hide button.
      if (scrollY > this.stickyPos) {
        if (!this.show) {
          this.show = true
        }
      } else if (this.show) {
        this.show = false
      }
    },
    resize () {
      // Don't render component if scroll is not expected to exceed threshold.
      this.expected = ((document.body.offsetHeight - window.innerHeight) > this.stickyPos)
      this.setScrollVisibility()
    }
  },
  mounted () {
    if (process.browser) {
      window.addEventListener('scroll', this.setScrollVisibility)
      window.addEventListener('resize', this.resize)
      this.resize()
    }
  },
  destroyed () {
    if (process.browser) {
      window.removeEventListener('scroll', this.setScrollVisibility)
      window.removeEventListener('resize', this.resize)
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

$rpl-back-to-top-bottom-offset: $rpl-space-3 !default;
$rpl-back-to-top-bottom-height: rem(48px) + $rpl-back-to-top-bottom-offset !default;
$rpl-back-to-top-button-ruleset: ('xs', 1em, 'semibold') !default;
$rpl-back-to-top-button-text-color: rpl_color('extra_dark_neutral') !default;
$rpl-back-to-top-button-text-hover: rpl_color('primary') !default;
$rpl-back-to-top-button-background: rpl_color('white') !default;
$rpl-back-to-top-button-border: 1px solid #cdd3d7 !default;
$rpl-back-to-top-button-shadow: 0 rem(4px) rem(4px) 0 rgba(0, 0, 0, 0.08) !default;
$rpl-back-to-top-button-radius: rem(4px) !default;
$rpl-back-to-top-button-padding: $rpl-space-4 !default;
$rpl-back-to-top-button-padding-l: $rpl-space-4 ($rpl-space * 5) !default;
$rpl-back-to-top-icon-margin: 0 0 0 $rpl-space !default;

.rpl-back-to-top {
  height: $rpl-back-to-top-bottom-height;

  &__inner {
    @include rpl_mobile_padding;
    @include rpl_site_constrain;
    text-align: right;
    padding-bottom: $rpl-back-to-top-bottom-offset;

    &--sticky {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }

  &__button {
    @include rpl_typography_ruleset($rpl-back-to-top-button-ruleset);
    color: $rpl-back-to-top-button-text-color;
    background: $rpl-back-to-top-button-background;
    border: $rpl-back-to-top-button-border;
    box-shadow: $rpl-back-to-top-button-shadow;
    border-radius: $rpl-back-to-top-button-radius;
    text-decoration: none;
    margin-left: auto;
    margin-right: 0;
    display: inline-block;
    padding: $rpl-back-to-top-button-padding;

    @include rpl_breakpoint('l') {
      padding: $rpl-back-to-top-button-padding-l;
    }

    &:hover,
    &:focus {
      color: $rpl-back-to-top-button-text-hover;
    }
  }

  &__text {
    @include rpl_breakpoint_down('l') {
      @include rpl_visually_hidden;
    }
  }

  .rpl-icon {
    vertical-align: middle;

    @include rpl_breakpoint('l') {
      margin: $rpl-back-to-top-icon-margin;
    }
  }
}
</style>
