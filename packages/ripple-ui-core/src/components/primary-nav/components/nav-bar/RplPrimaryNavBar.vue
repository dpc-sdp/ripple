<script setup lang="ts">
import RplIcon from '../../../icon/RplIcon.vue'
import RplPrimaryNavBarAction from './RplPrimaryNavBarAction.vue'
import {
  IRplPrimaryNavLogo,
  IRplPrimaryNavItem,
  IRplPrimaryNavActiveItems
} from '../../constants'

interface Props {
  primaryLogo: IRplPrimaryNavLogo
  secondaryLogo?: IRplPrimaryNavLogo
  items: IRplPrimaryNavItem[]
  showSearch: boolean
  showQuickExit: boolean
  isMegaNavActive: boolean
  isSearchActive: boolean
  activeNavItems: IRplPrimaryNavActiveItems
  toggleMobileMenu: () => void
  toggleItem: (level: 1 | 2 | 3, item: IRplPrimaryNavItem) => void
  toggleSearch: () => void
}

defineProps<Props>()
</script>

<template>
  <div
    :class="{
      'rpl-primary-nav__nav-bar': true,
      'rpl-primary-nav__nav-bar--search-active': isSearchActive
    }"
  >
    <!-- Logos -->
    <div
      :class="{
        'rpl-primary-nav__logos': true,
        'rpl-primary-nav__logos--has-secondary-logo': secondaryLogo
      }"
    >
      <!-- Primary logo -->
      <a
        class="rpl-primary-nav__primary-logo-link rpl-u-focusable-outline rpl-u-focusable-outline--no-border"
        :href="primaryLogo.href"
      >
        <img
          class="rpl-primary-nav__primary-logo-image rpl-u-screen-only"
          :src="primaryLogo.src"
          :alt="primaryLogo.altText"
        />
        <img
          v-if="primaryLogo.printSrc"
          class="rpl-primary-nav__primary-logo-image rpl-primary-nav__logo-alt rpl-u-print-only"
          :src="primaryLogo.printSrc"
          :alt="primaryLogo.altText"
        />
      </a>

      <!-- Logo divider -->
      <div v-if="secondaryLogo" class="rpl-primary-nav__logo-divider"></div>

      <!-- Secondary logo -->
      <a
        v-if="secondaryLogo"
        class="rpl-primary-nav__secondary-logo-link rpl-u-focusable-outline rpl-u-focusable-outline--no-border"
        :href="secondaryLogo.href"
      >
        <img
          class="rpl-primary-nav__secondary-logo-image rpl-u-screen-only"
          :src="secondaryLogo.src"
          :alt="secondaryLogo.altText"
        />
        <img
          v-if="secondaryLogo.printSrc"
          class="rpl-primary-nav__secondary-logo-image rpl-primary-nav__logo-alt rpl-u-print-only"
          :src="secondaryLogo.printSrc"
          :alt="secondaryLogo.altText"
        />
      </a>
    </div>

    <ul class="rpl-primary-nav__nav-bar-actions-list">
      <!-- Mobile menu toggle -->
      <li class="rpl-primary-nav__nav-bar-mobile-menu-toggle-container">
        <RplPrimaryNavBarAction
          type="toggle"
          href="/"
          :active="isMegaNavActive"
          @click="toggleMobileMenu()"
        >
          <span>Menu</span>&NoBreak;<span
            class="rpl-primary-nav__nav-bar-icon rpl-primary-nav__nav-bar-icon--large rpl-u-margin-l-2"
            ><RplIcon name="icon-chevron-down" size="xs"></RplIcon>
          </span>
        </RplPrimaryNavBarAction>
      </li>

      <!-- Mobile menu divider -->
      <li
        v-if="showSearch"
        class="rpl-primary-nav__nav-bar-mobile-menu-divider"
        aria-role="presentation"
        aria-hidden="true"
      ></li>

      <!-- Desktop items -->
      <li
        v-for="item in items"
        :key="item.id"
        class="rpl-primary-nav__nav-bar-item"
      >
        <RplPrimaryNavBarAction
          v-if="item.items"
          type="toggle"
          :href="item.url"
          :active="activeNavItems.level1?.id == item.id"
          @click="toggleItem(1, item)"
        >
          <span>{{ item.text }}</span
          >&NoBreak;<span class="rpl-primary-nav__nav-bar-icon rpl-u-margin-l-2"
            ><RplIcon name="icon-chevron-down" size="xs"></RplIcon
          ></span>
        </RplPrimaryNavBarAction>

        <RplPrimaryNavBarAction
          v-else
          type="link"
          :href="item.url"
          :active="item.active"
        >
          <span>{{ item.text }}</span>
        </RplPrimaryNavBarAction>
      </li>

      <!-- User action slot - Desktop only -->
      <li v-if="$slots.userAction" class="rpl-primary-nav__nav-bar-user-action">
        <slot name="userAction"></slot>
      </li>

      <!-- Search toggle -->
      <li v-if="showSearch">
        <RplPrimaryNavBarAction
          type="toggle"
          href="/search"
          @click="toggleSearch()"
        >
          <div v-if="!isSearchActive">
            <span class="rpl-primary-nav__nav-bar-search-label">Search</span
            >&NoBreak;<span
              class="rpl-primary-nav__nav-bar-icon rpl-primary-nav__nav-bar-icon--large rpl-primary-nav__nav-bar-icon--search"
              ><RplIcon name="icon-search"></RplIcon>
            </span>
          </div>
          <div v-else>
            <span class="rpl-primary-nav__nav-bar-search-label">Close</span
            >&NoBreak;<span
              class="rpl-primary-nav__nav-bar-icon rpl-primary-nav__nav-bar-icon--large rpl-primary-nav__nav-bar-icon--search"
              ><RplIcon name="icon-cancel"></RplIcon>
            </span>
          </div>
        </RplPrimaryNavBarAction>
      </li>
    </ul>
  </div>
</template>

<style src="./RplPrimaryNavBar.css" />
