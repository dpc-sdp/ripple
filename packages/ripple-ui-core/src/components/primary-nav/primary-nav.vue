<script lang="ts">
export default { name: 'RplPrimaryNav' }
</script>

<script setup lang="ts">
/*
  TODO:
    - Add sliding animation for mobile mega menu levels changing
*/
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import RplPrimaryNavBar from './nav-bar.vue'
import RplPrimaryNavMegaMenu from './mega-menu.vue'
import RplPrimaryNavSearchForm from './search-form.vue'

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

const isHidden: Ref<boolean> = ref(false)
const isMegaNavActive: Ref<boolean> = ref(false)
const isSearchActive: Ref<boolean> = ref(false)
const activeNavItems: Ref<string[]> = ref([])

const handleScroll = () => {
  // If the page is not scrolled to the top, set isHidden to true
  isHidden.value = window.scrollY > 0 ? true : false
}

onMounted(() => {
  // Run handleScroll when mounted in case an anchor link was used
  handleScroll()

  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const isNavItemActive = (id: string) => {
  return activeNavItems.value.includes(id)
}

const toggleNavItem = (id: string) => {
  // Item needs to be made active
  if (isNavItemActive(id) == false) {
    activeNavItems.value.push(id)
  }

  // Item needs to be made inactive
  else {
    activeNavItems.value = activeNavItems.value.filter((item) => item != id)
  }
}

const toggleNavBarItem = (id: string) => {
  // Toggle the target item while also clearing any other active items
  activeNavItems.value = isNavItemActive(id) ? [] : [id]

  // Make search inactive
  isSearchActive.value = false

  // If the target item is now active, make sure the mega nav is also active
  isMegaNavActive.value = isNavItemActive(id)
}

const toggleMobileMenu = () => {
  // Make search inactive
  isSearchActive.value = false

  // Toggle mega nav
  isMegaNavActive.value = !isMegaNavActive.value
}

const toggleSearch = () => {
  // Make mega nav inactive
  isMegaNavActive.value = false

  // Toggle search
  isSearchActive.value = !isSearchActive.value
}

const isExpanded = computed(() => {
  return isMegaNavActive.value || isSearchActive.value
})

watch(isMegaNavActive, (newValue) => {
  // If mega nav closes, toggle off any currently active menu items
  if (!newValue) {
    activeNavItems.value = []
  }
})

watch(isExpanded, (newValue) => {
  // If running in a browser and isExpanded changes toggle viewport locked class
  if (typeof window !== 'undefined') {
    if (newValue) {
      document.body.classList.add('rpl-viewport-locked')
    } else {
      document.body.classList.remove('rpl-viewport-locked')
    }
  }
})
</script>

<template>
  <nav
    :class="{
      'rpl-primary-nav': true,
      'rpl-primary-nav--hidden': isHidden,
      'rpl-primary-nav--expanded': isExpanded
    }"
  >
    <div class="rpl-primary-nav__inner">
      <!-- Nav bar -->
      <RplPrimaryNavBar
        :primary-logo="props.primaryLogo"
        :secondary-logo="props.secondaryLogo"
        :items="items"
        :show-search="props.showSearch"
        :show-quick-exit="props.showQuickExit"
        :is-mega-nav-active="isMegaNavActive"
        :is-search-active="isSearchActive"
        :is-item-expanded="isNavItemActive"
        :toggle-mobile-menu="toggleMobileMenu"
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
        :is-item-expanded="isNavItemActive"
        :toggle-item="toggleNavItem"
      >
        <template #userAction>
          <slot name="userAction"></slot>
        </template>
      </RplPrimaryNavMegaMenu>

      <!-- Search form -->
      <RplPrimaryNavSearchForm v-if="isSearchActive" />
    </div>
  </nav>
</template>

<style src="./primary-nav.css" />
