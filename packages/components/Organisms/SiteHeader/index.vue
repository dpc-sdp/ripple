<template>
  <transition name="rpl-header-fade">
    <Trap :disabled="!menuContentOpen">
    <div v-show="headerVisible"
      class="rpl-site-header"
      :class="{
        'rpl-site-header--open': menuContentOpen,
        'rpl-site-header--sticky': stickyActive,
      }"
    >
      <div class="rpl-site-header__inner">
        <!-- Top Bar -->
        <div class="rpl-site-header__top">
          <div class="rpl-site-header__logo-container">
            <div class="rpl-site-header__logo-container-inner">
              <!-- Menu Button -->
              <button
                v-if="showMenuBtn()"
                class="rpl-site-header__btn rpl-site-header__btn--menu"
                :class="{'rpl-site-header__btn--menu-open' : (menuState === 'opened')}"
                :aria-expanded="(menuState === 'opened').toString()"
                @click="menuToggle()"
              >
                <rpl-icon :symbol="menuButton[menuState].icon" color="white"></rpl-icon>
                <span>{{ menuButton[menuState].text }}</span>
              </button>
              <div v-if="showMenuBtn()" class="rpl-site-header__divider rpl-site-header__divider--vic" :class="dividerStateClass"></div>
              <!-- Primary vic.gov.au Logo -->
              <div v-if="vicLogoVisible" class="rpl-site-header__title rpl-site-header__logo-container--vic-logo-primary" :class = "{'rpl-site-header__logo-container--vic-logo-primary--cobrand' : (logo)}"> <!--Only apply vic-logo cobrand class if there is a coBrand logo-->
                <rpl-link :href="vicLogoPrimary.url">
                  <img :src="vicLogoPrimary.image" :alt="vicLogoPrimary.alt" />
                </rpl-link>
              </div>
              <div class="rpl-site-header__divider rpl-site-header__divider--cobrand" :class="dividerStateClass"></div>
              <!--Co brand logo if it exists-->
              <div v-if="cobrandVisible" class="rpl-site-header__title"> <!--Render element if taxonomy includes a cobrand logo-->
                <rpl-link :href="logo.url">
                  <img :src="logo.image" :alt="logo.alt" />
                </rpl-link>
              </div>
            </div>
          </div>
          <!-- Top Menu -->
          <div
            v-if="(searchState === 'closed') && ((menuContentOpen && (menuState === 'opened')) || menuLayout === 'horizontal')"
            class="rpl-site-header__menu-container"
            :class="{
              'rpl-site-header__menu-container--horizontal': (menuLayout === 'horizontal'),
              'rpl-site-header__menu-container--vertical': (menuLayout === 'vertical')
            }"
          >
            <div class="rpl-site-header__menu">
              <rpl-menu
                :menu="links"
                :layout="menuLayout"
                title="Main Menu"
                :open="(menuState === 'opened')"
                @rootMenuClicked="rootMenuClicked"
              />
            </div>
          </div>
          <div class="rpl-site-header__btn-container">
            <!-- Logout button -->
            <button
              v-if="showLogout"
              class="rpl-site-header__btn rpl-site-header__btn--logout"
              :class="{'rpl-site-header__btn--logout-open' : (menuState === 'opened')}"
              @click="logoutFunc()">
                <span>{{ logoutButton.text }}</span>
                <rpl-icon :symbol="logoutButton.icon" color="white" />
            </button>
            <!-- Search Button -->
            <button
              v-if="showSearch"
              @click="searchToggle()"
              class="rpl-site-header__btn rpl-site-header__btn--search"
              :class="{'rpl-site-header__btn--search-open' : (searchState === 'opened')}"
              :aria-expanded="(searchState === 'opened').toString()"
            >
              <span>{{ searchButton[searchState].text }}</span>
              <rpl-icon :symbol="searchButton[searchState].icon" color="white" />
            </button>
          </div>
        </div>
        <!-- Search Content -->
        <div v-if="menuContentOpen && searchState == 'opened'" class="rpl-site-header__search-container">
            <rpl-search :terms="searchTerms" @search="searchFunc" />
        </div>
      </div>
    </div>
    </Trap>
  </transition>
</template>

<script>
import { isClient, isIPadPro } from '@dpc-sdp/ripple-global/utils/helpers.js'
import RplMenu from './menu'
import RplSearch from './search'
import RplIcon from '@dpc-sdp/ripple-icon'
import RplLink from '@dpc-sdp/ripple-link'
import Trap from 'vue-focus-lock'
import vicLogoPrimary from '@dpc-sdp/ripple-global/assets/images/logo-primary.png'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import RplSiteHeaderEventBus from './RplSiteHeaderEventBus'

