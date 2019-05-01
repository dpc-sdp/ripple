<template>
  <div class="rpl-publication-pagination">
    <div class="rpl-publication-pagination__previous">
      <rpl-link v-if="previousLink" :href="previousLink" class="rpl-publication-pagination__link">
        <rpl-icon class="rpl-publication-pagination__link-icon" symbol="arrow_left_primary" color="primary" size="1.167" />
        <div v-if="previousText" class="rpl-publication-pagination__link-title">{{ previousText }}</div>
        <div v-if="previousDescription" class="rpl-publication-pagination__link-description">
          <rpl-link-text class="rpl-publication-pagination__link-description-text" size="small" :underline="true">{{ previousDescription }}</rpl-link-text>
        </div>
      </rpl-link>
    </div>
    <div class="rpl-publication-pagination__spacer">
      <div v-if="previousLink && nextLink" class="rpl-publication-pagination__spacer-graphic"></div>
    </div>
    <div class="rpl-publication-pagination__next">
      <rpl-link v-if="nextLink" :href="nextLink" class="rpl-publication-pagination__link">
        <rpl-icon class="rpl-publication-pagination__link-icon" symbol="arrow_right_primary" color="primary" size="1.167" />
        <div v-if="nextText" class="rpl-publication-pagination__link-title">{{ nextText }}</div>
        <div v-if="nextDescription" class="rpl-publication-pagination__link-description">
          <rpl-link-text class="rpl-publication-pagination__link-description-text" size="small" :underline="true">{{ nextDescription }}</rpl-link-text>
        </div>
      </rpl-link>
    </div>
  </div>
</template>

<script>
import RplIcon from '@dpc-sdp/ripple-icon'
import { RplLink, RplLinkText } from '@dpc-sdp/ripple-link'

export default {
  name: 'RplPublicationPagination',
  components: {
    RplIcon,
    RplLink,
    RplLinkText
  },
  props: {
    previousLink: { type: String, default: null },
    previousText: { type: String, default: 'Previous' },
    previousDescription: { type: String, default: '' },
    nextLink: { type: String, default: null },
    nextText: { type: String, default: 'Next' },
    nextDescription: { type: String, default: '' }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-publication-pagination-margin-xs: ($rpl-space * 7) 0 ($rpl-space * 8) !default;
  $rpl-publication-pagination-margin-m: ($rpl-space * 9) 0 !default;
  $rpl-publication-pagination-spacer-margin-horizontal: ($rpl-space * 12) !default;
  $rpl-publication-pagination-spacer-margin: 0 $rpl-publication-pagination-spacer-margin-horizontal !default;
  $rpl-publication-pagination-spacer-graphic-width: rem(35px) !default;
  $rpl-publication-pagination-spacer-graphic-height: rem(72px) !default;
  $rpl-publication-pagination-spacer-height-xs: ($rpl-space * 8) !default;
  $rpl-publication-pagination-spacer-graphic-background-image: url('./assets/images/separator.svg') !default;
  $rpl-publication-pagination-link-max-width: rem(200px) !default;
  $rpl-publication-pagination-link-title-ruleset: ('m', 1em, 'bold') !default;
  $rpl-publication-pagination-link-title-color: rpl-color('extra_dark_neutral') !default;
  $rpl-publication-pagination-link-title-color-hover: rpl-color('primary') !default;
  $rpl-publication-pagination-link-description-color-hover: rpl-color('primary') !default;
  $rpl-publication-pagination-link-icon-margin: 0 0 $rpl-space-4 0 !default;
  $rpl-publication-pagination-link-title-margin: 0 0 $rpl-space-2 0 !default;

  .rpl-publication-pagination {
    $root: &;
    margin: $rpl-publication-pagination-margin-xs;

    @include rpl-breakpoint('m') {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin: $rpl-publication-pagination-margin-m;
    }

    @include rpl_print_hidden;

    &__spacer {
      align-self: flex-end;
      margin: $rpl-publication-pagination-spacer-margin;
    }

    &__spacer-graphic {
      height: $rpl-publication-pagination-spacer-height-xs;

      @include rpl-breakpoint('m') {
        background-image: $rpl-publication-pagination-spacer-graphic-background-image;
        width: $rpl-publication-pagination-spacer-graphic-width;
        height: $rpl-publication-pagination-spacer-graphic-height;
      }
    }

    &__previous,
    &__next {
      @include rpl-breakpoint('m') {
        width: calc(50% - #{ ($rpl-publication-pagination-spacer-graphic-width / 2) + $rpl-publication-pagination-spacer-margin-horizontal });
      }
    }

    &__next {
      .rpl-link {
        & > .rpl-link__inner {
          @include rpl-breakpoint('m') {
            align-items: flex-end;
            text-align: right;
          }
        }
      }
    }

    &__link {
      display: block;
      text-decoration: none;

      &.rpl-link {
        &:hover,
        &:focus {
          text-decoration: none;

          #{$root}__link-title {
            color: $rpl-publication-pagination-link-title-color-hover;
          }

          #{$root}__link-description-text {
            color: $rpl-publication-pagination-link-description-color-hover;
          }
        }

        & > .rpl-link__inner {
          display: flex;
          flex-direction: column;
        }
      }
    }

    &__link-icon {
      margin: $rpl-publication-pagination-link-icon-margin;
    }

    &__link-title {
      @include rpl_typography_ruleset($rpl-publication-pagination-link-title-ruleset);
      color: $rpl-publication-pagination-link-title-color;
      margin: $rpl-publication-pagination-link-title-margin;
    }

    &__link-description {
      width: 100%;
    }
  }
</style>
