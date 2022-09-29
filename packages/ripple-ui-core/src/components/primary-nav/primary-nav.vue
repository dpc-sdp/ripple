<script lang="ts">
export default { name: 'RplPrimaryNav' }
</script>

<script setup lang="ts">
/*
  TODO:
    - Fix menu disappearing before closing animation has finished
    - Setup functionality for primary nav to show / hide based on page scroll direction
    - Add mobile styling / markup
    - Improve example menu structure in storybook to reflect a real site example

  Reasons why useExpandableState maybe isn't a good idea:
    - Isnt using:
      itemsLength
      isAllExpanded()
    - Additional logic is required when toggling, e.g. if one toggles open,
      all other active items including search need to be closed
*/
import { ref, computed } from 'vue'
import RplPrimaryNavBar from './nav-bar.vue'
import RplPrimaryNavMenu from './nav-menu.vue'
import RplPrimaryNavSearchForm from './search-form.vue'
import { useExpandableState } from '../../composables/useExpandableState'

import { RplPrimaryNavLogo, RplPrimaryNavItem } from './constants'

interface Props {
  primaryLogo: RplPrimaryNavLogo
  secondaryLogo?: RplPrimaryNavLogo
  items: RplPrimaryNavItem[]
}

const props = withDefaults(defineProps<Props>(), {
  secondaryLogo: undefined
})

const { isItemExpanded, toggleItem } = useExpandableState(
  [],
  props.items.length
)

const isSearchOpen = ref(false)

const activeItem = computed(() => {
  return props.items.find((item) => isItemExpanded(item.id))
})

const toggleNavBarItem = (id: string) => {
  // Ensure all other items besides the target id are closed
  props.items.forEach((item) => {
    if (item.id != id && isItemExpanded(item.id)) {
      toggleItem(item.id)
    }
  })

  // Ensure search is not open
  isSearchOpen.value = false

  // Toggle the target id open
  toggleItem(id)
}

const toggleSearch = () => {
  // Any currently active nav items need to be toggled off
  props.items.forEach((item) => {
    if (isItemExpanded(item.id)) {
      toggleItem(item.id)
    }
  })

  isSearchOpen.value = !isSearchOpen.value
}

const isPrimaryNavOpen = computed(() => {
  return activeItem.value || isSearchOpen.value ? true : false
})
</script>

<template>
  <nav
    :class="{
      'rpl-primary-nav': true,
      'rpl-primary-nav--open': isPrimaryNavOpen
    }"
  >
    <!-- Nav bar -->
    <RplPrimaryNavBar
      :primary-logo="props.primaryLogo"
      :secondary-logo="props.secondaryLogo"
      :items="items"
      :is-item-expanded="isItemExpanded"
      :toggle-item="toggleNavBarItem"
      :toggle-search="toggleSearch"
    />

    <!-- Nav menu -->
    <RplPrimaryNavMenu
      v-if="activeItem"
      :item="activeItem"
      :is-item-expanded="isItemExpanded"
      :toggle-item="toggleItem"
    />

    <!-- Search form -->
    <RplPrimaryNavSearchForm v-if="isSearchOpen" />
  </nav>
</template>

<style src="./primary-nav.css" />
