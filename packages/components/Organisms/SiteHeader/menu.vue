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
            <button
              v-if="!isRoot && isVerticalLayout"
              class="rpl-menu__back"
              @click="verticalGoBack"
              @focus="onItemFocus"
            >
              <rpl-icon symbol="left" color="white" />
              <span class="rpl-visually-hidden">Close {{ title }} and return to </span><span>{{ backTitle }}</span>
            </button>
            <rpl-link v-if="showMenuHeading && parent" class="rpl-menu__heading" :class="{ 'rpl-menu__heading--horizontal-sub' : (!isVerticalLayout && depth > 1) }" :href="parent.url" :target="parent.target" :innerWrap="false">{{ parent.text }}</rpl-link>
          </div>
          <ul class="rpl-menu__items" :class="{ 'rpl-menu__items--root': isRoot }">
            <li
              v-if="isRoot && isVerticalLayout"
              class="rpl-menu__item"
            >
              <rpl-link
                class="rpl-menu__item-link rpl-menu__item-link--home"
                href="/"
                :innerWrap="false"
              >
                <span><rpl-icon symbol="menu_home" color="white" /></span>Home
              </rpl-link>
            </li>
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
              <rpl-link
                v-if="!list.children"
                class="rpl-menu__item-link"
                :href="list.url"
                :target="list.target"
                @focus="onItemFocus"
                :innerWrap="false"
              >
                {{ list.text }}
              </rpl-link>
              <button
                v-else
                class="rpl-menu__item-link"
                :class="{'rpl-menu__item-link--active': menuItemOpen[index]}"
                @click="menuLinkClick(index)"
                @focus="onItemFocus"
                :aria-expanded="menuItemOpen[index].toString()"
              >
                <span>{{ list.text }}</span>
                <rpl-icon :symbol="menuParentIcon(index)" color="white" />
              </button>
              <rpl-menu
                v-if="list.children"
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
    parent: Object
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
    }
  },
  computed: {
    showMenuHeading: function () {
      return (!this.isRoot && this.isVerticalLayout) || (!this.isVerticalLayout && this.depth >= 1)
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
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  @import "scss/site_header";

  $rpl-menu-vertical-root-margin: ($rpl-space * 10) auto auto !default;
  $rpl-menu-vertical-root-padding-xl: auto $rpl-space-4 auto 0 !default;
  $rpl-menu-vertical-heading-margin: ($rpl-space * 6) auto $rpl-space-3 auto !default;
  $rpl-menu-vertical-items-padding: 0 ($rpl-space * 6) !default;
  $rpl-menu-vertical-header-padding: $rpl-menu-vertical-items-padding !default;
  $rpl-menu-vertical-back-color: rpl-color('white') !default;
  $rpl-menu-vertical-back-icon-margin: auto $rpl-space auto 0 !default;
  $rpl-menu-horizontal-items-root-link-color: rpl-color('white') !default;
  $rpl-menu-horizontal-items-root-margin: auto ($rpl-space * 7) auto auto !default;
  $rpl-menu-horizontal-items-root-active-line-background-image: rpl-gradient('primary_gradient') !default;
  $rpl-menu-horizontal-items-root-active-hover-line-color: rpl-color('secondary') !default;
  $rpl-menu-horizontal-items-root-active-thickness: 2px !default;
  $rpl-menu-horizontal-items-root-parent-icon-margin: auto auto auto $rpl-space !default;
  $rpl-menu-horizontal-inner-margin: ($rpl-space * 12) auto auto !default;
  $rpl-menu-text-color: rpl-color('white') !default;
  $rpl-menu-item-border: 1px solid rpl-color('primary') !default;
  $rpl-menu-item-link-indent: $rpl-space * 5;
  $rpl-menu-item-link-padding: $rpl-space-4 $rpl-menu-item-link-indent $rpl-space-4 0 !default;
  $rpl-menu-item-link-padding-active: $rpl-space-4 $rpl-menu-item-link-indent !default;
  $rpl-menu-item-link-color: $rpl-menu-text-color !default;
  $rpl-menu-item-link-color-hover: $rpl-menu-text-color !default;
  $rpl-menu-item-link-background-color-hover: rpl-color('primary') !default;
  $rpl-menu-item-link-background-image-active: rpl-gradient('primary_gradient') !default;
  $rpl-menu-item-link-color-active: $rpl-menu-text-color !default;
  $rpl-menu-item-link-background-color-active: transparent !default;
  $rpl-menu-item-link-icon-margin: auto $rpl-space-2 auto !default;
  $rpl-menu-item-link-border-radius: rem(4px) !default;
  $rpl-menu-item-link-ruleset: ('xs', 1.1em, 'medium') !default;
  $rpl-menu-item-link-home-ruleset: ('xs', 1.1em, 'bold') !default;
  $rpl-menu-heading-ruleset: (
    'xs': ('xl', 1.33em, 'bold'),
    's': ('mega', 1.14em, 'bold')
  ) !default;
  $rpl-menu-heading-sub-ruleset: (
    'xs': ('xl', 1.33em, 'bold'),
    's': ('l', 1.14em, 'bold')
  ) !default;
  $rpl-menu-heading-sub-padding: $rpl-space-3 0;
  $rpl-menu-gutter: rpl_grid_get_gutter($rpl-grid) !default;
  $rpl-menu-horizontal-quickexit-right-margin: ($rpl-space * 10) !default;
  $rpl-menu-vertical-quickexit-padding: $rpl-space-4 !default;

  // Simplified rpl_grid_column() - returns quotient as non-percentage. Ignores gutters.
  @function rpl_menu_column($grid-cols: 1, $grid: $rpl-grid) {
    @return $grid-cols / rpl_grid_get_columns($grid);
  }

  // Simplified rpl_site_constrain() - includes menu positioning offset in padding.
  @mixin rpl_menu_constrain_all() {
    @each $bp, $padding in map-get($rpl-layout, 'site_padding') {
      @include rpl_breakpoint($bp) {
        padding-left: calc(#{$padding} - #{$rpl-header-horizontal-padding-s});
        padding-right: calc(#{$padding} - #{$rpl-header-horizontal-padding-s});
      }
    }

    // max width will override site padding
    @each $bp, $width in map-get($rpl-layout, 'site_max_width') {
      @include rpl_breakpoint($bp) {
        padding-left: calc((100% - #{$width}) / 2);
        padding-right: calc((100% - #{$width}) / 2);
      }
    }
  }

  .rpl-menu--vertical {
    &.rpl-menu--root {
      position: relative;
      margin: $rpl-menu-vertical-root-margin;
      left: 0;
      transition: left .5s;
      @include rpl_breakpoint('xl') {
        padding: $rpl-menu-vertical-root-padding-xl;
      }

      @for $i from 1 through 3 {
        &[data-vpos="#{$i}"] {
          left: ($i * -100%);
        }
      }
    }

    .rpl-menu__heading {
      margin: $rpl-menu-vertical-heading-margin;
      @include rpl_focus_dark;
    }

    .rpl-menu__quickexit {
      padding: $rpl-menu-vertical-quickexit-padding;
      > a {
        width: 100%;
        @include rpl_focus_dark;
      }
      @include rpl_breakpoint('s') {
        float: right;
        > a {
          width: auto;
        }
      }
    }

    .rpl-menu {
      position: absolute;
      top: 0;
      width: 100%;

      &[data-depth] {
        left: 100%;
      }

      &:not(.rpl-menu--open) {
        display: none;
      }
    }

    .rpl-menu__items {
      margin: 0;
      list-style: none;
      box-sizing: border-box;
      padding: $rpl-menu-vertical-items-padding;
    }

    .rpl-menu__header {
      padding: $rpl-menu-vertical-header-padding;
    }

    .rpl-menu__back {
      @include rpl_typography_font('xs', 1em, 'bold');
      color: $rpl-menu-vertical-back-color;
      background-color: transparent;
      border: 0;
      padding: 0;
      cursor: pointer;
      @include rpl_focus_dark;

      .rpl-icon {
        margin: $rpl-menu-vertical-back-icon-margin;
      }
    }
    .rpl-menu__item-link {
      &.rpl-menu__item-link--home {
        @include rpl_typography_ruleset($rpl-menu-item-link-home-ruleset);
        span {
          margin-right: 0;
        }
      }
    }
  }

  .rpl-menu--horizontal {
    margin: 0;

    .rpl-menu__heading {
      margin: 0;
      @include rpl_focus_dark;
    }

    .rpl-menu__items--root {
      display: flex;
      list-style: none;
      justify-content: flex-end;

      & > .rpl-menu__item > .rpl-menu__item-link {
        @include rpl_typography_font('xs', 1em, 'bold');
        text-decoration: none;
        background-color: transparent;
        border: 0;
        padding: 0;
        display: inline-block;
        position: relative;
        cursor: pointer;
        color: $rpl-menu-horizontal-items-root-link-color;
        margin: $rpl-menu-horizontal-items-root-margin;
        @include rpl_focus_dark;

        &:hover, &:focus {
          &::after {
            content: '';
            width: 100%;
            position: absolute;
            display: inline-block;
            bottom: rem(-5px);
            border-radius: $rpl-menu-horizontal-items-root-active-thickness;
            left: 0;
            right: 0;
            height: $rpl-menu-horizontal-items-root-active-thickness;
            background-color: $rpl-menu-horizontal-items-root-active-hover-line-color;
            background-image: none;
          }
        }

        .rpl-icon {
          vertical-align: middle;
          margin: $rpl-menu-horizontal-items-root-parent-icon-margin;
          display: inline;
        }

        &--active {
          &::after {
            content: '';
            width: 100%;
            position: absolute;
            display: inline-block;
            bottom: -$rpl-space;
            border-radius: $rpl-menu-horizontal-items-root-active-thickness;
            left: 0;
            right: 0;
            height: $rpl-menu-horizontal-items-root-active-thickness;
            background-image: $rpl-menu-horizontal-items-root-active-line-background-image;
          }
        }
      }
    }

    .rpl-menu__quickexit {
      margin-bottom: 1.5rem;
      position: absolute;
      right: $rpl-menu-horizontal-quickexit-right-margin;
    }

    .rpl-menu__items:not(.rpl-menu__items--root) {
      list-style: none;
      padding: 0;
    }

    .rpl-menu--horizontal-floating-wrapper {
      &.rpl-menu--open {
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        top: $rpl-site-header-top-height-s;
        height: calc(100vh - #{$rpl-site-header-top-height-s + (2 * $rpl-header-horizontal-padding-xs)});
        @include rpl_breakpoint('s') {
          height: calc(100vh - #{$rpl-site-header-top-height-s + (2 * $rpl-header-horizontal-padding-s)});
        }
        @include rpl_breakpoint('l') {
          top: $rpl-site-header-top-height-l;
          height: calc(100vh - #{$rpl-site-header-top-height-l + (2 * $rpl-header-horizontal-padding-s)});
        }
      }

      & > .rpl-menu__inner {
        @include rpl_menu_constrain_all;
        position: relative;
        @include rpl_breakpoint('l') {
          margin: $rpl-menu-horizontal-inner-margin;
        }

        & > .rpl-menu__inner_root {
          @include rpl_grid_row;

          & > .rpl-menu__column {
            position: relative;
            width: calc(#{rpl_menu_column(4) * 100%} - #{$rpl-menu-gutter});
            margin-left: calc(#{rpl_menu_column(3) * 100%} + #{$rpl-menu-gutter / 2});

            & > .rpl-menu__header {
              position: absolute;
              right: calc(100% + #{$rpl-menu-gutter});
              width: calc((100% + #{$rpl-menu-gutter}) * #{rpl_menu_column(3) / rpl_menu_column(4)} - #{$rpl-menu-gutter});
            }
          }
        }
      }
    }

    // Fourth column.
    &[data-visibledepth="3"] {
      .rpl-menu--horizontal-floating-wrapper {
        & > .rpl-menu__inner {
          & > .rpl-menu__inner_root {
            & > .rpl-menu__column {
              width: calc(#{rpl_menu_column(3) * 100%} - #{$rpl-menu-gutter});
              margin-left: calc(#{rpl_menu_column(3) * 100%} + #{$rpl-menu-gutter / 2});

              & > .rpl-menu__header {
                width: 100%;
              }
            }
          }
        }
      }
    }

    .rpl-menu {
      &:not(.rpl-menu--open) {
        display: none;
      }
    }

    .rpl-menu--subs {
      .rpl-menu__column {
        top: 0;
        position: absolute;
        left: calc(100% + #{$rpl-menu-gutter});
        width: 100%;
      }
    }
  }

  .rpl-menu__heading {
    @include rpl_typography_ruleset($rpl-menu-heading-ruleset);
    color: $rpl-menu-text-color;
    display: block;

    &--horizontal-sub {
      @include rpl_typography_ruleset($rpl-menu-heading-sub-ruleset);
      padding: $rpl-menu-heading-sub-padding;
    }
  }

  .rpl-menu--vertical,
  .rpl-menu--horizontal-floating-wrapper,
  .rpl-menu--horizontal .rpl-menu--subs {
    .rpl-menu__item {
      border-top: $rpl-menu-item-border;

      &:first-child {
        border-top: 0;
      }

      &.rpl-menu__item--after-active,
      &.rpl-menu__item--active {
        border-top-color: transparent;
      }
    }
    .rpl-menu__item-link {
      @include rpl_typography_ruleset($rpl-menu-item-link-ruleset);
      font-weight: 400;
      display: flex;
      width: 100%;
      text-align: left;
      box-sizing: border-box;
      background-color: transparent;
      border: 0;
      margin: 0;
      border-radius: 0;
      cursor: pointer;
      text-decoration: none;
      padding: $rpl-menu-item-link-padding;
      color: $rpl-menu-item-link-color;
      transition: padding-left .25s;
      @include rpl_focus_dark;

      .rpl-icon {
        margin: $rpl-menu-item-link-icon-margin;
        margin-left: auto;
        min-width: 5px;
      }

      span {
        margin-right: $rpl-menu-item-link-indent;
        transition: margin-right .25s;
      }

      &--active,
      &:focus {
        border-radius: $rpl-menu-item-link-border-radius;
        align-items: center;
        padding: $rpl-menu-item-link-padding-active;
        color: $rpl-menu-item-link-color-hover;

        span {
          margin-right: 0;
        }
      }

      &:focus {
        background-color: $rpl-menu-item-link-background-color-hover;
      }

      &--active {
        background-image: $rpl-menu-item-link-background-image-active;
        background-color: $rpl-menu-item-link-background-color-active;
        color: $rpl-menu-item-link-color-active;
      }
    }
  }

  .rpl-menu--horizontal-floating-wrapper,
  .rpl-menu--horizontal .rpl-menu--subs {
    .rpl-menu__item-link {
      &:hover {
        border-radius: $rpl-menu-item-link-border-radius;
        align-items: center;
        padding: $rpl-menu-item-link-padding-active;
        color: $rpl-menu-item-link-color-hover;
        background-color: $rpl-menu-item-link-background-color-hover;
         span {
          margin-right: 0;
        }
      }
    }
  }
</style>
