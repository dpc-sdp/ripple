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
*/
import { ref, computed } from 'vue'
import RplPrimaryNavBar from './nav-bar.vue'
import RplPrimaryNavMenu from './nav-menu.vue'
import RplPrimaryNavSearchForm from './search-form.vue'

import { RplPrimaryNavLogo, RplPrimaryNavItem } from './constants'

interface Props {
  primaryLogo: RplPrimaryNavLogo
  secondaryLogo?: RplPrimaryNavLogo
  items: RplPrimaryNavItem[]
}

const props = withDefaults(defineProps<Props>(), {
  secondaryLogo: undefined
})

const items = ref(props.items)

const toggleItem = (itemIndex: number) => {
  // Loop over items, if its the target itemIndex invert its active boolean,
  // otherwise set it to false
  items.value = items.value.map((item, index) => {
    item.active = index == itemIndex ? !item.active : false
    return item
  })

  // Ensure search is not active
  isSearchOpen.value = false
}

const activeItem = computed(() => {
  return items.value.find((item) => item.active)
})

const isSearchOpen = ref(false)

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value

  // Ensure no other nav bar items are active
  items.value = items.value.map((item) => {
    item.active = false
    return item
  })
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
      :toggle-item="toggleItem"
      :toggle-search="toggleSearch"
    />

    <!-- Nav menu -->
    <RplPrimaryNavMenu v-if="activeItem" :item="activeItem" />

    <!-- Search form -->
    <RplPrimaryNavSearchForm v-if="isSearchOpen" />
  </nav>
</template>

<style src="./primary-nav.css" />
