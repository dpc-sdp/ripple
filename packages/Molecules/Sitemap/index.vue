<template>
  <div class="rpl-sitemap-menu">
    <h1 class="rpl-sitemap-header">Site Map</h1>
    <rpl-sitemap-menu :menu="menu"></rpl-sitemap-menu>
  </div>
</template>

<script>
import RplSitemapMenu from './SitemapMenu.vue'

export default {
  name: 'RplSitemap',
  props: {
    menu: Array
  },
  components: {
    RplSitemapMenu
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-sitemap-header-ruleset: ('tera' , 3.75rem, 'bold') !default;
  $rpl-sitemap-header-ruleset-xs: ('mega', 2rem, 'bold') !default;
  $rpl-sitemap-header-text-color: rpl-color('primary') !default;
  $rpl-sitemap-menu-list-item-margin: $rpl-space-3 0 !default;
  $rpl-sitemap-menu-list-padding: 0 0 0 ($rpl-space * 9) !default;
  $rpl-sitemap-menu-list-item-border: 1px solid rpl-color('mid_neutral_2') !default;
  $rpl-sitemap-menu-list-item-border-spacing: $rpl-space-3 !default;
  $rpl-sitemap-menu-before-background: rpl-gradient('decorative_gradient_180') !default;
  $rpl-sitemap-menu-list-item-level-0-ruleset: ('l', 1.5rem, 'bold') !default;
  $rpl-sitemap-menu-list-item-level-1-ruleset: ('s', 1.5em, 'bold') !default;
  $rpl-sitemap-menu-list-item-level-2-ruleset: ('s', 1.5em, 'medium') !default;
  $rpl-sitemap-menu-list-item-ruleset: ('s', 1.5em, 'regular') !default;
  $rpl-sitemap-menu-link-color: rpl-color('extra_dark_neutral') !default;

  .rpl-sitemap-header {
    @include rpl_text_color($rpl-sitemap-header-text-color);
    @include rpl-typography_ruleset($rpl-sitemap-header-ruleset-xs);
    margin: 0;

    @include rpl-breakpoint('s') {
      @include rpl-typography_ruleset($rpl-sitemap-header-ruleset);
    }

    &::after {
      content: '';
      display: inline-block;
      height: rem(8px);
      width: 100%;
      background: $rpl-sitemap-menu-before-background;
    }
  }

  .rpl-sitemap-menu {
    $root: &;

    &__list {
      list-style: none;
      margin: 0;
      padding: $rpl-sitemap-menu-list-padding;

      &--depth-0 {
        padding-left: 0;
      }

      &--depth-1 {
        padding-left: 0;

        & > #{$root}__list-item {
          border-bottom: $rpl-sitemap-menu-list-item-border;
          padding-bottom: $rpl-sitemap-menu-list-item-border-spacing;
        }
      }

      .rpl-link {
        @include rpl_text_color($rpl-sitemap-menu-link-color);
      }
    }

    &__link {
      @include rpl_typography_ruleset($rpl-sitemap-menu-list-item-ruleset);

      &--depth-0 {
        @include rpl_typography_ruleset($rpl-sitemap-menu-list-item-level-0-ruleset);
      }

      &--depth-1 {
        @include rpl_typography_ruleset($rpl-sitemap-menu-list-item-level-1-ruleset);
      }

      &--depth-2 {
        @include rpl_typography_ruleset($rpl-sitemap-menu-list-item-level-2-ruleset);
      }
    }

    &__list-item {
      margin: $rpl-sitemap-menu-list-item-margin;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
