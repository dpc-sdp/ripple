<template>
  <div
    class="rpl-menu"
    :class="{
      'rpl-menu--open' : open,
      'rpl-menu--root': isRoot,
      'rpl-menu--vertical' : (isRoot && isVerticalLayout),
      'rpl-menu--horizontal' : (isRoot && !isVerticalLayout),
      'rpl-menu--horizontal-floating-wrapper' : (!isVerticalLayout && depth === 1),
      'rpl-menu--subs' : (!isVerticalLayout && depth > 1)
    }"
    :data-depth="depth"
    :data-vpos="rootVerticalDepth"
    :data-visibledepth="((isRoot && shared) ? shared.visibleDepth : false)"
  >
    <div class="rpl-menu__inner">
      <div class="rpl-menu__inner_root">
        <rpl-quick-exit class="rpl-menu__quickexit"  v-if="rplOptions.quickexit && open && ((!isVerticalLayout && depth === 1) || isVerticalLayout)" />
        <div class="rpl-menu__column">
          <div class="rpl-menu__header">
            <!-- Back button -->
            <button
              v-if="!isRoot && isVerticalLayout"
              class="rpl-menu__back"
              @click="verticalGoBack"
              @focus="onItemFocus"
            >
              <rpl-icon symbol="left" color="white" />
              <span class="rpl-visually-hidden">Close {{ title }} and return to </span><span>{{ backTitle }}</span>
            </button>

            <!-- Menu heading -->
            <rpl-link
              v-if="showMenuHeading && parent"
              class="rpl-menu__heading"
              :class="{ 'rpl-menu__heading--horizontal-sub' : (!isVerticalLayout && depth > 1) }"
              :href="parent.url"
              :target="parent.target"
              :innerWrap="false">
                {{ parent.text }}
            </rpl-link>
          </div>

          <ul class="rpl-menu__items" :class="{ 'rpl-menu__items--root': isRoot }">
            <!-- Home button -->
            <li
              v-if="isRoot && isVerticalLayout"
              class="rpl-menu__item"
            >
              <rpl-link
                class="rpl-menu__item-link  rpl-menu__item-link--home"
                href="/"
                :innerWrap="false"
              >
                <span><rpl-icon symbol="menu_home" color="white" /></span>Home
              </rpl-link>
            </li>

            <!-- Parent link -->
            <li
              v-if="showParentLink"
              class="rpl-menu__item"
            >
              <rpl-link
                class="rpl-menu__item-link  rpl-menu__item-link--parent"
                :href="parent.url"
                :target="parent.target"
                :innerWrap="false"
              >
                {{ parent.text }}
              </rpl-link>
            </li>

            <!-- Menu items -->
            <li
              v-for="(list, index) in menu"
              :key="index"
              :class="{
                'rpl-menu__item--active': menuItemOpen[index],
                'rpl-menu__item--before-active': menuItemOpen[index + 1],
                'rpl-menu__item--after-active': menuItemOpen[index - 1],
              }"
              class="rpl-menu__item"
            >
              <!--
                If there are no children, or we have reached the menu depth of 3
                display menu item as a link.
              -->
              <rpl-link
                v-if="!list.children || (depth && depth == 3)"
                class="rpl-menu__item-link"
                :href="list.url"
                :target="list.target"
                @focus="onItemFocus"
                :innerWrap="false"
                ref="menu-link"
              >
                {{ list.text }}
              </rpl-link>
              <!--
                Else display menu item as a button.
              -->
              <button
                v-else
                class="rpl-menu__item-link"
                :class="{'rpl-menu__item-link--active': menuItemOpen[index]}"
                @click="menuLinkClick(index)"
                @focus="onItemFocus"
                :aria-expanded="menuItemOpen[index].toString()"
                :aria-controls="menuId(index)"
                ref="menu-link"
              >
                <span>{{ list.text }}</span>
                <rpl-icon :symbol="menuParentIcon(index)" color="white" />
              </button>

              <!--
                Show a menu for any children of the open menu, unless we have
                reached the max depth of 3.
              -->
              <rpl-menu
                v-if="list.children && (!depth || depth < 3)"
                :id="menuId(index)"
                :rootId="menuId(index)"
                :menu="list.children"
                :depth="depth ? depth + 1 : 1"
                :open="menuItemOpen[index]"
                :layout="layout"
                :title="list.text"
                :backTitle="title"
                :sharedControl="shared"
                :parent="list"
                @focused="onInnerItemFocus(index, $event)"
                @menuchange="onInnerMenuChange"
                @back="onInnerMenuBack"
              ></rpl-menu>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { focus } from 'vue-focus'

