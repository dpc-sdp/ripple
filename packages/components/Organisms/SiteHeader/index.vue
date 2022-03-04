<template>
  <transition name="rpl-header-fade">
    <Trap :disabled="!menuContentOpen">
    <div v-show="headerVisible"
      class="rpl-site-header"
      :class="{
        'rpl-site-header--open': menuContentOpen,
        'rpl-site-header--sticky': stickyActive,
      }"
      @keydown.esc="closeModalMenu()"
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
                aria-label="Menu"
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
          <div id="search-container" class="rpl-site-header__btn-container">
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
    /**
     *  An object that describes the logo. It contains `{ alt: string, url: string, image: string }`,
     *  where:
     *
     *  - `alt` is the alt text
     *  - `url` is the navigation link when the logo is clicked
     *  - `image` is the image source
     */
    logo: Object,
    /**
     * An array of LinkDescription objects:
     *
     * ```
     * {
     *   url: string,
     *   text: string,
     *   target?: string,
     *   children: LinkDescription[]
     * }
     * ```
     *
     * - `url` is the link
     * - `text` is the display text,
     * - `target` is used for the `target` attribute
     * - `children` describes any submenus in the same format
     */
    links: Array,
    breakpoint: Number,
    searchTerms: Array,
    /**
     * Whether to keep the header at the top on scroll
     */
    sticky: Boolean,
    /**
     * Whether to hide the header on scroll
     */
    hideOnScroll: { default: true, type: Boolean },
    /**
     * Whether to show a search button that opens the search widget
     */
    showSearch: { default: false, type: Boolean },
    /**
     * Whether to show the logout button. Note: this button is part of the authenticated content module, which is now deprecated
     */
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
    closeModalMenu: function () {
      if (this.menuContentOpen & this.menuState === 'opened') {
        this.menuContentOpen = false
        this.menuState = 'closed'
      }
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
  @import "index.scss"
</style>
