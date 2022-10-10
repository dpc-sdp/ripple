<script lang="ts">
export default { name: 'RplPrimaryNav' }
</script>

<script setup lang="ts">
/*
  TODO:
    - Fix menu disappearing before closing animation has finished
    - Investigate ways to handle tabbing order in mega nav levels
    - Setup functionality for primary nav to show / hide based on page scroll
      direction
    - Add sliding animation for mobile mega menu levels changing
*/
import { ref, computed } from 'vue'
import RplPrimaryNavBar from './nav-bar.vue'
import RplPrimaryNavMegaMenu from './mega-menu.vue'
import RplPrimaryNavSearchForm from './search-form.vue'
import { useExpandableState } from '../../composables/useExpandableState'

import { RplPrimaryNavLogo, RplPrimaryNavItem } from './constants'

interface Props {
  primaryLogo: RplPrimaryNavLogo
  secondaryLogo?: RplPrimaryNavLogo
  items: RplPrimaryNavItem[]
  showSearch?: boolean
  showQuickExit?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  secondaryLogo: undefined,
  showSearch: true,
  showQuickExit: true
})

const { isItemExpanded, toggleItem } = useExpandableState(
  [],
  props.items.length
)

const isMegaNavActive = ref(false)
const isSearchActive = ref(false)

const toggleNavBarItem = (id: string) => {
  // Make all other items besides the target id inactive
  props.items.forEach((item) => {
    if (item.id != id && isItemExpanded(item.id)) {
      toggleItem(item.id)
    }
  })

  // Toggle the target item
  toggleItem(id)

  // Make search inactive
  isSearchActive.value = false

  // If the target item is now active, make sure the mega nav is also active
  if (isItemExpanded(id) && !isMegaNavActive.value) {
    isMegaNavActive.value = true
  }

  // Else if the target item is now inactive, make sure the mega nav is also inactive
  else if (!isItemExpanded(id) && isMegaNavActive.value) {
    isMegaNavActive.value = false
  }
}

const toggleMegaNav = () => {
  // Make search inactive
  isSearchActive.value = false

  isMegaNavActive.value = !isMegaNavActive.value
}

const toggleSearch = () => {
  // Make all nav items inactive
  props.items.forEach((item) => {
    if (isItemExpanded(item.id)) {
      toggleItem(item.id)
    }
  })

  // Make mega nav inactive
  isMegaNavActive.value = false

  isSearchActive.value = !isSearchActive.value
}

const isPrimaryNavExpanded = computed(() => {
  return isMegaNavActive.value || isSearchActive.value ? true : false
})
</script>

<template>
  <nav
    :class="{
      'rpl-primary-nav': true,
      'rpl-primary-nav--expanded': isPrimaryNavExpanded
    }"
  >
    <!-- Nav bar -->
    <RplPrimaryNavBar
      :primary-logo="props.primaryLogo"
      :secondary-logo="props.secondaryLogo"
      :items="items"
      :show-search="props.showSearch"
      :show-quick-exit="props.showQuickExit"
      :is-mega-nav-active="isMegaNavActive"
      :is-search-active="isSearchActive"
      :is-item-expanded="isItemExpanded"
      :toggle-mega-nav="toggleMegaNav"
      :toggle-item="toggleNavBarItem"
      :toggle-search="toggleSearch"
    >
      <template v-if="$slots.userAction" #userAction>
        <slot name="userAction"></slot>
      </template>
    </RplPrimaryNavBar>

    <!-- Mega menu -->
    <RplPrimaryNavMegaMenu
      v-if="isMegaNavActive"
      :items="props.items"
      :show-quick-exit="props.showQuickExit"
      :is-item-expanded="isItemExpanded"
      :toggle-item="toggleItem"
    >
      <template #userAction>
        <slot name="userAction"></slot>
      </template>
    </RplPrimaryNavMegaMenu>

    <!-- Search form -->
    <RplPrimaryNavSearchForm v-if="isSearchActive" />
  </nav>
</template>

<style src="./primary-nav.css" />
