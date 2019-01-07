<template>
  <div class="rpl-campaign-primary">
    <a v-if="link && image" :href="link.url" class="rpl-campaign-primary__image-outer rpl-campaign-primary__image-outer--large">
      <span class="rpl-campaign-primary__image-inner">
        <svg class="rpl-campaign-primary__image" width="699" height="411" viewBox="0 0 699 411" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true">
          <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="699" height="411">
            <path d="M699 0L114.075 170.226L0 411H699V0Z" fill="white" />
          </mask>
          <g mask="url(#mask0)">
            <image width="699" height="411" :href="image" :xlink:href="image" />
          </g>
        </svg>
      </span>
    </a>
    <div v-else-if="image" class="rpl-campaign-primary__image-outer rpl-campaign-primary__image-outer--large">
      <span class="rpl-campaign-primary__image-inner">
        <svg class="rpl-campaign-primary__image" width="699" height="411" viewBox="0 0 699 411" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true">
          <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="699" height="411">
            <path d="M699 0L114.075 170.226L0 411H699V0Z" fill="white" />
          </mask>
          <g mask="url(#mask0)">
            <image width="699" height="411" :href="image" :xlink:href="image" />
          </g>
        </svg>
      </span>
    </div>
    <div v-if="link" class="rpl-campaign-primary__primary_arrow">
      <rpl-icon symbol="arrow_right_primary" color="white" />
    </div>
    <div v-if="image" class="rpl-campaign-primary__image-outer rpl-campaign-primary__image-outer--small">
      <img :src="image" alt="" class="rpl-campaign-primary__image" />
    </div>
    <div class="rpl-campaign-primary__row">
      <div class="rpl-campaign-primary__left">
        <div class="rpl-campaign-primary__content">
          <h2 v-if="title" class="rpl-campaign-primary__title">{{ title }}</h2>
          <div v-if="summary" class="rpl-campaign-primary__summary" v-html="summary"></div>
        </div>
        <rpl-button v-if="link" :href="link.url" theme="primary" class="rpl-campaign-primary__call-to-action">{{ link.text }}</rpl-button>
      </div>
    </div>
  </div>
</template>

<script>
import RplButton from '@dpc-sdp/ripple-button'
import RplIcon from '@dpc-sdp/ripple-icon'

