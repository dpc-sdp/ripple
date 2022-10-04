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
  showLogin: boolean
  showSearch: boolean
  isMegaNavActive: boolean
  isItemExpanded: (id: string) => boolean
  toggleMegaNav: () => void
  toggleItem: (id: string) => void
  toggleSearch: () => void
}

const props = defineProps<Props>()
</script>

<template>
  <div class="rpl-primary-nav__nav-bar">
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

    <!-- Mobile actions -->
    <ul
      class="
        rpl-primary-nav__nav-bar-actions-list
        rpl-primary-nav__nav-bar-actions-list--mobile
      "
    >
      <!-- Mobile menu toggle -->
      <li>
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
      <li v-if="props.showSearch">
        <div class="rpl-primary-nav__nav-bar-search-divider"></div>
      </li>

      <!-- Mobile search -->
      <li>
        <slot v-if="props.showSearch" name="search">
          <RplPrimaryNavBarAction
            type="toggle"
            href="/search"
            @click="toggleSearch()"
          >
            <span class="rpl-primary-nav__nav-bar-mobile-search-label"
              >Search</span
            >&NoBreak;<span
              class="
                rpl-primary-nav__nav-bar-icon
                rpl-primary-nav__nav-bar-icon--large
                rpl-primary-nav__nav-bar-icon--mobile-search
              "
              ><RplIcon name="icon-search"></RplIcon>
            </span>
          </RplPrimaryNavBarAction>
        </slot>
      </li>
    </ul>

    <!-- Desktop actions -->
    <ul
      class="
        rpl-primary-nav__nav-bar-actions-list
        rpl-primary-nav__nav-bar-actions-list--desktop
      "
    >
      <!-- Items -->
      <li v-for="item in items" :key="item.id">
        <!-- Toggle -->
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

        <!-- Link -->
        <RplPrimaryNavBarAction
          v-else
          type="link"
          :href="item.href"
          :active="item.active"
        >
          <span>{{ item.text }}</span>
        </RplPrimaryNavBarAction>
      </li>

      <!-- Login slot - Desktop -->
      <li>
        <slot v-if="props.showLogin" name="login">
          <RplPrimaryNavBarAction type="link" href="/login">
            <span
              class="
                rpl-primary-nav__nav-bar-icon
                rpl-primary-nav__nav-bar-icon--large
                rpl-u-margin-r-2
              "
              ><RplIcon name="icon-user-circle-filled"></RplIcon></span
            >&NoBreak;<span>Login</span>
          </RplPrimaryNavBarAction>
        </slot>
      </li>

      <!-- Search slot -->
      <li>
        <slot v-if="props.showSearch" name="search">
          <RplPrimaryNavBarAction
            type="toggle"
            href="/search"
            @click="toggleSearch()"
          >
            <span>Search</span>&NoBreak;<span
              class="
                rpl-primary-nav__nav-bar-icon
                rpl-primary-nav__nav-bar-icon--large
                rpl-u-margin-l-2
              "
              ><RplIcon name="icon-search"></RplIcon>
            </span>
          </RplPrimaryNavBarAction>
        </slot>
      </li>
    </ul>
  </div>
</template>
