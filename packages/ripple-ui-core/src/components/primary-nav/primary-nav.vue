<script lang="ts">
export default { name: 'RplPrimaryNav' }
</script>

<script setup lang="ts">
/*
  TODO:
    - Setup slots for login / search buttons (currently hard coded)
    - Fix menu disappearing before closing animation has finished
    - Setup functionality for primary nav to show / hide based on page scroll direction
    - Add search bar component (currently in development)
    - Add mobile styling / markup
    - Improve example menu structure in storybook to reflect a real site example
*/
import { ref, computed } from 'vue'
import RplPrimaryNavBar from './nav-bar.vue'
import RplPrimaryNavMenu from './nav-menu.vue'

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
}

const activeItem = computed(() => {
  return items.value.find((item) => item.active)
})

const isPrimaryNavOpen = computed(() => {
  // TODO: Implement logic to check for search being active
  return activeItem.value ? true : false
})
</script>

<template>
  <nav
    :class="{
      'rpl-primary-nav': true,
      'rpl-primary-nav--open': isPrimaryNavOpen
    }"
  >
    <RplPrimaryNavBar
      :primary-logo="props.primaryLogo"
      :secondary-logo="props.secondaryLogo"
      :items="items"
      :toggle-item="toggleItem"
    />

    <RplPrimaryNavMenu v-if="activeItem" :item="activeItem" />
  </nav>
</template>

<style src="./primary-nav.css" />
