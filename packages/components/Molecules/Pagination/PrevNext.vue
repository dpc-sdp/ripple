<template>
  <nav class="rpl-prev-next" :aria-label="label">
    <div class="rpl-prev-next__previous">
      <rpl-link v-if="previousLink" :href="previousLink" class="rpl-prev-next__link" :innerWrap="false">
        <div class="rpl-prev-next__link-inner">
          <rpl-icon class="rpl-prev-next__link-icon" symbol="arrow_left_primary" color="primary" size="1.167" />
          <div v-if="previousText" class="rpl-prev-next__link-title">{{ previousText }}</div>
          <div v-if="previousDescription" class="rpl-prev-next__link-description">
            <rpl-text-label class="rpl-prev-next__link-description-text" size="small" :underline="true">{{ previousDescription }}</rpl-text-label>
          </div>
        </div>
      </rpl-link>
    </div>
    <div class="rpl-prev-next__spacer">
      <div v-if="previousLink && nextLink" class="rpl-prev-next__spacer-graphic"></div>
    </div>
    <div class="rpl-prev-next__next">
      <rpl-link v-if="nextLink" :href="nextLink" class="rpl-prev-next__link" :innerWrap="false">
        <div class="rpl-prev-next__link-inner">
          <rpl-icon class="rpl-prev-next__link-icon" symbol="arrow_right_primary" color="primary" size="1.167" />
          <div v-if="nextText" class="rpl-prev-next__link-title">{{ nextText }}</div>
          <div v-if="nextDescription" class="rpl-prev-next__link-description">
            <rpl-text-label class="rpl-prev-next__link-description-text" size="small" :underline="true">{{ nextDescription }}</rpl-text-label>
          </div>
        </div>
      </rpl-link>
    </div>
  </nav>
</template>

<script>
import RplIcon from '@dpc-sdp/ripple-icon'
import { RplLink, RplTextLabel } from '@dpc-sdp/ripple-link'

export default {
  name: 'RplPrevNext',
  components: {
    RplIcon,
    RplLink,
    RplTextLabel
  },
  props: {
    label: { type: String, default: 'Publication' },
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

  $rpl-prev-next-margin-xs: ($rpl-space * 7) 0 ($rpl-space * 8) !default;
  $rpl-prev-next-margin-m: ($rpl-space * 9) 0 !default;
  $rpl-prev-next-spacer-margin-horizontal: ($rpl-space * 12) !default;
  $rpl-prev-next-spacer-margin: 0 $rpl-prev-next-spacer-margin-horizontal !default;
  $rpl-prev-next-spacer-graphic-width: rem(35px) !default;
  $rpl-prev-next-spacer-graphic-height: rem(72px) !default;
  $rpl-prev-next-spacer-height-xs: ($rpl-space * 8) !default;
  $rpl-prev-next-spacer-graphic-background-image: url('./assets/images/separator.svg') !default;
  $rpl-prev-next-link-max-width: rem(200px) !default;
  $rpl-prev-next-link-title-ruleset: ('m', 1em, 'bold') !default;
  $rpl-prev-next-link-title-color: rpl-color('extra_dark_neutral') !default;
  $rpl-prev-next-link-title-color-hover: rpl-color('primary') !default;
  $rpl-prev-next-link-description-color-hover: rpl-color('primary') !default;
  $rpl-prev-next-link-icon-margin: 0 0 $rpl-space-4 0 !default;
  $rpl-prev-next-link-title-margin: 0 0 $rpl-space-2 0 !default;

  .rpl-prev-next {
    $root: &;
    margin: $rpl-prev-next-margin-xs;

    @include rpl-breakpoint('m') {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin: $rpl-prev-next-margin-m;
    }

    @include rpl_print_hidden;

    &__spacer {
      align-self: flex-end;
      margin: $rpl-prev-next-spacer-margin;
    }

    &__spacer-graphic {
      height: $rpl-prev-next-spacer-height-xs;

      @include rpl-breakpoint('m') {
        background-image: $rpl-prev-next-spacer-graphic-background-image;
        width: $rpl-prev-next-spacer-graphic-width;
        height: $rpl-prev-next-spacer-graphic-height;
      }
    }

    &__previous,
    &__next {
      @include rpl-breakpoint('m') {
        width: calc(50% - #{ ($rpl-prev-next-spacer-graphic-width / 2) + $rpl-prev-next-spacer-margin-horizontal });
      }
    }

    &__next {
      .rpl-link {
        #{$root}__link-inner {
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
            color: $rpl-prev-next-link-title-color-hover;
          }

          #{$root}__link-description-text {
            color: $rpl-prev-next-link-description-color-hover;
          }
        }

        #{$root}__link-inner {
          display: flex;
          flex-direction: column;
        }
      }
    }

    &__link-icon {
      margin: $rpl-prev-next-link-icon-margin;
    }

    &__link-title {
      @include rpl_typography_ruleset($rpl-prev-next-link-title-ruleset);
      color: $rpl-prev-next-link-title-color;
      margin: $rpl-prev-next-link-title-margin;
    }

    &__link-description {
      width: 100%;
    }
  }
</style>
