<script lang="ts">
export default { name: 'RplPrimaryNavMegaMenu' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import RplPrimaryNavBackButton from './mega-menu-back-button.vue'
import RplPrimaryNavMegaMenuList from './mega-menu-list.vue'
import RplPrimaryNavQuickExit from '../quick-exit/quick-exit.vue'
import { RplPrimaryNavItem, RplPrimaryNavActiveItems } from '../../constants'

interface Props {
  items: RplPrimaryNavItem[]
  showQuickExit: boolean
  activeNavItems: RplPrimaryNavActiveItems
  toggleItem: (level: 1 | 2 | 3, item: RplPrimaryNavItem) => void
}

const props = withDefaults(defineProps<Props>(), {})

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

const backButtonHandler = () => {
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
    props.toggleItem(1, props.activeNavItems.level1)
  }
}
</script>

<template>
  <div
    :class="`
      rpl-primary-nav__mega-menu
      rpl-primary-nav__mega-menu--current-level-${currentLevel}
    `"
  >
    <!-- Quick links (Quick exit / User action slot) -->
    <ul class="rpl-primary-nav__mega-menu-quick-links">
      <li v-if="showQuickExit"><RplPrimaryNavQuickExit /></li>
      <li
        v-if="$slots.userAction && $slots?.userAction()[0].children?.length"
        class="rpl-primary-nav__mega-menu-user-action"
      >
        <slot name="userAction"></slot>
      </li>
    </ul>

    <div class="rpl-primary-nav__mega-menu-grid-outer">
      <div class="rpl-primary-nav__mega-menu-grid-container">
        <div class="rpl-primary-nav__mega-menu-grid rpl-grid">
          <!-- Level 1 -->
          <div class="rpl-primary-nav__mega-menu-column">
            <!-- Section title - Desktop -->
            <div
              v-if="props.activeNavItems.level1"
              class="
                rpl-primary-nav__mega-menu-section-title
                rpl-primary-nav__mega-menu-section-title--desktop
                rpl-type-h3-fixed
              "
            >
              {{ props.activeNavItems.level1.text }}
            </div>

            <!-- List - Only visible on mobile -->
            <RplPrimaryNavMegaMenuList
              v-if="items.length"
              :level="1"
              :items="items ? items : []"
              :active-nav-items="activeNavItems"
              :toggle-item="toggleItem"
            />
          </div>

          <!-- Level 2 -->
          <div class="rpl-primary-nav__mega-menu-column">
            <!-- Back button - Only visible on mobile -->
            <RplPrimaryNavBackButton
              label="Main menu"
              @click="backButtonHandler()"
            />

            <!-- Section title - Mobile - Level 2 -->
            <div
              v-if="activeNavItems.level1"
              class="
                rpl-primary-nav__mega-menu-section-title
                rpl-primary-nav__mega-menu-section-title--mobile
                rpl-type-h3-fixed
              "
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
              class="
                rpl-primary-nav__mega-menu-section-title
                rpl-primary-nav__mega-menu-section-title--mobile
                rpl-type-h3-fixed
              "
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
              class="
                rpl-primary-nav__mega-menu-section-title
                rpl-primary-nav__mega-menu-section-title--mobile
                rpl-type-h3-fixed
              "
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
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./mega-menu.css" />
