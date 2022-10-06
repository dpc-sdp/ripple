<script lang="ts">
export default { name: 'RplPrimaryNavBar' }
</script>

<script setup lang="ts">
import RplIcon from '../icon/icon.vue'
import RplPrimaryNavBarAction from './nav-bar-action.vue'
import { RplPrimaryNavLogo, RplPrimaryNavItem } from './constants'

interface Props {
  primaryLogo: RplPrimaryNavLogo
  secondaryLogo?: RplPrimaryNavLogo
  items: RplPrimaryNavItem[]
  showSearch: boolean
  showQuickExit: boolean
  isMegaNavActive: boolean
  isSearchActive: boolean
  isItemExpanded: (id: string) => boolean
  toggleMegaNav: () => void
  toggleItem: (id: string) => void
  toggleSearch: () => void
}

const props = defineProps<Props>()
</script>

<template>
  <div
    :class="{
      'rpl-primary-nav__nav-bar': true,
      'rpl-primary-nav__nav-bar--search-active': props.isSearchActive
    }"
  >
    <!-- Logos -->
    <div
      :class="{
        'rpl-primary-nav__logos': true,
        'rpl-primary-nav__logos--has-secondary-logo': props.secondaryLogo
      }"
    >
      <!-- Primary logo -->
      <a
        class="rpl-primary-nav__primary-logo-link rpl-u-focusable-outline"
        :href="props.primaryLogo.href"
      >
        <img
          class="rpl-primary-nav__primary-logo-image"
          :src="props.primaryLogo.src"
          :alt="props.primaryLogo.altText"
        />
      </a>

      <!-- Logo divider -->
      <div
        v-if="props.secondaryLogo"
        class="rpl-primary-nav__logo-divider"
      ></div>

      <!-- Secondary logo -->
      <a
        v-if="props.secondaryLogo"
        class="rpl-primary-nav__secondary-logo-link rpl-u-focusable-outline"
        :href="props.secondaryLogo.href"
      >
        <img
          class="rpl-primary-nav__secondary-logo-image"
          :src="props.secondaryLogo.src"
          :alt="props.secondaryLogo.altText"
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
          @click="toggleMegaNav()"
        >
          <span>Menu</span>&NoBreak;<span
            class="
              rpl-primary-nav__nav-bar-icon rpl-primary-nav__nav-bar-icon--large
              rpl-u-margin-l-2
            "
            ><RplIcon name="icon-chevron-down" size="xs"></RplIcon>
          </span>
        </RplPrimaryNavBarAction>
      </li>

      <!-- Mobile menu divider -->
      <li
        v-if="props.showSearch"
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
          :href="item.href"
          :active="isItemExpanded(item.id)"
          @click="toggleItem(item.id)"
        >
          <span>{{ item.text }}</span
          >&NoBreak;<span class="rpl-primary-nav__nav-bar-icon rpl-u-margin-l-2"
            ><RplIcon name="icon-chevron-down" size="xs"></RplIcon
          ></span>
        </RplPrimaryNavBarAction>

        <RplPrimaryNavBarAction
          v-else
          type="link"
          :href="item.href"
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
      <li v-if="props.showSearch">
        <RplPrimaryNavBarAction
          type="toggle"
          href="/search"
          @click="toggleSearch()"
        >
          <div v-if="!props.isSearchActive">
            <span class="rpl-primary-nav__nav-bar-search-label">Search</span
            >&NoBreak;<span
              class="
                rpl-primary-nav__nav-bar-icon
                rpl-primary-nav__nav-bar-icon--large
                rpl-u-margin-l-2
              "
              ><RplIcon name="icon-search"></RplIcon>
            </span>
          </div>
          <div v-else>
            <span class="rpl-primary-nav__nav-bar-search-label">Close</span
            >&NoBreak;<span
              class="
                rpl-primary-nav__nav-bar-icon
                rpl-primary-nav__nav-bar-icon--large
                rpl-u-margin-l-2
              "
              ><RplIcon name="icon-cancel"></RplIcon>
            </span>
          </div>
        </RplPrimaryNavBarAction>
      </li>
    </ul>
  </div>
</template>