export default {
  name: 'RplCampaignPrimary',
  props: {
    title: String,
    summary: String,
    link: Object,
    image: String
  },
  components: {
    RplButton,
    RplIcon
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";

  $rpl-campaign-primary-padding-s: 0 0 39px !default;
  $rpl-campaign-primary-padding-m: 52px 0 66px !default;
  $rpl-campaign-primary-padding-xl: ($rpl-space * 14) 0 ($rpl-space * 16) !default;
  $rpl-campaign-primary-padding-xxl: ($rpl-space * 19) 0 !default;
  $rpl-campaign-primary-border: 1px solid rpl_color('mid_neutral_1') !default;
  $rpl-campaign-primary-title-ruleset: (
    'xs': ('l', 1.2em, 'bold'),
    's': ('xl', 1.2em, 'bold'),
    'm': ('mega', 1.3em, 'bold')
  ) !default;
  $rpl-campaign-primary-title-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-campaign-primary-title-margin-xs: $rpl-space-3 0 !default;
  $rpl-campaign-primary-title-margin-s: 0 !default;
  $rpl-campaign-primary-summary-ruleset: (
    'xs': ('xs', 1.4em, 'regular'),
    'm': ('s', 1.5em, 'regular'),
    'xxxl': ('m', 1.5em, 'regular')
  ) !default;
  $rpl-campaign-primary-summary-text-color: mix(rpl_color('extra_dark_neutral'), rpl_color('white'), 93%) !default;
  $rpl-campaign-primary-summary-margin-xs: ($rpl-space * 5) 0 ($rpl-space * 7) !default;
  $rpl-campaign-primary-summary-margin-s: ($rpl-space * 6) 0 !default;
  $rpl-campaign-primary-content-padding-xs: 0 $rpl-component-padding-xs !default;
  $rpl-campaign-primary-content-padding-s: 0 $rpl-component-padding-s !default;
  $rpl-campaign-primary-button-margin-s: 0 $rpl-component-padding-s !default;
  $rpl-campaign-primary-primary-arrow-background: transparent url(rpl_banner_primary_arrow_url('secondary')) no-repeat bottom right !default;

  .rpl-campaign-primary {
    position: relative;
    @include rpl_breakpoint('s') {
      padding: $rpl-campaign-primary-padding-s;
    }
    @include rpl_breakpoint('m') {
      border-bottom: $rpl-campaign-primary-border;
      padding: $rpl-campaign-primary-padding-m;
    }
    @include rpl_breakpoint('xl') {
      padding: $rpl-campaign-primary-padding-xl;
    }
    @include rpl_breakpoint('xxl') {
      padding: $rpl-campaign-primary-padding-xxl;
    }

    &__row {
      @include rpl_site_constrain;
    }

    &__left {
      @include rpl_breakpoint('xl') {
        @include rpl_grid_column(6);
      }
      @include rpl_breakpoint('xxl') {
        @include rpl_grid_column(7);
      }
      @include rpl_breakpoint('xxxl') {
        @include rpl_grid_column(8);
      }
    }

    &__content {
      padding: $rpl-campaign-primary-content-padding-xs;
      @include rpl_breakpoint('s') {
        padding: $rpl-campaign-primary-content-padding-s;
      }
      @include rpl_breakpoint('m') {
        padding: 0;
      }
    }

    &__title {
      @include rpl_typography_ruleset($rpl-campaign-primary-title-ruleset);
      box-sizing: border-box;
      color: $rpl-campaign-primary-title-text-color;
      margin: $rpl-campaign-primary-title-margin-xs;
      width: 100%;
      @include rpl_breakpoint('l') {
        margin: $rpl-campaign-primary-title-margin-s;
      }
    }

    &__summary {
      @include rpl_typography_ruleset($rpl-campaign-primary-summary-ruleset);
      box-sizing: border-box;
      color: $rpl-campaign-primary-summary-text-color;
      margin: $rpl-campaign-primary-summary-margin-xs;
      width: 100%;
      @include rpl_breakpoint('s') {
        margin: $rpl-campaign-primary-summary-margin-s;
      }
    }

    &__call-to-action {
      &.rpl-button {
        @include rpl_breakpoint('s') {
          margin: $rpl-campaign-primary-button-margin-s;
        }
        @include rpl_breakpoint('m') {
          margin: 0;
        }
      }
    }

    &__image-outer {
      @include rpl_breakpoint_down('m') {
        width: 100%;
      }
      @include rpl_breakpoint('m') {
        position: absolute;
        right: 0;
        bottom: 100%;
        width: 50%;
      }
      @include rpl_breakpoint('xl') {
        bottom: 0;
      }
      @include rpl_breakpoint('xxl') {
        bottom: 0;
        width: 40%;
      }
      &--large {
        display: none;
        @include rpl_breakpoint('m') {
          display: block;
        }
      }
      &--small {
        @include rpl_breakpoint('m') {
          display: none;
        }
      }
    }

    &__image-inner {
      display: block;
      padding-bottom: (411/699) * 100%;
      width: 100%;
    }

    &__image {
      width: 100%;
      @include rpl_breakpoint('m') {
        position: absolute;
        height: 100%;
        vertical-align: bottom;
      }
    }

    &__primary_arrow {
      display: none;
      @include rpl_breakpoint('xl') {
        display: block;
        background: $rpl-campaign-primary-primary-arrow-background;
        width: rem(48px);
        height: rem(100px);
        position: absolute;
        bottom: 0;
        right: 0;
      }

      .rpl-icon {
        position: absolute;
        bottom: rem(9px);
        right: rem(9px);
      }
    }
  }
</style>
