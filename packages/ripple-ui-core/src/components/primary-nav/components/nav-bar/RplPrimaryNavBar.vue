<script setup lang="ts">
import { inject, useSlots, computed } from 'vue'
import RplIcon from '../../../icon/RplIcon.vue'
import RplPrimaryNavBarAction from './RplPrimaryNavBarAction.vue'
import type {
  IRplPrimaryNavLogo,
  IRplPrimaryNavItem,
  IRplPrimaryNavActiveItems,
  RplPrimaryNavToggleItemOptions
} from '../../constants'
import {
  useRippleEvent,
  type rplEventPayload
} from '../../../../composables/useRippleEvent'
import useEmptySlotCheck from '../../../../composables/useEmptySlotCheck'
import VicGovLogo from './../../../../assets/logos/logo-vic-gov.svg?component'
import type { IRplFeatureFlags } from './../../../../index'

const { disablePrimaryLogo, primaryNavNowrap }: IRplFeatureFlags = inject(
  'featureFlags',
  {
    disablePrimaryLogo: false,
    primaryNavNowrap: false
  }
)

interface Props {
  primaryLogo: IRplPrimaryNavLogo
  secondaryLogo?: IRplPrimaryNavLogo
  items: IRplPrimaryNavItem[]
  showSearch: boolean
  showQuickExit: boolean
  isMegaNavActive: boolean
  isSearchActive: boolean
  activeNavItems: IRplPrimaryNavActiveItems
  toggleMobileMenu: (...args: any) => void
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

const slots = useSlots()
const userActionSlotIsEmpty = useEmptySlotCheck(slots.userAction)

const mobileToggleLabel = 'Menu'

const isItemActive = (item: IRplPrimaryNavItem) =>
  props.activeNavItems.level1?.id == item.id

const handleToggleItem = (level: number, item: IRplPrimaryNavItem) => {
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

  props.toggleItem(level as 3 | 2 | 1, item)
}

const showMobileToggle = computed(() => {
  return !!props.items?.length || !userActionSlotIsEmpty.value
})
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
        <RplImg
          v-else
          class="rpl-primary-nav__primary-logo-image rpl-u-screen-only"
          :src="primaryLogo.src"
          :alt="primaryLogo.altText"
          sizes="xs:106px"
        />
        <RplImg
          v-if="primaryLogo?.src"
          class="rpl-primary-nav__primary-logo-image rpl-primary-nav__logo-alt rpl-u-print-only"
          :src="primaryLogo?.printSrc ? primaryLogo?.printSrc : primaryLogo.src"
          :alt="primaryLogo.altText"
          sizes="xs:106px"
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
        <RplImg
          class="rpl-primary-nav__secondary-logo-image rpl-u-screen-only"
          :src="secondaryLogo.src"
          :alt="secondaryLogo.altText"
          sizes="xs:148px"
        />
        <RplImg
          v-if="secondaryLogo.printSrc"
          class="rpl-primary-nav__secondary-logo-image rpl-primary-nav__logo-alt rpl-u-print-only"
          :src="secondaryLogo.printSrc"
          :alt="secondaryLogo.altText"
          sizes="xs:148px"
        />
      </RplLink>
    </div>

    <ul
      :class="[
        'rpl-primary-nav__nav-bar-actions-list',
        { 'rpl-primary-nav__nav-bar-actions-list--nowrap': primaryNavNowrap }
      ]"
    >
      <!-- Mobile menu toggle -->
      <li
        v-if="showMobileToggle"
        class="rpl-primary-nav__nav-bar-mobile-menu-toggle-container"
      >
        <RplPrimaryNavBarAction
          type="toggle"
          href="/"
          :active="isMegaNavActive"
          focusKey="menu:toggle"
          aria-haspopup="true"
          aria-controls="megamenu"
          :aria-expanded="isMegaNavActive ? 'true' : 'false'"
          :aria-label="`${isMegaNavActive ? 'Close' : 'Open'} ${mobileToggleLabel}`"
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
          aria-haspopup="true"
          aria-controls="megamenu"
          :aria-expanded="isItemActive(item) ? 'true' : 'false'"
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
          aria-haspopup="true"
          aria-controls="search-megamenu"
          :aria-expanded="isSearchActive ? 'true' : 'false'"
          :aria-label="`${isSearchActive ? 'Close' : 'Open'} Search`"
          @click="toggleSearch()"
        >
          <template v-if="!isSearchActive">
            <span class="rpl-primary-nav__nav-bar-search-label">Search</span
            >&NoBreak;<span
              class="rpl-primary-nav__nav-bar-icon rpl-primary-nav__nav-bar-icon--large rpl-primary-nav__nav-bar-icon--search"
              ><RplIcon name="icon-search" aria-hidden="true"></RplIcon>
            </span>
          </template>
          <template v-else>
            <span class="rpl-primary-nav__nav-bar-search-label">Close</span
            >&NoBreak;<span
              class="rpl-primary-nav__nav-bar-icon rpl-primary-nav__nav-bar-icon--large rpl-primary-nav__nav-bar-icon--search"
              ><RplIcon name="icon-cancel"></RplIcon>
            </span>
          </template>
        </RplPrimaryNavBarAction>
      </li>
    </ul>
  </div>
</template>

<style src="./RplPrimaryNavBar.css" />
