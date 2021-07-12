<template>
  <div class="rpl-link-tiles" v-bind:class="{ 'rpl-link-tiles--grid': gridView, 'rpl-link-tiles--wide': !sidebar}">
    <h2 class="rpl-link-tiles__title">{{title}}</h2>
    <ul class="rpl-link-tiles__list">
      <li v-for="(link, index) in links" :key="index" class="rpl-link-tiles__list-item">
        <rpl-link :href="link.url" :innerWrap="false" class="rpl-link-tiles__link">
          <img v-if="!hideIcons && link.image" :src="link.image" alt="" class="rpl-link-tiles__link-icon"/>
          <span>{{link.text}}</span>
        </rpl-link>
      </li>
    </ul>
    <rpl-link :href="primaryCta.url" class="rpl-link-tiles__primary-cta">{{primaryCta.text}}</rpl-link>
  </div>
</template>

<script>
// Add imports
import RplLink from '@dpc-sdp/ripple-link'

export default {
  name: 'RplLinkTiles',
  components: {
    RplLink
  },
  props: {
    title: String,
    primaryCta: {
      text: String,
      url: String
    },
    links: Array,
    hideIcons: { type: Boolean, default: false },
    gridView: { type: Boolean, default: false },
    sidebar: { type: Boolean, default: false }
  }
}
</script>

<style scoped lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-link-tiles-title-ruleset: (
    'xs': ('l', 1.2em, 'bold'),
    'm': ('xl', 1.2em, 'bold')
  ) !default;
  $rpl-link-tiles-tile-text-ruleset: (
    'xs': ('xs', 1em, 'bold'),
    'm': ('s', 1em, 'bold')
  ) !default;
  $rpl-link-tiles-item-background-color: rpl_color('white') !default;
  $rpl-link-tiles-link-border: 1px solid rpl_color('mid_neutral_2') !default;
  $rpl-link-tiles-link-shadow: 0 2px 8px 0 rgba(0, 0, 0, .08) !default;
  $rpl-link-tiles-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-link-tiles-text-hover-color: rpl_color('primary') !default;
  $rpl-link-tiles-text-focus-outline-color: rpl_color('primary') !default;
  $rpl-link-tiles-primary-cta-border-color: rpl_color('mid_neutral_2') !default;

  .rpl-link-tiles {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: $rpl-space-4;

    @include rpl_breakpoint(m) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    &__list {
      list-style: none;
      padding: 0;
      margin-bottom: $rpl-space-2 * 3;

      @include rpl_breakpoint(m) {
        order: 3;
        flex: 0 0 100%;
        margin-top: $rpl-space-2 * 3;
        margin-bottom: $rpl-space-4;
      }

      &-item {
        display: inline-flex;
        background-color: $rpl-link-tiles-item-background-color;
        margin-right: $rpl-space-2;
        margin-bottom: $rpl-space-2;
      }
    }

    &__title {
      @include rpl_typography_ruleset($rpl-link-tiles-title-ruleset);
      @include rpl_text_color($rpl-link-tiles-text-color);
    }

    &__link {
      display: flex;
      align-items: center;
      border: $rpl-link-tiles-link-border;
      border-radius: $rpl-space;
      padding: $rpl-space-3 $rpl-space-4;
      box-shadow: $rpl-link-tiles-link-shadow;
      text-decoration: none;

      span {
        @include rpl_typography_ruleset($rpl-link-tiles-tile-text-ruleset);
        @include rpl_text_color($rpl-link-tiles-text-color);
      }

      &:hover {
        span {
          @include rpl_text_color($rpl-link-tiles-text-hover-color);
        }
      }

      &:focus {
        outline-color: $rpl-link-tiles-text-focus-outline-color;
      }

      @include rpl_breakpoint(m) {
        padding: $rpl-space-3 ($rpl-space * 5);
      }

      &-icon {
        height: rem(32px);
        width: rem(32px);
        margin-right: $rpl-space-2 * 3;
      }
    }

    &__primary-cta {
      position: relative;
      @include rpl_typography_ruleset($rpl-link-tiles-tile-text-ruleset);
      @include rpl_text_color($rpl-link-tiles-text-color);
      text-decoration: none;

      &:after {
        content: '';
        position: absolute;
        height: 2px;
        width: 100%;
        left: 0;
        bottom: -$rpl-space;
        background-color: $rpl-link-tiles-primary-cta-border-color;
      }

      &:hover {
        @include rpl_text_color($rpl-link-tiles-text-hover-color);
      }
    }

    &.rpl-link-tiles--grid {
      // Grid view
      .rpl-link-tiles__list-item {
        width: 100%;
        margin-right: 0;

        @include rpl_breakpoint(m) {
          width: calc(50% - #{$rpl-space-2 * 3});
          margin-right: ($rpl-space-2 * 3);
          margin-bottom: ($rpl-space-2 * 3);
        }
      }

      .rpl-link-tiles__link {
        width: 100%;
        padding: $rpl-space-4 $rpl-space * 5;

        @include rpl_breakpoint(m) {
          padding: ($rpl-space * 7) ($rpl-space-2 * 2);
        }
      }

      &.rpl-link-tiles--wide {
        .rpl-link-tiles__list-item {
          @include rpl_breakpoint(xl) {
            width: calc(33% - #{$rpl-space-2 * 3});
          }
        }
      }
    }
  }
</style>
