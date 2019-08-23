<template>
  <div class="rpl-campaign-primary" :class="{ 'rpl-campaign-primary--with-caption' : !!caption }">
    <div v-if="image" class="rpl-campaign-primary__image-outer rpl-campaign-primary__image-outer--large">
      <span class="rpl-campaign-primary__image-inner">
        <svg :aria-hidden="!hasAlt ? 'true' : false" class="rpl-campaign-primary__image" width="699" height="411" viewBox="0 0 699 411" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <title v-if="hasAlt">{{image.alt}}</title>
          <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="699" height="411">
            <path d="M699 0L114.075 170.226L0 411H699V0Z" fill="white" />
          </mask>
          <g mask="url(#mask0)">
            <image width="699" height="411" :xlink:href="image.src" :href="image.src" />
          </g>
        </svg>
      </span>
    </div>
    <div v-if="image" class="rpl-campaign-primary__image-outer rpl-campaign-primary__image-outer--small">
      <img :src="image.src" :alt="hasAlt ? image.alt : ''" :role="!hasAlt ? 'presentational': false" class="rpl-campaign-primary__image" />
    </div>
    <div class="rpl-campaign-primary__row">
      <div class="rpl-campaign-primary__left">
        <div class="rpl-campaign-primary__content">
          <h2 v-if="title" class="rpl-campaign-primary__title">{{ title }}</h2>
          <div v-if="summary" class="rpl-campaign-primary__summary" v-html="summary"></div>
        </div>
        <rpl-button v-if="link" :href="link.url" theme="primary" class="rpl-campaign-primary__call-to-action">{{ link.text }}</rpl-button>
        <div v-if="caption" class="rpl-campaign-primary__caption">{{ caption }}</div>
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
    image: Object,
    caption: String
  },
  components: {
    RplButton,
    RplIcon
  },
  computed: {
    hasAlt () {
      return this.image && this.image.alt && this.image.alt.length > 2
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-campaign-primary-padding: (
    's': 0 0 rem(39px),
    'm': rem(52px) 0 rem(66px),
    'xl': ($rpl-space * 14) 0 ($rpl-space * 16),
    'xxl': ($rpl-space * 19) 0
  ) !default;

  $rpl-campaign-primary-padding-with-caption: (
    's': 0 0 $rpl-space-3,
    'm': rem(52px) 0 $rpl-space-3,
    'xl': ($rpl-space * 14) 0 $rpl-space-3,
    'xxl': ($rpl-space * 19) 0 $rpl-space-3
  ) !default;

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
  $rpl-campaign-primary-caption-ruleset: ('xxs', 1.17em, 'medium') !default;

  .rpl-campaign-primary {
    @include rpl_site_constrain;
    position: relative;
    @include rpl_set_rule_for_breakpoints($rpl-campaign-primary-padding, 'padding');

    @include rpl_breakpoint('m') {
      border-bottom: $rpl-campaign-primary-border;
    }

    @include rpl_print {
      border-bottom: 0;
    }

    &--with-caption {
      @include rpl_set_rule_for_breakpoints($rpl-campaign-primary-padding-with-caption, 'padding');
    }

    &__row {
      @include rpl_grid_row;
      @include rpl_grid_row_gutter;
      position: relative;
    }

    &__left {
      @include rpl_grid_full;

      @include rpl_breakpoint('m'){
        @include rpl_grid_column(6);
        margin-bottom: 0 !important;
      }
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

    &__title {
      @include rpl_typography_ruleset($rpl-campaign-primary-title-ruleset);
      @include rpl_text_color($rpl-campaign-primary-title-text-color);
      box-sizing: border-box;
      margin: $rpl-campaign-primary-title-margin-xs;
      width: 100%;
      @include rpl_breakpoint('l') {
        margin: $rpl-campaign-primary-title-margin-s;
      }
    }

    &__summary {
      @include rpl_typography_ruleset($rpl-campaign-primary-summary-ruleset);
      @include rpl_text_color($rpl-campaign-primary-summary-text-color);
      box-sizing: border-box;
      margin: $rpl-campaign-primary-summary-margin-xs;
      width: 100%;
      @include rpl_breakpoint('s') {
        margin: $rpl-campaign-primary-summary-margin-s;
      }
    }

    &__image-outer {
      @include rpl_breakpoint_down('m') {
        width: 100%;
      }
      @include rpl_breakpoint('m') {
        position: absolute;
        right: 0;
        bottom: 0%;
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
      margin-left: -$rpl-component-padding-xs;
      width: calc(100% + #{$rpl-component-padding-xs * 2});

      @include rpl_breakpoint('m') {
        position: absolute;
        height: 100%;
        vertical-align: bottom;
      }

      @include rpl_print_image;

      @include rpl_print {
        width: auto;
      }
    }

    &__call-to-action {
      @include rpl_print_hidden;
    }

    &__caption {
      @include rpl_typography_ruleset($rpl-campaign-primary-caption-ruleset);
      color: rpl-color('dark_neutral');
      margin-top: rem(50px);
    }
  }
</style>
