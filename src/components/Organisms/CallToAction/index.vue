<template>
  <div class="rpl-call-to-action">
    <div class="rpl-call-to-action__row">
      <div class="rpl-call-to-action__left">
        <img v-if="image" class="rpl-call-to-action__image" :src="image.src" :alt="image.alt" />
      </div>
      <div class="rpl-call-to-action__right">
        <h2 v-if="title" class="rpl-call-to-action__title">{{ title }}</h2>
        <p v-if="summary" class="rpl-call-to-action__summary">{{ summary }}</p>
        <rpl-button v-if="link" :href="link.url" theme="primary">{{ link.text }}</rpl-button>
      </div>
    </div>
  </div>
</template>

<script>
import RplButton from '@dpc-sdp/ripple-button'

export default {
  name: 'RplRelatedLinks',
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
  @import "~@dpc-sdp/ripple-global/style";

  $rpl-call-to-action-padding-xs: ($rpl-space * 8) 0 !default;
  $rpl-call-to-action-padding-s: ($rpl-space * 18) $rpl-component-padding-s !default;
  $rpl-call-to-action-padding-l: ($rpl-space * 18) 0 !default;
  $rpl-call-to-action-max-width: rem(1418px) !default;
  $rpl-call-to-action-title-ruleset: (
    'xs': ('l', 1.2em, 'bold'),
    's': ('xl', 1.2em, 'bold'),
    'm': ('mega', 1.3em, 'bold')
  ) !default;
  $rpl-call-to-action-title-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-call-to-action-title-margin-xs: $rpl-space-3 0 !default;
  $rpl-call-to-action-title-margin-s: 0 !default;
  $rpl-call-to-action-title-padding-xs: 0 $rpl-component-padding-xs !default;
  $rpl-call-to-action-summary-ruleset: (
    'xs': ('xs', 1.4em, 'regular'),
    's': ('s', 1.5em, 'regular')
  ) !default;
  $rpl-call-to-action-summary-text-color: mix(rpl_color('extra_dark_neutral'), rpl_color('white'), 93%) !default;
  $rpl-call-to-action-summary-margin-xs: $rpl-space-3 0 !default;
  $rpl-call-to-action-summary-margin-s: ($rpl-space * 6) 0 !default;
  $rpl-call-to-action-summary-padding-xs: 0 $rpl-component-padding-xs !default;

  .rpl-call-to-action {
    padding: $rpl-call-to-action-padding-xs;
    @include rpl_breakpoint('s') {
      padding: $rpl-call-to-action-padding-s;
    }
    @include rpl_breakpoint('l') {
      padding: $rpl-call-to-action-padding-l;
    }

    .rpl-call-to-action__row {
      max-width: $rpl-call-to-action-max-width;
      margin: auto;
      @include rpl_breakpoint('l') {
        display: flex;
      }
    }

    &__left {
      @include rpl_breakpoint('l') {
        @include rpl_grid_column(4);
      }

      @include rpl_breakpoint('xxxl') {
        @include rpl_grid_column(3);
      }
    }

    &__right {
      @include rpl_breakpoint('l') {
        @include rpl_grid_column(8);
        display: flex;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
      }

      @include rpl_breakpoint('xxxl') {
        @include rpl_grid_column(9);
      }
    }

    &__image {
      max-width: 100%;
      @include rpl_breakpoint('l') {
        width: 100%;
      }
    }

    &__title {
      @include rpl_typography_ruleset($rpl-call-to-action-title-ruleset);
      box-sizing: border-box;
      color: $rpl-call-to-action-title-text-color;
      margin: $rpl-call-to-action-title-margin-xs;
      padding: $rpl-call-to-action-title-padding-xs;
      width: 100%;
      @include rpl_breakpoint('s') {
        padding: 0;
      }
      @include rpl_breakpoint('l') {
        margin: $rpl-call-to-action-title-margin-s;
      }
    }

    &__summary {
      @include rpl_typography_ruleset($rpl-call-to-action-summary-ruleset);
      box-sizing: border-box;
      color: $rpl-call-to-action-summary-text-color;
      margin: $rpl-call-to-action-summary-margin-xs;
      padding: $rpl-call-to-action-summary-padding-xs;
      width: 100%;
      @include rpl_breakpoint('s') {
        margin: $rpl-call-to-action-summary-margin-s;
        padding: 0;
      }
    }
  }
</style>
