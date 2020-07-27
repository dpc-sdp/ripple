<template>
  <div class="rpl-call-to-action">
    <div class="rpl-call-to-action__row">
      <div class="rpl-call-to-action__left">
        <img v-if="image" class="rpl-call-to-action__image" :src="image.src" :alt="image.alt" />
      </div>
      <div class="rpl-call-to-action__right">
        <h2 v-if="title" class="rpl-call-to-action__title">{{ title }}</h2>
        <div v-if="summary" class="rpl-call-to-action__summary" v-html="summary"></div>
        <rpl-button v-if="link" :href="link.url" theme="primary">{{ link.text }}</rpl-button>
      </div>
    </div>
  </div>
</template>

<script>
import RplButton from '@dpc-sdp/ripple-button'

export default {
  name: 'RplCallToAction',
  props: {
    title: String,
    summary: String,
    link: Object,
    image: Object
  },
  components: {
    RplButton
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  // TODO: extract these border, background setting out from each component and better put
  // them into a landing page component global setting. So all landing page components style
  // will be more consistent.
  $rpl-call-to-action-border-color: rpl_color('mid_neutral_1') !default;
  $rpl-call-to-action-border: 1px solid $rpl-call-to-action-border-color !default;
  $rpl-call-to-action-border-radius: rem(4px) !default;
  $rpl-call-to-action-bg-color: rpl-color('white') !default;
  $rpl-call-to-action-padding-xs: ($rpl-space * 8) ($rpl-space * 5) !default;
  $rpl-call-to-action-padding-s: ($rpl-space * 18) $rpl-component-padding-s !default;
  $rpl-call-to-action-padding-l: ($rpl-space * 18) $rpl-component-padding-l !default;
  $rpl-call-to-action-max-width: rem(1418px) !default;
  $rpl-call-to-action-title-ruleset: (
    'xs': ('l', 1.2em, 'bold'),
    's': ('xl', 1.2em, 'bold'),
    'm': ('mega', 1.3em, 'bold')
  ) !default;
  $rpl-call-to-action-title-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-call-to-action-title-margin-xs: $rpl-space-3 0 !default;
  $rpl-call-to-action-title-margin-s: 0 !default;
  $rpl-call-to-action-summary-ruleset: (
    'xs': ('xs', 1.4em, 'regular'),
    's': ('s', 1.5em, 'regular')
  ) !default;
  $rpl-call-to-action-summary-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-call-to-action-summary-margin-xs: $rpl-space-3 0 !default;
  $rpl-call-to-action-summary-margin-s: ($rpl-space * 6) 0 !default;

.rpl-content {
  .rpl-call-to-action {
    padding: $rpl-call-to-action-padding-xs;
    background-color: $rpl-call-to-action-bg-color;
    border-radius: $rpl-call-to-action-border-radius;
    border: $rpl-call-to-action-border;

    &__image {
      width: 100%;
    }

    @include rpl_breakpoint('s') {
      padding-left: $rpl-component-padding-s;
      padding-right: $rpl-component-padding-s;
    }
    @include rpl_breakpoint('m') {
      padding-left: $rpl-component-padding-m;
      padding-right: $rpl-component-padding-m;
    }
    @include rpl_breakpoint('l') {
      padding-left: $rpl-component-padding-l;
      padding-right: $rpl-component-padding-l;
    }
    @include rpl_breakpoint('xl') {
      padding-left: $rpl-component-padding-xl;
      padding-right: $rpl-component-padding-xl;
    }

    &__title {
      @include rpl_typography_ruleset($rpl-call-to-action-title-ruleset);
      box-sizing: border-box;
      color: $rpl-call-to-action-title-text-color;
      margin: $rpl-call-to-action-title-margin-xs;
      padding: 0;
      @include rpl_breakpoint('l') {
        margin: $rpl-call-to-action-title-margin-s;
      }
    }

    &__summary {
      @include rpl_typography_ruleset($rpl-call-to-action-summary-ruleset);
      box-sizing: border-box;
      color: $rpl-call-to-action-summary-text-color;
      margin: $rpl-call-to-action-summary-margin-xs;
      padding: 0;
      @include rpl_breakpoint('s') {
        margin: $rpl-call-to-action-summary-margin-s;
      }
    }
    &--with-sidebar {
      max-width: 100%;
    }
    &--without-sidebar {
      .rpl-call-to-action__row {
        max-width: $rpl-call-to-action-max-width;
        margin: auto;
        @include rpl_breakpoint('l') {
          display: flex;
        }
      }
      .rpl-call-to-action__left {
        @include rpl_breakpoint('l') {
          @include rpl_grid_column(4);
        }

        @include rpl_breakpoint('xxxl') {
          @include rpl_grid_column(3);
        }
      }

      .rpl-call-to-action__right {
        @include rpl_breakpoint('l') {
          @include rpl_grid_column(8);
        }

        @include rpl_breakpoint('xxxl') {
          @include rpl_grid_column(9);
        }
      }

      .rpl-call-to-action__image {
        @include rpl_breakpoint('l') {
          width: 100%;
        }
      }

      .rpl-call-to-action__title {
        width: 100%;
      }

      .rpl-call-to-action__summary {
        width: 100%;
      }
    }
  }
}
</style>
