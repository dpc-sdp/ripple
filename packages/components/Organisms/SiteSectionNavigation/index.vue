<template>
  <div class="rpl-site-section-navigation">
    <h2 v-if="title" class="rpl-site-section-navigation__title">{{ title }}</h2>
    <rpl-section-menu :menu="processedMenu" :open="true" :depth="0" />
  </div>
</template>

<script>
import parentlinks from '@dpc-sdp/ripple-global/mixins/parentlinks'
import activepath from '@dpc-sdp/ripple-global/mixins/activepath'
import RplSectionMenu from './menu'

export default {
  name: 'RplSiteSectionNavigation',
  mixins: [parentlinks, activepath],
  props: {
    title: String,
    menu: Array,
    activeLink: { type: String, default: null }
  },
  components: {
    RplSectionMenu
  },
  computed: {
    processedMenu: function () {
      let pMenu = this.generateParentLinks(this.menu)
      if (this.activeLink !== null) {
        this.setActivePaths(pMenu, this.activeLink)
      }
      return pMenu
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-section-menu-background-color: rpl_color('dark_primary') !default;
  $rpl-section-menu-padding: ($rpl-space * 6) 0 !default;
  $rpl-section-menu-border-radius: rem(4px) !default;
  $rpl-section-menu-title-ruleset: ('l', 1.2em, 'bold') !default;
  $rpl-section-menu-title-color: rpl_color('white') !default;
  $rpl-section-menu-title-padding: 0 ($rpl-space * 8) !default;
  $rpl-section-menu-title-margin: 0 0 $rpl-space-2 !default;

  .rpl-site-section-navigation {
    background-color: $rpl-section-menu-background-color;
    padding: $rpl-section-menu-padding;
    border-radius: $rpl-section-menu-border-radius;
    box-sizing: border-box;

    @include rpl_print_hidden;

    &__title {
      @include rpl_typography_ruleset($rpl-section-menu-title-ruleset);
      color: $rpl-section-menu-title-color;
      padding: $rpl-section-menu-title-padding;
      margin: $rpl-section-menu-title-margin;
    }
  }
</style>
