<template>
  <ul class="rpl-footer-nav">
    <template v-for="(item, index) in nav">
      <li class="rpl-footer-nav__menu-item" :class="{'rpl-footer-nav__menu-item--parent': item.children}" :key="index" >
        <h2 class="rpl-footer-nav__heading" @click="toggle(item, index, $event)">
          <rpl-link :href="item.url" :target="item.target">{{ item.text }}</rpl-link>
          <rpl-icon :symbol="visibleItemIndex == index ? 'up' : 'down'" color="secondary" size="m" v-if="(minimize && item.children)" />
        </h2>
        <transition name="rpl-accordion">
          <ul class="rpl-footer-nav__submenu-item" v-if="item.children" v-show="(!minimize || visibleItemIndex == index)">
            <li v-for="(child, cIndex) in item.children" :key="cIndex">
              <rpl-link :href="child.url" :target="child.target">{{ child.text }}</rpl-link>
            </li>
          </ul>
        </transition>
      </li>
    </template>
  </ul>
</template>

<script>
import { isClient } from '@dpc-sdp/ripple-global/utils/helpers.js'
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
    nav: Array
  },
  data () {
    return {
      visibleItemIndex: null,
      msnry: null
    }
  },
  computed: {
    minimize () {
      let minimize = true
      if (isClient()) {
        minimize = this.$breakpoint.l === false
      }
      return minimize
    }
  },
  watch: {
    minimize (val) {
      if (val === true) {
        if (this.msnry !== null) {
          this.msnry.destroy()
          this.msnry = null
        }
      } else {
        if (this.msnry === null) {
          this.msnryInit()
        }
      }
    }
  },
  methods: {
    toggle (item, index, event) {
      if (this.minimize && item.children) {
        if (event) event.preventDefault()
        if (this.visibleItemIndex !== index) {
          this.visibleItemIndex = index
        } else {
          this.visibleItemIndex = null
        }
      }
    },
    msnryInit: async function () {
      // For more about dynamic import check below article.
      // https://developers.google.com/web/updates/2017/11/dynamic-import
      if (!this.msnry) {
        const Masonry = await import('masonry-layout').then(module => module.default ? module.default : module)
        this.msnry = new Masonry('.rpl-footer-nav', {
          itemSelector: '.rpl-footer-nav__menu-item',
          gutter: 24,
          transitionDuration: 0
        })
      }
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

.rpl-footer-nav {
  padding: 0;
}

.rpl-footer-nav__menu-item {
  width: 100%;

  @include rpl_breakpoint(l) {
    display: inline-block;
    width: calc(33.33% - 16px);
  }
}
</style>
