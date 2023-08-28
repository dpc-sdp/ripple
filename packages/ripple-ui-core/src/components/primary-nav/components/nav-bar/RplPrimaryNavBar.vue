<script setup lang="ts">
import { inject } from 'vue'
import RplIcon from '../../../icon/RplIcon.vue'
import RplPrimaryNavBarAction from './RplPrimaryNavBarAction.vue'
import {
  IRplPrimaryNavLogo,
  IRplPrimaryNavItem,
  IRplPrimaryNavActiveItems,
  RplPrimaryNavToggleItemOptions
} from '../../constants'
import {
  useRippleEvent,
  rplEventPayload
} from '../../../../composables/useRippleEvent'
import VicGovLogo from './../../../../assets/logos/logo-vic-gov.svg?component'
import type { IRplFeatureFlags } from '@dpc-sdp/ripple-tide-api/types'

const { disablePrimaryLogo }: IRplFeatureFlags = inject('featureFlags', {
  disablePrimaryLogo: false
})

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
  toggleItem: (...args: RplPrimaryNavToggleItemOptions) => void
  toggleSearch: () => void
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (
    e: 'toggleMenuItem',
    payload: rplEventPayload & { action: 'open' | 'close' }
  ): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-primary-nav', emit)

const mobileToggleLabel = 'Menu'

const isItemActive = (item: IRplPrimaryNavItem) =>
  props.activeNavItems.level1?.id == item.id

const handleToggleItem = (level: number, item) => {
  emitRplEvent(
    'toggleMenuItem',
    {
      action: !isItemActive(item) ? 'open' : 'close',
      value: item.url,
      text: item.text,
      index: level
    },
    { global: true }
  )

  props.toggleItem(level, item)
}
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
      <RplLink
        v-if="!disablePrimaryLogo"
        class="rpl-primary-nav__primary-logo-link rpl-u-focusable-outline rpl-u-focusable-outline--no-border"
        :url="primaryLogo.href"
      >
        <VicGovLogo
          v-if="!primaryLogo?.src"
          :aria-label="primaryLogo.altText"
          class="rpl-primary-nav__primary-logo-image"
        />
        <img
          v-else
          class="rpl-primary-nav__primary-logo-image rpl-u-screen-only"
          :src="primaryLogo.src"
          :alt="primaryLogo.altText"
        />
        <img
          v-if="primaryLogo?.src && primaryLogo?.printSrc"
          class="rpl-primary-nav__primary-logo-image rpl-primary-nav__logo-alt rpl-u-print-only"
          :src="primaryLogo.printSrc"
          :alt="primaryLogo.altText"
        />
      </RplLink>

      <!-- Logo divider -->
      <div
        v-if="secondaryLogo && !disablePrimaryLogo"
        class="rpl-primary-nav__logo-divider"
      ></div>

      <!-- Secondary logo -->
      <RplLink
        v-if="secondaryLogo"
        class="rpl-primary-nav__secondary-logo-link rpl-u-focusable-outline rpl-u-focusable-outline--no-border"
        :url="secondaryLogo.href"
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
      </RplLink>
    </div>

    <ul class="rpl-primary-nav__nav-bar-actions-list">
      <!-- Mobile menu toggle -->
      <li class="rpl-primary-nav__nav-bar-mobile-menu-toggle-container">
        <RplPrimaryNavBarAction
          type="toggle"
          href="/"
          :active="isMegaNavActive"
          focusKey="menu:toggle"
          @click="toggleMobileMenu(mobileToggleLabel)"
        >
          <span>{{ mobileToggleLabel }}</span
          >&NoBreak;<span
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
          :id="item.id"
          type="toggle"
          :href="item.url"
          :active="isItemActive(item)"
          :focusKey="`list:1:${item.id}`"
          @click="handleToggleItem(1, item)"
        >
          <span>{{ item.text }}</span
          >&NoBreak;<span class="rpl-primary-nav__nav-bar-icon rpl-u-margin-l-2"
            ><RplIcon name="icon-chevron-down" size="xs"></RplIcon
          ></span>
        </RplPrimaryNavBarAction>
        <RplPrimaryNavBarAction
          v-else
          :id="item.id"
          type="link"
          :href="item.url"
          :active="item.active"
          :focusKey="`list:1:${item.id}`"
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
