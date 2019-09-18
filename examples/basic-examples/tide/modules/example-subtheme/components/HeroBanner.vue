<template>
  <div class="my-hero-banner">
    <rpl-hero-banner
      :title="title"
      :theme="theme"
      :introText="introText"
      class="rpl-site-constrain--on-all"
    >
    </rpl-hero-banner>

    <div slot="leftbottom" >
      <img src="https://www.content.vic.gov.au/sites/default/files/2019-07/VMC-Home-Banner-PGD2017-Kylie-Auldist.jpg">
    </div>
  </div>
</template>

<script>
import RplHeroBanner from '@dpc-sdp/ripple-hero-banner'

export default {
  name: 'MyHeroBanner',
  components: {
    RplHeroBanner
  },
  props: {
    title: String,
    introText: String,
    theme: { type: String, default: 'light' },
    linkPrimary: Object,
    ctaText: String,
    linkSecondary: Object
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  $rpl-hero-banner-cta-secondary-margin: $rpl-space-3 * 2 !default;
  $rpl-hero-banner-cta-secondary-text-margin: $rpl-space-2 $rpl-space-2 $rpl-space-2 0 !default;
  $rpl-hero-banner-cta-secondary-link-ruleset: (
    'xs': ('s', 1.7em, 'medium'),
    'm': ('m', 1.2em, 'bold'),
  ) !default;
  $rpl-hero-banner-cta-secondary-text-ruleset: ('s', 1.5em, 'regular') !default;
  $rpl-hero-banner-cta-secondary-text-color: rpl-color('extra_dark_neutral') !default;

  .rpl-hero-banner--cta {
    &__left-bottom {
      margin-top: 1.5rem;
      display: flex;
      flex-direction: column;

      @include rpl_breakpoint('m') {
        flex-direction: row;
        align-items: center;
      }

      @include rpl_print {
        display: block;
      }
    }

    &__secondary {
      display: flex;
      align-items: flex-start;
      flex-direction: column;

      @include rpl_breakpoint('m') {
        align-items: center;
        flex-direction: row;
      }

      @include rpl_breakpoint('m') {
        margin-left: $rpl-hero-banner-cta-secondary-margin;
      }

      @include rpl_print_hidden;

      &-text {
        @include rpl_typography_ruleset($rpl-hero-banner-cta-secondary-text-ruleset);
        @include rpl_text_color($rpl-hero-banner-cta-secondary-text-color);
        margin: $rpl-hero-banner-cta-secondary-text-margin;
        .rpl-hero-banner--cta-dark & {
          color: white;
        }
      }

      &-link {
        @include rpl_typography_ruleset($rpl-hero-banner-cta-secondary-link-ruleset);
        .rpl-hero-banner--cta-dark & {
          color: white;
        }
        .rpl-text-label {
          text-decoration: underline;
        }
      }
    }

    &__primary {
      &.rpl-button {
        @include rpl_print_hidden;
      }
    }
  }
</style>
