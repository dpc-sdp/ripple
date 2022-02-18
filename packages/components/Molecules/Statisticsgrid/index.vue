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

  $rpl-statistics-grid-background-primary: rpl_color('dark_primary') !default;
  $rpl-statistics-grid-foreground-primary: white !default;
  $rpl-statistics-grid-link-primary: rgb(150, 200, 255) !default;
  $rpl-statistics-grid-background-secondary: white !default;
  $rpl-statistics-grid-padding: ($rpl-space * 10);
  $rpl-statistics-grid-margin: ($rpl-space * 2);
  $rpl-statistics-grid-width: rem(200px);

  $rpl-statistics-grid-heading-separation: ($rpl-space * 2);

  .rpl-statistics-grid {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: $rpl-statistics-grid-margin;

    &__block {
      $root: &;

      display: flex;

      flex: 1 0 $rpl-statistics-grid-width;
      padding: $rpl-statistics-grid-padding;

      &-inner {
        align-self: center;
        flex-grow: inherit;
      }

      .rpl-markup a:not(.rpl-button) .rpl-text-label .rpl-text-icon__group {
        text-decoration: underline;
      }

      &--primary {
        background-color: $rpl-statistics-grid-background-primary;

        #{$root}-heading {
          @include rpl_typography(heading_l);
          margin-bottom: $rpl-statistics-grid-heading-separation;
          color: $rpl-statistics-grid-foreground-primary;
        }

        #{$root}-body {
          margin-top: $rpl-statistics-grid-heading-separation;
          color: $rpl-statistics-grid-foreground-primary;
        }

        .rpl-markup a:not(.rpl-button) .rpl-text-label {
          color: $rpl-statistics-grid-link-primary;

          .rpl-icon--color_primary {
            fill: currentColor;
          }
        }
      }

      &--secondary {
        background-color: $rpl-statistics-grid-background-secondary;
        text-align: center;

        #{$root}-heading {
          @include rpl_typography(heading_l);
          margin-bottom: 0;
        }

        #{$root}-body {
          margin-top: 0;
        }
      }
    }
  }
</style>
