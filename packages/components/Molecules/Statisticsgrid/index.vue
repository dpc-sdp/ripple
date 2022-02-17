<template>
  <div class="rpl-statistics-grid">
    <div
      v-for="(item, index) in blocks"
      :key="`rpl-statistics-block-${index}`"
      :class="`rpl-statistics-grid__block rpl-statistics-grid__block--${item.theme || 'primary'}`">
      <h2>{{ item.heading }}</h2>
      <p>{{ item.body }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RplStatisticsGrid',
  props: {
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
  $rpl-statistics-grid-background-secondary: white !default;
  $rpl-statistics-grid-padding: ($rpl-space * 10);
  $rpl-statistics-grid-margin: ($rpl-space * 2);
  $rpl-statistics-grid-width: 280px;

  $rpl-statistics-grid-heading-separation: 8px;

  .rpl-statistics-grid {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: $rpl-statistics-grid-margin;

    &__block {
      flex: 0 0 $rpl-statistics-grid-width;
      align-items: center;

      padding: $rpl-statistics-grid-padding;

      &--primary {
        background-color: $rpl-statistics-grid-background-primary;
        color: $rpl-statistics-grid-foreground-primary;

        h2 {
          margin-bottom: $rpl-statistics-grid-heading-separation;
        }

        p {
          margin-top: $rpl-statistics-grid-heading-separation;
        }
      }

      &--secondary {
        background-color: $rpl-statistics-grid-background-secondary;
        text-align: center;

        h2 {
          margin-bottom: 0;
        }

        p {
          margin-top: 0;
        }
      }
    }
  }
</style>
