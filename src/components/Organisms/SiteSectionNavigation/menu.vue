<template>
  <transition name="section" @enter="start" @after-enter="end" @before-leave="start" @after-leave="end">
    <ul v-show="open" :data-depth="depth" class="rpl-section-menu">
      <li v-for="(link, index) in menu" :key="index" class="rpl-section-menu__item rpl-section-menu__item--parent" :class="{'rpl-section-menu__item--active': menuItemOpen[index]}">
        <rpl-link v-if="!link.children" :href="link.url" class="rpl-section-menu__item-link">{{ link.text }}</rpl-link>
        <button
          v-else
          class="rpl-section-menu__item-link rpl-section-menu__item-link--parent"
          :class="{'rpl-section-menu__item-link--active': menuItemOpen[index]}"
          @click="menuLinkClick(index)"
          :aria-expanded="menuItemOpen[index].toString()"
        >
          <rpl-text-icon :text="link.text" symbol="right" color="white" />
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
import {RplTextIcon} from '@dpc-sdp/ripple-icon'
import RplLink from '@dpc-sdp/ripple-link'

export default {
  name: 'RplSectionMenu',
  props: {
    menu: Array,
    depth: Number,
    open: Boolean
  },
  components: {
    RplTextIcon,
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
        menuItemOpen[index] = false
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
  @import "~@dpc-sdp/ripple-global/style";

  $rpl-section-menu-link-ruleset: ('xs', 1em, 'medium');
  $rpl-section-menu-link-sub-ruleset: ('xs', 1em, 'regular');
  $rpl-section-menu-item-background-color: rpl_color('secondary');
  $rpl-section-menu-item-link-padding: $rpl-space-4 $rpl-component-padding-s;
  $rpl-section-menu-item-link-color: rpl_color('white');
  $rpl-section-menu-item-link-parent-hover-background-color: rpl_color('primary');
  $rpl-section-menu-item-link-parent-hover-background-image: rpl_gradient('primary_gradient');
  $rpl-section-menu-item-link-parent-background-color: rpl_color('secondary');
  $rpl-section-menu-item-link-active-background-color: rpl_color('primary');
  $rpl-section-menu-item-link-active-border: 1px solid rpl_color('dark_primary');
  $rpl-section-menu-first-level-background: rpl_color('primary');
  $rpl-section-menu-first-level-item-background-color: rpl_color('dark_primary');

  .rpl-section-menu {
    $root: &;
    padding: 0;
    margin: 0;
    list-style: none;
    display: block;

    &.section-enter-active,
    &.section-leave-active {
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
        height: 1px;
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
    }

    &__item-link {
      background-color: transparent;
      color: $rpl-section-menu-item-link-color;
      border: 0;
      width: 100%;
      box-sizing: border-box;
      display: block;
      padding: $rpl-section-menu-item-link-padding;
      text-align: left;
      cursor: pointer;
      transition: background-color .25s;

      &--parent {
        &:hover,
        &:focus {
          background-color: $rpl-section-menu-item-link-parent-hover-background-color;
          background-image: $rpl-section-menu-item-link-parent-hover-background-image;
          &::before {
            width: rem(4px);
          }
        }

        &::before {
          content: '';
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          z-index: 10;
          background-color: $rpl-section-menu-item-link-parent-background-color;
        }
      }

      &--active {
        background-color: $rpl-section-menu-item-link-active-background-color;
        border-bottom: $rpl-section-menu-item-link-active-border;

        &::before {
          width: rem(4px);
        }

        .rpl-icon {
          transform: rotate(90deg);
        }
      }

      .rpl-icon {
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
      background: $rpl-section-menu-first-level-background;

      #{$root}__item {
        &::before {
          left: 0;
          right: 0;
          background-color: $rpl-section-menu-first-level-item-background-color;
        }
      }

      #{$root}__item-link {
        @include rpl_typography_ruleset($rpl-section-menu-link-ruleset);
      }
    }

    &[data-depth="2"] {
      #{$root}__item {
        &::before {
          display: none;
        }
      }

      #{$root}__item-link {
        @include rpl_typography_ruleset($rpl-section-menu-link-sub-ruleset);
      }
    }
  }
</style>
