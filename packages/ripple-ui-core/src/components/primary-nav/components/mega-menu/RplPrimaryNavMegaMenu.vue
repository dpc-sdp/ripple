<script setup lang="ts">
import { computed, useSlots } from 'vue'
import RplPrimaryNavBackButton from './RplPrimaryNavMegaMenuBackButton.vue'
import RplPrimaryNavMegaMenuList from './RplPrimaryNavMegaMenuList.vue'
import RplPrimaryNavQuickExit from '../quick-exit/RplPrimaryNavQuickExit.vue'
import type {
  IRplPrimaryNavItem,
  IRplPrimaryNavActiveItems,
  RplPrimaryNavToggleItemOptions
} from '../../constants'
import { type rplEventPayload, useRippleEvent } from '@dpc-sdp/ripple-ui-core'

interface Props {
  items: IRplPrimaryNavItem[]
  showQuickExit: boolean
  activeNavItems: IRplPrimaryNavActiveItems
  toggleItem: (...args: RplPrimaryNavToggleItemOptions) => void
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  (e: 'clickBackButton', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-primary-nav', emit)

const slots = useSlots()

const mainMenuBackLabel = 'Main menu'

const currentLevel = computed(() => {
  if (!props.activeNavItems.level1) {
    return 1
  }

  if (!props.activeNavItems.level2) {
    return 2
  }

  if (!props.activeNavItems.level3) {
    return 3
  }

  return 4
})

const hasUserActions = computed(() => {
  return slots.userAction && slots?.userAction()[0].children?.length
})

const backButtonHandler = (label: string) => {
  emitRplEvent(
    'clickBackButton',
    {
      action: 'click',
      text:
        label || props.activeNavItems['level' + (currentLevel.value - 2)]?.text,
      index: currentLevel.value - 1
    },
    { global: true }
  )

  // Go back to level 3
  if (currentLevel.value == 4 && props.activeNavItems.level3) {
    props.toggleItem(3, props.activeNavItems.level3)
  }

  // Go back to level 2
  else if (currentLevel.value == 3 && props.activeNavItems.level2) {
    props.toggleItem(2, props.activeNavItems.level2)
  }

  // Go back to level 1
  else if (currentLevel.value == 2 && props.activeNavItems.level1) {
    props.toggleItem(1, props.activeNavItems.level1, true)
  }
}
</script>

<template>
  <div
    id="megamenu"
    :class="`
      rpl-primary-nav__mega-menu
      rpl-primary-nav__mega-menu--current-level-${currentLevel}
    `"
  >
    <!-- Quick links (Quick exit / User action slot) -->
    <ul
      v-if="showQuickExit || hasUserActions"
      class="rpl-primary-nav__mega-menu-quick-links"
    >
      <li v-if="showQuickExit">
        <RplPrimaryNavQuickExit :parent="activeNavItems.level1?.id" />
      </li>
      <li v-if="hasUserActions" class="rpl-primary-nav__mega-menu-user-action">
        <slot name="userAction"></slot>
      </li>
    </ul>

    <div
      :class="{
        'rpl-primary-nav__mega-menu-grid-outer': true,
        'rpl-primary-nav__mega-menu-grid-outer--reduced': hasUserActions
      }"
    >
      <div class="rpl-primary-nav__mega-menu-grid-container">
        <div class="rpl-primary-nav__mega-menu-grid rpl-grid">
          <!-- Level 1 -->
          <div class="rpl-primary-nav__mega-menu-column">
            <!-- Section title - Desktop -->
            <div
              v-if="activeNavItems.level1"
              class="rpl-primary-nav__mega-menu-section-title rpl-primary-nav__mega-menu-section-title--desktop rpl-type-h3-fixed"
            >
              {{ activeNavItems.level1.text }}
            </div>

            <!-- List - Only visible on mobile -->
            <RplPrimaryNavMegaMenuList
              v-if="items.length"
              :level="1"
              :items="items ? items : []"
              :active-nav-items="activeNavItems"
              :toggle-item="toggleItem"
              aria-label="Main menu"
            />
          </div>

          <!-- Level 2 -->
          <div class="rpl-primary-nav__mega-menu-column">
            <!-- Back button - Only visible on mobile -->
            <RplPrimaryNavBackButton
              :label="mainMenuBackLabel"
              @click="backButtonHandler(mainMenuBackLabel)"
            />

            <!-- Section title - Mobile - Level 2 -->
            <div
              v-if="activeNavItems.level1"
              class="rpl-primary-nav__mega-menu-section-title rpl-primary-nav__mega-menu-section-title--mobile rpl-type-h3-fixed"
            >
              {{ activeNavItems.level1.text }}
            </div>

            <RplPrimaryNavMegaMenuList
              v-if="activeNavItems.level1?.items?.length"
              :level="2"
              :parent="activeNavItems.level1"
              :items="
                activeNavItems.level1.items ? activeNavItems.level1.items : []
              "
              :active-nav-items="activeNavItems"
              :toggle-item="toggleItem"
              :aria-label="`${activeNavItems.level1.text} level 2 menu`"
            />
          </div>

          <!-- Level 3 -->
          <div class="rpl-primary-nav__mega-menu-column">
            <!-- Back button - Only visible on mobile -->
            <RplPrimaryNavBackButton
              v-if="activeNavItems.level1"
              :label="activeNavItems.level1.text"
              @click="backButtonHandler()"
            />

            <!-- Section title - Mobile - Level 3 -->
            <div
              v-if="activeNavItems.level2"
              class="rpl-primary-nav__mega-menu-section-title rpl-primary-nav__mega-menu-section-title--mobile rpl-type-h3-fixed"
            >
              {{ activeNavItems.level2.text }}
            </div>

            <RplPrimaryNavMegaMenuList
              v-if="activeNavItems.level2?.items?.length"
              :level="3"
              :parent="activeNavItems.level2"
              :items="
                activeNavItems.level2.items ? activeNavItems.level2.items : []
              "
              :active-nav-items="activeNavItems"
              :toggle-item="toggleItem"
              :aria-label="`${activeNavItems.level2.text} level 3 menu`"
            />
          </div>

          <!-- Level 4 -->
          <div class="rpl-primary-nav__mega-menu-column">
            <!-- Back button - Only visible on mobile -->
            <RplPrimaryNavBackButton
              v-if="activeNavItems.level2"
              :label="activeNavItems.level2.text"
              @click="backButtonHandler()"
            />

            <!-- Section title - Mobile - Level 4 -->
            <div
              v-if="activeNavItems.level3"
              class="rpl-primary-nav__mega-menu-section-title rpl-primary-nav__mega-menu-section-title--mobile rpl-type-h3-fixed"
            >
              {{ activeNavItems.level3.text }}
            </div>

            <RplPrimaryNavMegaMenuList
              v-if="activeNavItems.level3?.items?.length"
              :level="4"
              :parent="activeNavItems.level3"
              :items="
                activeNavItems.level3.items ? activeNavItems.level3.items : []
              "
              :active-nav-items="activeNavItems"
              :toggle-item="toggleItem"
              :aria-label="`${activeNavItems.level3.text} level 4 menu`"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./RplPrimaryNavMegaMenu.css" />