export default {
  name: 'RplSiteHeader',
  props: {
    logo: Object,
    links: Array,
    breakpoint: Number,
    searchTerms: Array,
    sticky: Boolean,
    hideOnScroll: { default: true, type: Boolean },
    showSearch: { default: false, type: Boolean },
    showLogout: { default: false, type: Boolean }
  },
  components: {
    Trap,
    RplIcon,
    RplLink,
    RplMenu,
    RplSearch
  },
  data: function () {
    return {
      vicLogoPrimary: {
        image: vicLogoPrimary,
        alt: 'vic_logo',
        url: '/'
      },
      menuEl: null,
      menuContentOpen: false,
      searchState: 'closed',
      menuState: 'closed',
      lastRootMenuClicked: -1,
      headerVisible: true,
      lastScrollTop: 0,
      stickyActive: false,
      offsetTop: 0,
      menuWideEnabled: null,
      menuLayout: 'vertical',
      menuButton: {
        opened: {
          text: 'Close menu',
          icon: 'close'
        },
        closed: {
          text: 'Menu',
          icon: 'hamburger'
        }
      },
      searchButton: {
        opened: {
          text: 'Close search',
          icon: 'close'
        },
        closed: {
          text: 'Search',
          icon: 'search'
        }
      },
      logoutButton: {
        text: 'Logout',
        icon: 'link'
      }
    }
  },
  watch: {
    // Close menu after vue route changed.
    $route: function (to, from) {
      if (this.menuContentOpen) {
        // Remove focus on any links - this fixes a bug in IE11 [SDPA-1178].
        document.activeElement.blur()

        // Close the menu / search.
        if (this.menuState === 'opened') {
          this.menuToggle()
        } else if (this.searchState === 'opened') {
          this.searchToggle()
        }
      }
    },
    menuContentOpen: function (to, from) {
      this.$emit('open', to)
      RplSiteHeaderEventBus.$emit('open', to)
      this.toggleBodyScroll()
    }
  },
  methods: {
    searchToggle: function () {
      this.menuContentOpen = !(this.menuContentOpen && this.searchState === 'opened')
      this.searchState = this.menuContentOpen ? 'opened' : 'closed'
      this.menuState = 'closed'
    },
    menuToggle: function () {
      this.menuContentOpen = !(this.menuContentOpen && this.menuState === 'opened')
      this.searchState = 'closed'
      this.menuState = this.menuContentOpen ? 'opened' : 'closed'
    },
    showMenuBtn: function () {
      const menuLinkCount = (Array.isArray(this.links) && this.links.length > 0)
      if (this.menuState === 'opened' && this.searchState !== 'opened' && menuLinkCount) {
        return true
      } else if (this.menuLayout === 'vertical' && this.searchState !== 'opened') {
        return true
      }
      return false
    },
    toggleBodyScroll () {
      if (this.menuContentOpen) {
        this.$nextTick(function () {
          this.menuEl = document.querySelector('.rpl-site-header__menu-container')
          if (this.menuEl) {
            disableBodyScroll(this.menuEl)
          }
        })
      } else {
        clearAllBodyScrollLocks()
      }
    },
    windowResize: function (e) {
      var w = window.innerWidth || document.documentElement.clientWidth
      if (!isIPadPro() && w >= this.breakpoint && (this.menuWideEnabled || this.menuWideEnabled === null)) {
        // Desktop.
        this.menuWideEnabled = false
        this.menuLayout = 'horizontal'
        // Close menu on vertical -> horizontal: avoids incorrect display if vertical is on root.
        if (this.menuState === 'opened' && this.menuContentOpen) {
          this.menuState = 'closed'
          this.menuContentOpen = false
        }
      } else if (w < this.breakpoint && (!this.menuWideEnabled || this.menuWideEnabled === null)) {
        // Mobile.
        this.menuWideEnabled = true
        this.menuLayout = 'vertical'
      }
    },
    rootMenuClicked: function (rootMenuIndex) {
      this.menuContentOpen = !(this.menuContentOpen && this.lastRootMenuClicked === rootMenuIndex)
      this.menuState = this.menuContentOpen ? 'opened' : 'closed'
      this.lastRootMenuClicked = rootMenuIndex
    },
    searchFunc: function (value) {
      this.$emit('search', value)
    },
    logoutFunc: function () {
      this.$emit('logout')
    },
    scroll: function () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop

      if (this.stickyActive === false && scrollTop > this.$el.offsetTop) {
        // reserve the offsetTop
        this.offsetTop = this.$el.offsetTop
        // When scroll header to top, make header sticky
        this.stickyActive = true
      } else if (this.stickyActive === true && scrollTop > this.offsetTop) {
        this.stickyActive = true
      } else {
        this.stickyActive = false
      }

      if (scrollTop > this.lastScrollTop && this.stickyActive) {
        // scroll down and is sticky
        this.headerVisible = false
      } else {
        // scroll up or is not sticky
        this.headerVisible = true
      }
      this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
    }
  },
  computed: {
    vicLogoVisible () {
      return (!this.menuContentOpen && this.rplOptions.viclogo)
    },
    cobrandVisible () {
      return (!this.menuContentOpen && this.logo)
    },
    dividerStateClass () {
      const hasMenu = this.showMenuBtn() ? `1` : `0`
      const hasVic = this.vicLogoVisible ? `1` : `0`
      const hasCobrand = this.cobrandVisible ? `1` : `0`
      return `rpl-site-header__divider--${hasMenu}${hasVic}${hasCobrand}`
    }
  },
  mounted: function () {
    if (isClient()) {
      window.addEventListener('resize', this.windowResize)
      this.windowResize()
      if (this.hideOnScroll) {
        window.addEventListener('scroll', this.scroll)
      }
    }
  },
  beforeDestroy: function () {
    if (isClient()) {
      window.removeEventListener('resize', this.windowResize)
      clearAllBodyScrollLocks()
      if (this.hideOnScroll) {
        window.removeEventListener('scroll', this.scroll)
      }
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  @import "scss/site_header";

  $rpl-site-header-logo-width: auto !default;
  $rpl-site-header-logo-primary-width: rem(98px);
  $rpl-site-header-text-color: rpl-color('white') !default;
  $rpl-site-header-border-radius: rem(4px) !default;
  $rpl-site-header-background-color: rpl-color('primary') !default;
  $rpl-site-header-background-color-open: rpl-color('dark_primary') !default;
  $rpl-site-header-top-padding: ($rpl-space * 6) ($rpl-space * 5) !default;
  $rpl-site-header-menu-toggle-border-right: 1px solid rpl-color('white') !default;
  $rpl-site-header-menu-toggle-border-spacing: $rpl-space-2 !default;
  $rpl-site-header-menu-toggle-icon-margin: auto $rpl-space-2 auto 0 !default;
  $rpl-site-header-search-toggle-icon-margin: auto 0 auto $rpl-space-2 !default;
  $rpl-site-header-logout-btn-background-color: rpl-color('dark_primary') !default;
  $rpl-site-header-logout-btn-background-color-mobile: darken($rpl-site-header-logout-btn-background-color, 10%) !default;
  $rpl-site-header-logout-btn-padding-mobile: rem(8px) rem(10px) !default;
  $rpl-site-header-logout-btn-padding: rem(10px) !default;
  $rpl-site-header-logout-btn-margin: $rpl-space-4 !default;
  $rpl-site-header-logout-btn-icon-margin: 0 0 0 $rpl-space-2 !default;
  $rpl-site-header-menu-divider-border-right: $rpl-site-header-menu-toggle-border-right !default;
  $rpl-site-header-menu-divider-margin-xl: 0 $rpl-space-2 !default;
  $rpl-site-header-menu-divider-margin-l: 0 $rpl-space-4 !default;
  $rpl-site-header-menu-divider-height-xl: rem(14px) !default;
  $rpl-site-header-menu-divider-height-l: rem(27px) !default;

  .rpl-site-header {
    $root: &;
    position: absolute;
    z-index: $rpl-zindex-header;
    padding: $rpl-header-horizontal-padding-xs;
    box-sizing: border-box;
    width: 100%;

    @include rpl_print_hidden;

    @include rpl_breakpoint('s') {
      padding: $rpl-header-horizontal-padding-s;
    }

    &__inner {
      overflow: hidden;
      background-color: $rpl-site-header-background-color;
      border-radius: $rpl-site-header-border-radius;
      transition: height .25s;
      height: $rpl-site-header-top-height-s;
      @include rpl_breakpoint('m') {
        height: $rpl-site-header-top-height-l;
      }
    }

    &--sticky:not(#{$root}--open) {
      position: fixed;
      top: 0;
    }

    &--open {
      position: fixed;
      top: 0;
      height: 100%;

      #{$root}__inner {
        margin: 0;
        border-radius: rem(4px);
        background-color: $rpl-site-header-background-color-open;
        height: 100%;
      }
    }

    &__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: $rpl-site-header-top-padding;
      border-radius: $rpl-site-header-border-radius;
      height: $rpl-site-header-top-height-s;
      @include rpl_breakpoint('m') {
        height: $rpl-site-header-top-height-l;
      }

      &__title {
        font-size: rpl-font-size(l);
      }
    }

    &__divider {
      $divider_root: &;
      height: $rpl-site-header-menu-divider-height-xl;
      margin: $rpl-site-header-menu-divider-margin-xl;
      border-right: $rpl-site-header-menu-divider-border-right;

      @include rpl_breakpoint('l') {
        margin: $rpl-site-header-menu-divider-margin-l;
        height: $rpl-site-header-menu-divider-height-l;
      }

      &--vic {
        display: none;

        &#{$divider_root}--110 {
          display: block;
        }

        &#{$divider_root}--111 {
          @include rpl_breakpoint('m') {
            display: block;
          }
        }
      }

      &--cobrand {
        display: none;

        &#{$divider_root}--011 {
          @include rpl_breakpoint('m') {
            display: block;
          }
        }

        &#{$divider_root}--101 {
          display: block;
        }

        &#{$divider_root}--111 {
          display: block;
        }
      }
    }

    &__logo-container {
      &-inner {
        display: flex;
        align-items: center;
      }

      .rpl-link {
        display: flex;
        flex-flow: column;
        @include rpl_focus_dark;
      }

      img {
        width: $rpl-site-header-logo-width;
        display: block;
      }

      &--vic-logo-primary {
        display: block; //always show vic.gov logo if no cobrand logo

        img {
          width: $rpl-site-header-logo-primary-width;
        }

        &--cobrand {
          display: none;

          @include rpl_breakpoint('m') {
            display: block;
          }
        }
      }
    }

    // Menu Container - changes for vert / horizontal
    &__menu-container {
      &--vertical {
        width: auto;
        position: absolute;
        bottom: $rpl-header-horizontal-padding-xs;
        left: $rpl-header-horizontal-padding-xs;
        right: $rpl-header-horizontal-padding-xs;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: auto;
        top: $rpl-site-header-top-height-s;

        @include rpl_breakpoint('m') {
          top: $rpl-site-header-top-height-m;
        }

        @include rpl_breakpoint('s') {
          left: $rpl-header-horizontal-padding-s;
          right: $rpl-header-horizontal-padding-s;
        }
      }

      &--horizontal {
        flex: 1;
      }
    }

    &__search-container {
        position: relative;
        background-color: $rpl-site-header-background-color-open;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        top: 0;
        height: calc(100vh - #{$rpl-site-header-top-height-s});
        @include rpl_breakpoint('l') {
          height: calc(100vh - #{$rpl-site-header-top-height-l});
        }
    }

    &__btn-container {
      display: flex;
    }

    &__btn {
      background-color: transparent;
      border: 0;
      padding: 0;
      display: flex;
      align-items: center;
      cursor: pointer;
      @include rpl_focus_dark;

      &--menu {
        span {
          padding-left: $rpl-site-header-menu-toggle-border-spacing;
          display: none;
          @include rpl_breakpoint('s') {
            display: block;
          }
        }
      }

      &--menu-open {
        border-right: 0;
        display: flex;
      }

      &--search {
        span {
          @include rpl_breakpoint_down('m') {
            @include rpl_visually_hidden;
          }
          @include rpl_breakpoint('m') {
            margin-right: $rpl-space;
            display: block;
          }
          @include rpl_breakpoint_between('l', 'xl') {
            @include rpl_visually_hidden;
          }
          @include rpl_breakpoint('xl') {
            display: block;
          }
        }

        .rpl-icon {
          margin: $rpl-site-header-search-toggle-icon-margin;
        }
      }

      &--search-open {
        span {
          display: flex;
        }
      }

      &--logout {
        border-radius: $rpl-button-border-radius;
        background-color: $rpl-site-header-logout-btn-background-color-mobile;
        display: none;
        margin-right: $rpl-site-header-logout-btn-margin;
        padding: $rpl-site-header-logout-btn-padding-mobile;

        &-open {
          display: inline-block;
        }

        @include rpl_breakpoint('m') {
          background-color: $rpl-site-header-logout-btn-background-color;
          display: inline-block;
          padding: $rpl-site-header-logout-btn-padding;
        }
        .rpl-icon {
          margin: $rpl-site-header-logout-btn-icon-margin;
        }
      }

      span {
        @include rpl_typography_font('xs', 1em, 'medium');
        color: $rpl-site-header-text-color;
      }

      .rpl-icon {
        display: inline;
      }
    }
  }
</style>