import RplIcon from '@dpc-sdp/ripple-icon'
import RplLink from '@dpc-sdp/ripple-link'
import RplQuickExit from '@dpc-sdp/ripple-layout/QuickExit.vue'

export default {
  name: 'RplMenu',
  props: {
    menu: Array,
    depth: Number,
    layout: String,
    open: Boolean,
    title: String,
    backTitle: String,
    sharedControl: Object,
    parent: Object,
    rootId: String
  },
  directives: {
    focus
  },
  components: {
    RplIcon,
    RplLink,
    RplQuickExit
  },
  data: function () {
    return {
      menuItemOpen: this.prepareOpenStates(),
      isRoot: (this.depth === undefined),
      isVerticalLayout: (this.layout === 'vertical'),
      rootVerticalDepth: 0,
      shared: (this.sharedControl) ? this.sharedControl : {
        visibleDepth: 0
      }
    }
  },
  methods: {
    prepareOpenStates: function () {
      let menuItemOpen = {}
      this.menu.forEach((item, index) => {
        menuItemOpen[index] = false
      })
      return menuItemOpen
    },
    menuLinkClick: function (index) {
      if (this.isVerticalLayout) {
        this.menuEl = document.querySelector('.rpl-menu__inner')
        this.menuEl.scrollIntoView()
      }
      this.closeAllItems()
      this.menuItemOpen[index] = true
      if (this.isRoot) {
        this.onInnerMenuChange(1)
        this.shared.visibleDepth = 1
        if (!this.isVerticalLayout) {
          this.$emit('rootMenuClicked', index)
        }
      } else {
        this.shared.visibleDepth = this.depth + 1
        this.$emit('menuchange', this.depth + 1)
      }
    },
    onInnerMenuChange: function (newDepth) {
      if (!this.isRoot) {
        this.$emit('menuchange', newDepth)
      } else {
        this.rootVerticalDepth = newDepth
      }
    },
    onItemFocus: function () {
      if (this.isRoot) {
        this.rootVerticalDepth = 0
        this.$emit('focused')
      } else {
        this.$emit('focused', this.depth)
      }
    },
    onInnerItemFocus: function (index, depth) {
      this.closeAllItems()
      this.menuItemOpen[index] = true
      if (this.isRoot) {
        this.rootVerticalDepth = depth
      }
      this.$emit('focused', depth)
    },
    verticalGoBack: function () {
      this.$emit('back', this.depth)
    },
    onInnerMenuBack: function (startedAtDepth) {
      if (!this.isRoot) {
        // Close menu if immediate parent.
        if (startedAtDepth === (this.depth + 1)) {
          this.shared.visibleDepth = this.depth
          setTimeout(() => { this.closeAllItems() }, 500)
        }
        this.$emit('back', startedAtDepth)
      } else {
        this.rootVerticalDepth--
        if (this.rootVerticalDepth === 0) {
          this.shared.visibleDepth = 0
          setTimeout(() => { this.closeAllItems() }, 500)
        }
      }
    },
    closeAllItems: function () {
      for (let key in this.menuItemOpen) {
        this.menuItemOpen[key] = false
      }
    },
    menuParentIcon: function (index) {
      if (this.isRoot && !this.isVerticalLayout) {
        return this.menuItemOpen[index] ? 'up' : 'down'
      } else {
        return 'right'
      }
    },
    menuId: function (index) {
      if (!this.rootId) {
        return null
      }
      return `${this.rootId}-${index}`
    }
  },
  computed: {
    showMenuHeading: function () {
      return !this.isVerticalLayout && this.depth === 1
    },
    showParentLink: function () {
      return (this.isVerticalLayout && this.parent) || (this.depth > 1 && this.parent)
    }
  },
  watch: {
    'menu': function (newVal, oldVal) {
      this.menuItemOpen = this.prepareOpenStates()
    },
    'layout': function (newVal, oldVal) {
      this.isVerticalLayout = (this.layout === 'vertical')
    },
    'open': function (newVal, oldVal) {
      if (!newVal) {
        for (let key in this.menuItemOpen) {
          if (this.menuItemOpen[key] && this.isRoot) {
            this.$refs['menu-link'][key].focus()
          }
        }
        this.closeAllItems()
      }
    },
    'sharedControl.visibleDepth': function (newVal, oldVal) {
      if (!this.isVerticalLayout && newVal <= this.depth) {
        this.closeAllItems()
      }
    }
  }
}
</script>

<style lang="scss">
  @import "menu";
</style>
