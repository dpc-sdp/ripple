<template>
  <div
    class="rpl-intro-banner"
    :class="{ 'rpl-intro-banner--no-links': !showLinks, 'rpl-intro-banner--icon': icon }"
  >
    <rpl-row>
      <div class="rpl-intro-banner__left">
        <div v-if="icon" class="rpl-intro-banner__icon">
          <rpl-icon :symbol="icon" color="primary" size="1.5" />
        </div>
        <div class="rpl-intro-banner__main">
          <h2 v-if="title" class="rpl-intro-banner__title"><span>{{ title }}</span></h2>
          <div v-if="introText" class="rpl-intro-banner__description" v-html="introText"></div>
        </div>
      </div>
      <div class="rpl-intro-banner__right" v-if="showLinks">
        <h2 v-if="linkHeading" class="rpl-intro-banner__link-heading">{{ linkHeading }}</h2>
        <ul
          v-if="links"
          class="rpl-intro-banner__link-list"
          :class="`rpl-intro-banner__link-list--${linksType}`"
        >
          <li
            v-for="(item, index) of links"
            :key="index"
            class="rpl-intro-banner__link-list-item"
          >
            <rpl-text-link
              v-if="linksType==='link'"
              class="rpl-intro-banner__link"
              :text="item.text"
              :url="item.url"
              iconSymbol="arrow_right_primary"
              iconColor="primary"
              :underline="true"
              :size="textLinkSize"
            />
            <rpl-button
              v-if="linksType==='button'"
              theme="primary"
              :href="item.url"
            >
              {{ item.text }}
            </rpl-button>
          </li>
        </ul>
      </div>
    </rpl-row>
  </div>
</template>

<script>
import breakpoint from '@dpc-sdp/ripple-global/mixins/breakpoint'
import { RplTextLink } from '@dpc-sdp/ripple-link'
import RplButton from '@dpc-sdp/ripple-button'
import RplIcon from '@dpc-sdp/ripple-icon'
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'

/**
 * Introduction Banner provides supplementary information.
 * It's useful when Hero Banner has background image as it can't have journey links.
 */
export default {
  name: 'RplIntroBanner',
  mixins: [breakpoint],
  props: {
    /**
     * Banner title
     */
    title: String,
    /**
     * Introduction text, appears under title
     */
    introText: String,
    /**
     * Heading for journey links
     */
    linkHeading: String,
    /**
     * Journey links, can be displayed as link or button.
     * An array of links, e.g `[{ text: 'Plan your visit', url: '/page-1' }]`.
     */
    links: Array,
    /**
     * Show journey links
     */
    showLinks: { type: Boolean, default: true },
    /**
     * Type of journey links. The choices are: `link`, `button`.
     */
    linksType: {
      type: String,
      default: 'link'
    },
    /**
     * Display a icon. Value should be a icon symbol. e.g `alert_information`. Icons can be found in https://ripple.sdp.vic.gov.au/?path=/story/atoms-icon--icon-library.
     */
    icon: String
  },
  components: {
    RplTextLink,
    RplButton,
    RplIcon,
    RplRow,
    RplCol
  },
  computed: {
    textLinkSize () {
      return this.$breakpoint.m ? 'large' : 'small'
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-intro-banner-border: 1px solid rpl_color('mid_neutral_1') !default;
  $rpl-intro-banner-left-padding-xl: rem(25px) !default;
  $rpl-intro-banner-title-typography-ruleset: ('mega', 1.2em, 'bold') !default;
  $rpl-intro-banner-title-color: rpl_color('extra_dark_neutral') !default;
  $rpl-intro-banner-description-typography-ruleset: ('s', 1.5em, 'regular') !default;
  $rpl-intro-banner-description-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-intro-banner-link-heading-typography-rules: (
    'xs': ('s', 1.7em, 'bold'),
    'm': ('l', 1.4em, 'bold')
  ) !default;
  $rpl-intro-banner-link-heading-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-intro-banner-link-margin: auto auto $rpl-space-2 !default;
  $rpl-intro-banner-link-heading-margin: 0 auto $rpl-space-4 auto !default;
  $rpl-intro-banner-vertical-spacing: (
    'xs': ('top': ($rpl-space * 19), 'bottom': ($rpl-space * 5)),
    's': ('top': ($rpl-space * 20), 'bottom': ($rpl-space * 8)),
  ) !default;
  $rpl-intro-banner-icon-spacing: 53px;
  $rpl-intro-banner-description-link-color: rpl-color('primary') !default;

  .rpl-intro-banner {
    $root: &;
    @include rpl_mobile_padding;
    position: relative;

    @each $bp, $spacing in $rpl-intro-banner-vertical-spacing {
      @include rpl_breakpoint($bp) {
        padding-top: map-get($spacing, top);
        padding-bottom: map-get($spacing, bottom);
      }
    }
    @include rpl_breakpoint('m') {
      border-bottom: $rpl-intro-banner-border;
    }

    @include rpl_print_margin('l');

    &__left {
      @include rpl_grid_full;
      display: flex;
      flex-direction: column;

      @include rpl_breakpoint('m') {
        flex-direction: row;
      }

      @include rpl_breakpoint('l') {
        @include rpl_grid_column(8);
      }

      #{$root}--no-links & {
        @include rpl_breakpoint('l') {
          @include rpl_grid_column(10);
        }
      }
      @include rpl_breakpoint('xl') {
        padding-right: $rpl-intro-banner-left-padding-xl;
      }
    }

    &__right {
      @include rpl_grid_full;
      z-index: $rpl-zindex-content-top;

      @include rpl_breakpoint('l') {
        @include rpl_grid_column(4);
      }

      @include rpl_print_hidden;
    }

    &__icon {
      flex: 0 0 auto;
      @include rpl_breakpoint('m') {
        width: $rpl-intro-banner-icon-spacing;
      }
    }

    &__title {
      @include rpl_typography_ruleset($rpl-intro-banner-title-typography-ruleset);
      @include rpl_text_color($rpl-intro-banner-title-color);
      margin: 0;
    }

    &__description {
      @include rpl_typography_ruleset($rpl-intro-banner-description-typography-ruleset);
      @include rpl_text_color($rpl-intro-banner-description-text-color);
      margin-top: $rpl-space;
      margin-bottom: $rpl-space;

      @include rpl_breakpoint(s) {
        margin-top: $rpl-space-2;
      }

      @include rpl_breakpoint(l) {
        margin-top: $rpl-space-4;
      }

      ul {
        padding-left: 0;
        margin-left: rem(17px);
      }

      a {
        color: $rpl-intro-banner-description-link-color;
        text-decoration: none;
        &:focus, &:hover {
          text-decoration: underline;
        }
      }
    }

    &__link-heading {
      @include rpl_typography_ruleset($rpl-intro-banner-link-heading-typography-rules);
      @include rpl_text_color($rpl-intro-banner-link-heading-text-color);
      margin: $rpl-intro-banner-link-heading-margin;
    }

    &__link-list {
      margin: 0;
      padding: 0;

      &--link {
        column-count: auto;
      }
    }

    &__link-list-item {
      list-style: none;
      margin: $rpl-intro-banner-link-margin;
    }

    &--icon {
      .rpl-intro-banner__right {
        @include rpl_breakpoint('m') {
          padding-left: $rpl-intro-banner-icon-spacing;
        }

        @include rpl_breakpoint('xl') {
          padding-left: 0;
        }
      }
    }
  }
</style>
