<template>
  <li v-if="links" class="rpl-footer-nav__menu-item rpl-footer-nav__menu-item--parent">
    <h2 class="rpl-footer-nav__heading" @click="toggle(links, navIndex, $event)">
      {{ links.title }}
      <rpl-icon :symbol="visibleItemIndex == navIndex ? 'up' : 'down'" color="white" size="m" v-if="(minimize && links.children)" />
    </h2>
    <transition name="rpl-accordion">
      <ul class="rpl-footer-nav__submenu-item rpl-footer-nav__submenu-item--socials" v-if="links.children" v-show="(!minimize || visibleItemIndex == navIndex)">
        <li v-for="(socialLink, sIndex) in links.children" :key="sIndex">
          <rpl-link :href="socialLink.uri" :innerWrap=false>
            <rpl-icon :symbol="socialLink.icon" color="white" size="m" v-if="(socialLink.icon)" />
            <span class="rpl-link__inner">
              {{ socialLink.title }}
            </span>
          </rpl-link>
        </li>
      </ul>
    </transition>
  </li>
</template>

<script>
import RplLink from '@dpc-sdp/ripple-link'
import RplIcon from '@dpc-sdp/ripple-icon'
import breakpoint from '@dpc-sdp/ripple-global/mixins/breakpoint'

export default {
  mixins: [breakpoint],
  components: {
    RplIcon,
    RplLink
  },
  props: {
    links: Object,
    navIndex: Number,
    visibleItemIndex: Number,
    minimize: Boolean,
    toggle: Function
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

.rpl-footer-nav__submenu-item {
  /*
    This looks weird, but it's just doubling up the selector
    because the styles for this mollecule get loaded before
    the main footer styles and have reduced specificity.
  */
  &--socials#{&} {
    > li {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      position: relative;

      .rpl-link {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
      }

      svg {
        position: absolute;
      }

      .rpl-link__inner {
        margin-left: $rpl-space-2;
        padding-left: $rpl-space-4;
      }
    }
  }
}
</style>
