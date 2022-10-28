<script lang="ts">
export default { name: 'RplPrimaryNavMegaMenu' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import RplPrimaryNavBackButton from './mega-menu-back-button.vue'
import RplPrimaryNavMegaMenuList from './mega-menu-list.vue'
import RplPrimaryNavQuickExit from './quick-exit.vue'
import { RplPrimaryNavItem } from './constants'

interface Props {
  items: RplPrimaryNavItem[]
  showQuickExit: boolean
  isItemExpanded: (id: string) => boolean
  toggleItem: (id: string) => void
}

const props = withDefaults(defineProps<Props>(), {})

const level2ActiveItem = computed(() => {
  return props.items?.find((item) => props.isItemExpanded(item.id))
})

const level3ActiveItem = computed(() => {
  return level2ActiveItem.value?.items?.find((item) =>
    props.isItemExpanded(item.id)
  )
})

const level4ActiveItem = computed(() => {
  return level3ActiveItem.value?.items?.find((item) =>
    props.isItemExpanded(item.id)
  )
})

const currentLevel = computed(() => {
  if (!level2ActiveItem.value) {
    return 1
  }

  if (!level3ActiveItem.value) {
    return 2
  }

  if (!level4ActiveItem.value) {
    return 3
  }

  return 4
})

const backButtonLabel = computed(() => {
  if (currentLevel.value == 4 && level3ActiveItem.value) {
    return level3ActiveItem.value.text
  }

  if (currentLevel.value == 3 && level2ActiveItem.value) {
    return level2ActiveItem.value.text
  }

  return 'Main menu'
})

const backButtonHandler = () => {
  // Go back to level 3
  if (currentLevel.value == 4 && level4ActiveItem.value) {
    props.toggleItem(level4ActiveItem.value.id)
  }

  // Go back to level 2
  else if (currentLevel.value == 3 && level3ActiveItem.value) {
    props.toggleItem(level3ActiveItem.value.id)
  }

  // Go back to level 1
  else if (currentLevel.value == 2 && level2ActiveItem.value) {
    props.toggleItem(level2ActiveItem.value.id)
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
    <!-- Mobile links (Quick exit / User action slot) -->
    <ul class="rpl-primary-nav__mega-menu-mobile-links">
      <li v-if="props.showQuickExit"><RplPrimaryNavQuickExit /></li>
      <li v-if="$slots.userAction">
        <slot name="userAction"></slot>
      </li>
    </ul>

    <div class="rpl-primary-nav__mega-menu-grid-container">
      <div class="rpl-primary-nav__mega-menu-grid rpl-grid">
        <!-- Section title - Desktop -->
        <div
          v-if="level2ActiveItem"
          class="
            rpl-primary-nav__mega-menu-section-title
            rpl-primary-nav__mega-menu-section-title--desktop
            rpl-type-h3-fixed rpl-col-12-l rpl-col-3-xl
          "
        >
          {{ level2ActiveItem.text }}
        </div>

        <!-- Level 1 - Only visible on mobile -->
        <div class="rpl-col-4-l rpl-col-3-xl">
          <RplPrimaryNavMegaMenuList
            v-if="props.items.length"
            level="1"
            :items="props.items ? props.items : []"
            :is-item-expanded="isItemExpanded"
            :toggle-item="toggleItem"
          />
        </div>

        <!-- Level 2 -->
        <div class="rpl-col-4-l rpl-col-3-xl">
          <!-- Back button - Only visible on mobile -->
          <RplPrimaryNavBackButton
            :label="backButtonLabel"
            @click="backButtonHandler()"
          />

          <!-- Section title - Mobile - Level 2 -->
          <div
            v-if="level2ActiveItem"
            class="
              rpl-primary-nav__mega-menu-section-title
              rpl-primary-nav__mega-menu-section-title--mobile
              rpl-type-h3-fixed rpl-col-12
            "
          >
            {{ level2ActiveItem.text }}
          </div>

          <RplPrimaryNavMegaMenuList
            v-if="level2ActiveItem?.items?.length"
            level="2"
            :parent="level2ActiveItem"
            :items="level2ActiveItem.items ? level2ActiveItem.items : []"
            :is-item-expanded="isItemExpanded"
            :toggle-item="toggleItem"
          />
        </div>

        <!-- Level 3 -->
        <div class="rpl-col-4-l rpl-col-3-xl">
          <!-- Back button - Only visible on mobile -->
          <RplPrimaryNavBackButton
            :label="backButtonLabel"
            @click="backButtonHandler()"
          />

          <!-- Section title - Mobile - Level 3 -->
          <div
            v-if="level3ActiveItem"
            class="
              rpl-primary-nav__mega-menu-section-title
              rpl-primary-nav__mega-menu-section-title--mobile
              rpl-type-h3-fixed rpl-col-12
            "
          >
            {{ level3ActiveItem.text }}
          </div>

          <RplPrimaryNavMegaMenuList
            v-if="level3ActiveItem?.items?.length"
            level="3"
            :parent="level3ActiveItem"
            :items="level3ActiveItem.items ? level3ActiveItem.items : []"
            :is-item-expanded="isItemExpanded"
            :toggle-item="toggleItem"
          />
        </div>

        <!-- Level 4 -->
        <div class="rpl-col-4-l rpl-col-3-xl">
          <!-- Back button - Only visible on mobile -->
          <RplPrimaryNavBackButton
            :label="backButtonLabel"
            @click="backButtonHandler()"
          />

          <!-- Section title - Mobile - Level 4 -->
          <div
            v-if="level4ActiveItem"
            class="
              rpl-primary-nav__mega-menu-section-title
              rpl-primary-nav__mega-menu-section-title--mobile
              rpl-type-h3-fixed rpl-col-12
            "
          >
            {{ level4ActiveItem.text }}
          </div>

          <RplPrimaryNavMegaMenuList
            v-if="level4ActiveItem?.items?.length"
            level="4"
            :parent="level4ActiveItem"
            :items="level4ActiveItem.items ? level4ActiveItem.items : []"
            :is-item-expanded="isItemExpanded"
            :toggle-item="toggleItem"
          />
        </div>
      </div>
    </div>
  </div>
</template>
