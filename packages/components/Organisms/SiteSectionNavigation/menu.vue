<template>
  <transition name="section" @enter="start" @after-enter="end" @before-leave="start" @after-leave="end">
    <ul v-show="open" :data-depth="depth" class="rpl-section-menu">
      <li v-for="(link, index) in menu" :key="index" class="rpl-section-menu__item rpl-section-menu__item--parent" :class="{'rpl-section-menu__item--active': menuItemOpen[index]}">
        <rpl-link v-if="!link.children" :href="link.url" :target="link.target" class="rpl-section-menu__item-link">{{ link.text }}</rpl-link>
        <button
          v-else
          class="rpl-section-menu__item-link rpl-section-menu__item-link--parent"
          :class="{'rpl-section-menu__item-link--active': menuItemOpen[index]}"
          @click="menuLinkClick(index)"
          :aria-expanded="menuItemOpen[index].toString()"
        >
          <span class="rpl-section-menu__item-link-text">{{ link.text }}</span>
          <rpl-icon symbol="down" color="white" />
        </button>
        <rpl-section-menu
          v-if="link.children"
          :open="menuItemOpen[index]"
          :menu="link.children"
          :depth="depth ? depth + 1 : 1"
        />
      </li>
    </ul>
  </transition>
</template>

<script>
import RplIcon from '@dpc-sdp/ripple-icon'
import RplLink from '@dpc-sdp/ripple-link'

