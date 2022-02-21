<template>
  <div class="rpl-statistics-grid">
    <div
      v-for="(item, index) in blocks"
      :key="`rpl-statistics-block-${index}`"
      :class="`rpl-statistics-grid__block rpl-statistics-grid__block--${theme ? 'primary' : 'secondary'}`">
      <div class="rpl-statistics-grid__block-inner">
        <rpl-markup class="rpl-statistics-grid__block-heading" v-if="item.heading" :html="item.heading"></rpl-markup>
        <rpl-markup class="rpl-statistics-grid__block-body" v-if="item.body" :html="item.body"></rpl-markup>
      </div>
    </div>
  </div>
</template>

<script>
import RplMarkup from '@dpc-sdp/ripple-markup'

export default {
  name: 'RplStatisticsGrid',
  components: { RplMarkup },
  props: {
    theme: {
      type: Boolean,
      default: true
    },
    blocks: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-statistics-grid-background-primary: rpl_color('light_neutral') !default;
  $rpl-statistics-grid-background-secondary: white !default;
  $rpl-statistics-grid-padding: ($rpl-space * 10) ($rpl-space * 4);
  $rpl-statistics-grid-margin: ($rpl-space * 2);

  .rpl-statistics-grid {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: $rpl-statistics-grid-margin;

    &__block {
      display: flex;
      flex-basis: rem(100px);
      flex-grow: 1;
      padding: $rpl-statistics-grid-padding;

      text-align: center;

      @include rpl_breakpoint('m') {
        flex-basis: rem(200px);
      }

      &-inner {
        align-self: center;
        flex-grow: inherit;
      }

      .rpl-markup a:not(.rpl-button) .rpl-text-label .rpl-text-icon__group {
        text-decoration: underline;
      }

      &-heading {
        @include rpl_typography(heading_l);
        margin-bottom: 0;
      }

      &-body {
        margin-top: 0;
      }

      &--primary {
        background-color: $rpl-statistics-grid-background-primary;
      }

      &--secondary {
        background-color: $rpl-statistics-grid-background-secondary;
      }
    }
  }
</style>
