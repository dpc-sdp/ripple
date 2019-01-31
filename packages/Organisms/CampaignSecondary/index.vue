<template>
  <div class="rpl-campaign-secondary">
    <div class="rpl-campaign-secondary__row">
      <div v-if="image || video" class="rpl-campaign-secondary__left">
        <div class="rpl-campaign-secondary__content">
          <img v-if="image" :src="image" alt="" class="rpl-campaign-secondary__image" />
          <rpl-embedded-video :variant="video.mediaLink ? 'link' : false" v-else-if="video" :src="video.src" :media-link="video.mediaLink" class="rpl-campaign-secondary__video" />
        </div>
      </div>
      <div class="rpl-campaign-secondary__right">
        <div class="rpl-campaign-secondary__content">
          <h2 v-if="title" class="rpl-campaign-secondary__title">{{ title }}</h2>
          <div v-if="summary" class="rpl-campaign-secondary__summary" v-html="summary"></div>
        </div>
        <rpl-button v-if="link" :href="link.url" theme="primary">{{ link.text }}</rpl-button>
      </div>
    </div>
  </div>
</template>

<script>
import breakpoint from '@dpc-sdp/ripple-global/mixins/breakpoint'
import RplButton from '@dpc-sdp/ripple-button'
import RplEmbeddedVideo from '@dpc-sdp/ripple-embedded-video'
import RplIcon from '@dpc-sdp/ripple-icon'

export default {
  name: 'RplCampaignSecondary',
  mixins: [breakpoint],
  props: {
    title: String,
    summary: String,
    link: Object,
    video: Object,
    image: String
  },
  components: {
    RplButton,
    RplEmbeddedVideo,
    RplIcon
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-campaign-secondary-padding-s: $rpl-component-padding-s !default;
  $rpl-campaign-secondary-padding-l: ($rpl-component-padding-l) 0 !default ;
  $rpl-campaign-secondary-padding-xl: ($rpl-component-padding-xl) 0 !default;
  $rpl-campaign-secondary-padding-xxl: ($rpl-component-padding-xl) 0 !default;
  $rpl-campaign-secondary-title-ruleset: (
    'xs': ('l', 1.2em, 'bold'),
    's': ('xl', 1.2em, 'bold'),
    'm': ('mega', 1.3em, 'bold')
  ) !default;
  $rpl-campaign-secondary-title-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-campaign-secondary-title-margin-xs: ($rpl-space * 6) 0 $rpl-space-3 !default;
  $rpl-campaign-secondary-title-margin-m: ($rpl-space * 9) 0 $rpl-space-3 !default;
  $rpl-campaign-secondary-title-margin-l: 0 !default;
  $rpl-campaign-secondary-summary-ruleset: (
    'xs': ('xs', 1.4em, 'regular'),
    's': ('s', 1.5em, 'regular'),
  ) !default;
  $rpl-campaign-secondary-summary-text-color: mix(rpl_color('extra_dark_neutral'), rpl_color('white'), 93%) !default;
  $rpl-campaign-secondary-summary-margin-xs: $rpl-space-3 0 ($rpl-space * 5) !default;
  $rpl-campaign-secondary-summary-margin-s: ($rpl-space * 4) 0 ($rpl-space * 6) !default;
  $rpl-campaign-secondary-summary-margin-m: $rpl-space-3 0 ($rpl-space * 6) !default;
  $rpl-campaign-primary-content-padding-xs: 0 $rpl-component-padding-xs !default;
  $rpl-campaign-secondary-content-padding-s: 0 !default;
  $rpl-campaign-secondary-border-radius: rem(4px);

  .rpl-campaign-secondary {
    position: relative;
    @include rpl_breakpoint('s') {
      padding: $rpl-campaign-secondary-padding-s;
    }
    @include rpl_breakpoint('l') {
      padding: $rpl-campaign-secondary-padding-l;
    }
    @include rpl_breakpoint('xl') {
      padding: $rpl-campaign-secondary-padding-xl;
    }
    @include rpl_breakpoint('xxl') {
      padding: $rpl-campaign-secondary-padding-xxl;
    }

    @media print {
      padding: 0;
    }

    &__row {
      margin: auto;
      @include rpl_breakpoint('l') {
        @include rpl_grid_row();
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
      border-radius: $rpl-campaign-secondary-border-radius;
      display: block;
      width: 100%;
      @include rpl_breakpoint('s') {
        padding: $rpl-campaign-secondary-content-padding-s;
      }
    }

    &__title {
      @include rpl_typography_ruleset($rpl-campaign-secondary-title-ruleset);
      box-sizing: border-box;
      color: $rpl-campaign-secondary-title-text-color;
      margin: $rpl-campaign-secondary-title-margin-xs;
      width: 100%;
      @include rpl_breakpoint('m') {
        margin: $rpl-campaign-secondary-title-margin-m;
      }
      @include rpl_breakpoint('l') {
        margin: $rpl-campaign-secondary-title-margin-l;
      }
    }

    &__summary {
      @include rpl_typography_ruleset($rpl-campaign-secondary-summary-ruleset);
      box-sizing: border-box;
      color: $rpl-campaign-secondary-summary-text-color;
      margin: $rpl-campaign-secondary-summary-margin-xs;
      width: 100%;
      @include rpl_breakpoint('s') {
        margin: $rpl-campaign-secondary-summary-margin-s;
      }
      @include rpl_breakpoint('m') {
        margin: $rpl-campaign-secondary-summary-margin-m;
      }
    }
  }
</style>