export default {
  name: 'RplSectionMenu',
  props: {
    menu: Array,
    depth: Number,
    open: Boolean
  },
  components: {
    RplIcon,
    RplLink
  },
  data: function () {
    return {
      menuItemOpen: this.prepareOpenStates()
    }
  },
  methods: {
    prepareOpenStates: function () {
      let menuItemOpen = {}
      this.menu.forEach((item, index) => {
        menuItemOpen[index] = (item.active === true)
      })
      return menuItemOpen
    },
    menuLinkClick: function (index) {
      this.menuItemOpen[index] = !this.menuItemOpen[index]
    },
    start (el) {
      el.style.height = el.scrollHeight + 'px'
    },
    end (el) {
      el.style.height = ''
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-section-menu-link-ruleset: ('xs', 1em, 'medium') !default;
  $rpl-section-menu-link-sub-ruleset: ('xs', 1em, 'regular') !default;
  $rpl-section-menu-item-background-color: rpl_color('primary') !default;
  $rpl-section-menu-item-left-padding: ($rpl-space * 6) !default;
  $rpl-section-menu-item-link-padding: $rpl-space-4 $rpl-section-menu-item-left-padding !default;
  $rpl-section-menu-item-link-color: rpl_color('white') !default;
  $rpl-section-menu-item-link-parent-hover-background-color: rpl_color('primary') !default;
  $rpl-section-menu-item-link-parent-hover-background-image: rpl_gradient('primary_gradient') !default;
  $rpl-section-menu-item-link-parent-background-color: rpl_color('secondary') !default;
  $rpl-section-menu-item-link-active-background-color: rpl_color('primary') !default;
  $rpl-section-menu-item-link-active-border-height: 1px;
  $rpl-section-menu-item-link-active-border: $rpl-section-menu-item-link-active-border-height solid rpl_color('dark_primary') !default;
  $rpl-section-menu-first-level-background: rpl_color('primary') !default;
  $rpl-section-menu-first-level-item-background-color: rpl_color('dark_primary') !default;
  $rpl-section-menu-item-link-parent-text-margin: 0 ($rpl-space * 5) 0 0 !default;
  $rpl-section-menu-item-link-parent-icon-min-width: rem(8px) !default;
  $rpl-section-menu-item-indent-padding: rem(13px) !default;
  $rpl-section-menu-item-link-active-text-color: rpl-color('white') !default;
  $rpl-section-menu-active-left-bar: url('data:image/svg+xml,%3Csvg%20width%3D%224%22%20height%3D%221%22%20viewBox%3D%220%200%204%201%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%224%22%20height%3D%221%22%20fill%3D%22%23#{str-slice(quote(rpl_color("secondary")), 2)}%22%2F%3E%3C%2Fsvg%3E') !default;

  @mixin rpl-section-menu-active-left-border {
    background-image: $rpl-section-menu-active-left-bar;
    background-repeat: repeat-y;
    background-position: left;
  }

  .rpl-section-menu {
    $root: &;
    padding: 0;
    margin: 0;
    list-style: none;
    display: block;

    &.section-enter-active,
    &.section-leave-active {
      @include rpl-section-menu-active-left-border;
      background-color: $rpl-section-menu-item-link-active-background-color;
      transition: height .5s;
      overflow: hidden;
    }

    &.section-enter,
    &.section-leave-to {
      height: 0 !important;
    }

    &__item {
      position: relative;

      &::before {
        content: '';
        height: $rpl-section-menu-item-link-active-border-height;
        position: absolute;
        top: 0;
        left: $rpl-component-padding-s;
        right: $rpl-component-padding-s;
        z-index: 1;
        background-color: $rpl-section-menu-item-background-color;
        transition: width .25s, opacity .25s;
      }

      &:first-child {
        &::before {
          display: none;
        }
      }

      &--active {
        @include rpl-section-menu-active-left-border;
        background-color: $rpl-section-menu-item-link-active-background-color;
      }
    }

    &__item-link {
      @include rpl_typography_ruleset($rpl-section-menu-link-ruleset);
      position: relative;
      background-color: transparent;
      color: $rpl-section-menu-item-link-color;
      border: 0;
      width: 100%;
      box-sizing: border-box;
      display: block;
      padding: $rpl-section-menu-item-link-padding;
      text-align: left;
      cursor: pointer;

      &--parent {
        display: flex;
        align-items: center;

        &:hover,
        &:focus {
          background-color: $rpl-section-menu-item-link-parent-hover-background-color;
          background-image: $rpl-section-menu-active-left-bar, $rpl-section-menu-item-link-parent-hover-background-image;
          background-repeat: repeat-y, no-repeat;
          &::before {
            width: rem(4px);
          }
        }
      }

      &--active {
        color: $rpl-section-menu-item-link-active-text-color;

        &::after {
          content: '';
          height: $rpl-section-menu-item-link-active-border-height;
          position: absolute;
          bottom: -$rpl-section-menu-item-link-active-border-height;
          left: $rpl-component-padding-s;
          right: $rpl-component-padding-s;
          background-color: $rpl-section-menu-first-level-item-background-color;
        }

        .rpl-icon {
          transform: rotate(-180deg);
        }
      }

      &-text {
        margin: $rpl-section-menu-item-link-parent-text-margin;
      }

      .rpl-icon {
        min-width: $rpl-section-menu-item-link-parent-icon-min-width;
        margin-left: auto;
        transition: transform .25s;
      }
    }

    &[data-depth="0"] {
      & > #{$root}__item {
        &--active,
        &--active + #{$root}__item {
          &::before {
            opacity: 0;
          }
        }
      }
    }

    &[data-depth="1"] {

      #{$root}__item {
        &::before {
          left: $rpl-component-padding-s;
          right: $rpl-component-padding-s;
          background-color: $rpl-section-menu-first-level-item-background-color;
        }
        #{$root}__item-link {
          padding-left: $rpl-section-menu-item-left-padding + $rpl-space-4;
        }
      }

      #{$root}__item--active {
        #{$root}__item-link {
          &::after {
            display: none;
          }
        }
      }
    }

    &[data-depth="2"] {
      #{$root}__item {
        &::before {
          display: none;

        }
        #{$root}__item-link {
          padding-left: $rpl-section-menu-item-left-padding + ($rpl-space-4 * 2);
        }
      }

      #{$root}__item-link {
        padding-left: $rpl-section-menu-item-indent-padding * 3;
        @include rpl_typography_ruleset($rpl-section-menu-link-sub-ruleset);
      }
    }

    &[data-depth="3"] {
      #{$root}__item {
        &::before {
          display: none;
        }

        #{$root}__item-link {
          padding-left: $rpl-section-menu-item-left-padding + ($rpl-space-4 * 3);
        }
      }

      #{$root}__item-link {
        padding-left: $rpl-section-menu-item-indent-padding * 4;
        @include rpl_typography_ruleset($rpl-section-menu-link-sub-ruleset);
      }
    }
  }
</style>
