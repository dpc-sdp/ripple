<template>
  <div class="rpl-campaign-primary" :class="{ 'rpl-campaign-primary--with-caption' : !!caption }">
    <div v-if="image" class="rpl-campaign-primary__image-outer rpl-campaign-primary__image-outer--large">
      <span class="rpl-campaign-primary__image-inner">
        <template v-if="caption">
          <figure class="rpl-campaign-primary__figure">
            <rpl-campaign-primary-image :hasAlt="hasAlt" :image="image" />
            <figcaption class="rpl-campaign-primary__figure-caption">{{ caption }}</figcaption>
          </figure>
        </template>
        <template v-else>
          <rpl-campaign-primary-image :hasAlt="hasAlt" :image="image" />
        </template>
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
        <div v-if="caption" aria-hidden="true" class="rpl-campaign-primary__caption">{{ caption }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import RplButton from '@dpc-sdp/ripple-button'
import RplCampaignPrimaryImage from './CampaignPrimaryImage'

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
    RplCampaignPrimaryImage
  },
  computed: {
    hasAlt () {
      // Must explicitly return a boolean, otherwise it returns a string.
      return (this.image && this.image.alt) ? true : false // eslint-disable-line
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-campaign-primary-padding-s: 0 0 ($rpl-space * 10) !default;
  $rpl-campaign-primary-padding-m: ($rpl-space * 13) 0 ($rpl-space * 16) !default;
  $rpl-campaign-primary-padding-xl: ($rpl-space * 14) 0 ($rpl-space * 16) !default;
  $rpl-campaign-primary-padding-xxl: ($rpl-space * 19) 0 !default;
  $rpl-campaign-primary-padding-with-caption-s: 0 0 $rpl-space-3 !default;
  $rpl-campaign-primary-padding-with-caption-m: ($rpl-space * 13) 0 $rpl-space-3 !default;
  $rpl-campaign-primary-padding-with-caption-xl: ($rpl-space * 14) 0 $rpl-space-3 !default;
  $rpl-campaign-primary-padding-with-caption-xxl: ($rpl-space * 19) 0 $rpl-space-3 !default;
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
  $rpl-campaign-primary-caption-ruleset: ('xxs', 1.17em, 'medium') !default;
  $rpl-campaign-primary-caption-margin-xs: ($rpl-space * 5) 0 0 !default;
  $rpl-campaign-primary-caption-margin-s: ($rpl-space * 12) 0 0 !default;
  $rpl-campaign-primary-summary-link-color: rpl-color('primary') !default;

  .rpl-campaign-primary {
    @include rpl_site_constrain;
    position: relative;

    @include rpl_breakpoint('s') {
      padding: $rpl-campaign-primary-padding-s;
    }

    @include rpl_breakpoint('m') {
      padding: $rpl-campaign-primary-padding-m;
      border-bottom: $rpl-campaign-primary-border;
    }

    @include rpl_breakpoint('xl') {
      padding: $rpl-campaign-primary-padding-xl;
    }

    @include rpl_breakpoint('xxl') {
      padding: $rpl-campaign-primary-padding-xxl;
    }

    @include rpl_print {
      border-bottom: 0;
    }

    &--with-caption {
      @include rpl_breakpoint('s') {
        padding: $rpl-campaign-primary-padding-with-caption-s;
      }

      @include rpl_breakpoint('m') {
        padding: $rpl-campaign-primary-padding-with-caption-m;
      }

      @include rpl_breakpoint('xl') {
        padding: $rpl-campaign-primary-padding-with-caption-xl;
      }

      @include rpl_breakpoint('xxl') {
        padding: $rpl-campaign-primary-padding-with-caption-xxl;
      }
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
      width: 100%;
      margin: $rpl-campaign-primary-title-margin-xs;

      @include rpl_breakpoint('s') {
        margin: $rpl-campaign-primary-title-margin-s;
      }
    }

    &__summary {
      @include rpl_typography_ruleset($rpl-campaign-primary-summary-ruleset);
      @include rpl_text_color($rpl-campaign-primary-summary-text-color);
      box-sizing: border-box;
      width: 100%;
      margin: $rpl-campaign-primary-summary-margin-xs;

      @include rpl_breakpoint('s') {
        margin: $rpl-campaign-primary-summary-margin-s;
      }
      a {
        color: $rpl-campaign-primary-summary-link-color;
        text-decoration: none;
        &:focus, &:hover {
          text-decoration: underline;
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
      margin: $rpl-campaign-primary-caption-margin-xs;

      @include rpl_breakpoint('s') {
        margin: $rpl-campaign-primary-caption-margin-s;
      }
    }

    &__figure {
      margin: 0;
    }

    &__figure-caption {
      @include rpl_visually_hidden;
    }
  }
</style>
