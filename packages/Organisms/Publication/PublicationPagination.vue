<template>
  <div class="rpl-publication-pagination">
    <div class="rpl-publication-pagination__previous">
      <rpl-link v-if="previousLink" :href="previousLink" class="rpl-publication-pagination__link" :innerWrap="false">
        <rpl-icon class="rpl-publication-pagination__link-icon" symbol="arrow_left_primary" color="primary" />
        <div v-if="previousText" class="rpl-publication-pagination__link-title">{{ previousText }}</div>
        <div v-if="previousDescription">
          <rpl-link-text class="rpl-publication-pagination__link-description" size="small" :underline="true">{{ previousDescription }}</rpl-link-text>
        </div>
      </rpl-link>
    </div>
    <div class="rpl-publication-pagination__spacer">
      <div v-if="previousLink && nextLink" class="rpl-publication-pagination__spacer-graphic"></div>
    </div>
    <div class="rpl-publication-pagination__next">
      <rpl-link v-if="nextLink" :href="nextLink" class="rpl-publication-pagination__link" :innerWrap="false">
        <rpl-icon class="rpl-publication-pagination__link-icon" symbol="arrow_right_primary" color="primary" />
        <div v-if="nextText" class="rpl-publication-pagination__link-title">{{ nextText }}</div>
        <div v-if="nextDescription">
          <rpl-link-text class="rpl-publication-pagination__link-description" size="small" :underline="true">{{ nextDescription }}</rpl-link-text>
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

  .rpl-publication-pagination {
    $root: &;
    margin: rem(44px) 0;

    @include rpl-breakpoint('m') {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin: rem(60px) 0;
    }

    &__spacer-graphic {
      height: rem(32px);

      @include rpl-breakpoint('m') {
        background-image: url('./assets/images/separator.svg');
        width: 35px;
        height: 72px;
      }
    }

    &__next {
      @include rpl-breakpoint('m') {
        text-align: right;
      }
    }

    &__link {
      display: block;
      text-decoration: none;
      max-width: rem(200px);

      &.rpl-link {
        &:hover,
        &:focus {
          text-decoration: none;

          #{$root}__link-title {
            color: rpl-color('primary');
          }

          #{$root}__link-description {
            color: rpl-color('primary');
          }
        }

      }
    }

    &__link-icon {
      margin-bottom: $rpl-space-4;
    }

    &__link-title {
      @include rpl_typography_ruleset(('m', 1em, 'bold'));
      color: rpl-color('extra_dark_neutral');
      margin-bottom: $rpl-space-2;
    }
  }
</style>
