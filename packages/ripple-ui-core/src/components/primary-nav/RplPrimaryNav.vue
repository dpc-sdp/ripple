<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, useSlots } from 'vue'
import type { Ref } from 'vue'
import { useElementBounding } from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import RplPrimaryNavBar from './components/nav-bar/RplPrimaryNavBar.vue'
import RplPrimaryNavMegaMenu from './components/mega-menu/RplPrimaryNavMegaMenu.vue'
import RplPrimaryNavSearchForm from './components/search-form/RplPrimaryNavSearchForm.vue'

import {
  IRplPrimaryNavLogo,
  IRplPrimaryNavItem,
  IRplPrimaryNavActiveItems
} from './constants'

interface Props {
  primaryLogo: IRplPrimaryNavLogo
  secondaryLogo?: IRplPrimaryNavLogo
  items: IRplPrimaryNavItem[]
  showSearch?: boolean
  showQuickExit?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  secondaryLogo: undefined,
  showSearch: true,
  showQuickExit: true
})

const slots = useSlots()

const navContainer = ref()
const { activate: activateFocusTrap, deactivate: deactivateFocusTrap } =
  useFocusTrap(navContainer)
const { top: navOffest } = useElementBounding(navContainer)

const isHidden: Ref<boolean> = ref(false)
const isFixed: Ref<boolean> = ref(false)
const scrollPosition: Ref<number> = ref(0)
const isMegaNavActive: Ref<boolean> = ref(false)
const isSearchActive: Ref<boolean> = ref(false)
const activeNavItems: Ref<IRplPrimaryNavActiveItems> = ref({
  level1: undefined,
  level2: undefined,
  level3: undefined
})

const handleScroll = () => {
  const newPosition = window.scrollY
  const scrollingDown = newPosition > scrollPosition.value
  const beyondNav = navOffest.value <= 0

  scrollPosition.value = newPosition
  isHidden.value = scrollingDown && beyondNav
  isFixed.value = !scrollingDown && beyondNav
}

const handleEscapeKey = (event) => {
  if (event.key === 'Escape' && isExpanded) {
    isMegaNavActive.value = false
    isSearchActive.value = false
  }
}

onMounted(() => {
  // Run handleScroll when mounted in case an anchor link was used
  handleScroll()

  window.addEventListener('scroll', handleScroll)

  window.addEventListener('keydown', handleEscapeKey, false)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)

  window.removeEventListener('keydown', handleEscapeKey, false)

  document.body.classList.remove('rpl-u-viewport-locked')
  deactivateFocusTrap()
})

const toggleNavItem = (level: 1 | 2 | 3, item: IRplPrimaryNavItem) => {
  // Item needs to be made active
  if (activeNavItems.value['level' + level]?.id !== item?.id) {
    activeNavItems.value['level' + level] = item
  }

  // Item needs to be made inactive
  else {
    activeNavItems.value['level' + level] = undefined
  }

  if (level == 1) {
    // Make search inactive
    isSearchActive.value = false

    // If the target item is now active, make sure the mega nav is also active
    isMegaNavActive.value = activeNavItems.value.level1?.id == item.id

    // Clear any active sub menus
    activeNavItems.value.level2 = undefined
    activeNavItems.value.level3 = undefined
  } else if (level == 2) {
    activeNavItems.value.level3 = undefined
  }
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
    activeNavItems.value = {
      level1: undefined,
      level2: undefined,
      level3: undefined
    }
  }
})

watch(isExpanded, (newValue) => {
  // If running in a browser and isExpanded changes toggle viewport locked class
  // and focus trap
  if (typeof window !== 'undefined') {
    if (newValue) {
      document.body.classList.add('rpl-u-viewport-locked')
      activateFocusTrap()
    } else {
      document.body.classList.remove('rpl-u-viewport-locked')
      deactivateFocusTrap()
    }
  }
})

const classList = computed(() => {
  const classes = ['rpl-primary-nav']

  if (isHidden.value) {
    classes.push('rpl-primary-nav--hidden')
  }

  if (isFixed.value) {
    classes.push('rpl-primary-nav--fixed')
  }

  if (isExpanded.value) {
    classes.push('rpl-primary-nav--expanded')
  }

  let itemCount = props?.items?.length || 0

  if (props.showSearch) itemCount++
  if (slots.userAction) itemCount++
  if (props.secondaryLogo) itemCount++

  // Add classes to control when the desktop version of the nav bar appears
  // supplementary elements are counted too, i.e. search, userActions and secondaryLogo
  if (itemCount <= 6) {
    classes.push('rpl-primary-nav--collapse-until-l')
  } else if (itemCount === 7) {
    classes.push('rpl-primary-nav--collapse-until-xl')
  } else if (itemCount > 7) {
    classes.push('rpl-primary-nav--collapse-always')
  }

  return classes.join(' ')
})
</script>

<template>
  <nav ref="navContainer" :class="classList">
    <div class="rpl-primary-nav__inner">
      <!-- Nav bar -->
      <RplPrimaryNavBar
        :primary-logo="primaryLogo"
        :secondary-logo="secondaryLogo"
        :items="items"
        :show-search="showSearch"
        :show-quick-exit="showQuickExit"
        :is-mega-nav-active="isMegaNavActive"
        :is-search-active="isSearchActive"
        :active-nav-items="activeNavItems"
        :toggle-mobile-menu="toggleMobileMenu"
        :toggle-item="toggleNavItem"
        :toggle-search="toggleSearch"
      >
        <template v-if="$slots.userAction" #userAction>
          <slot name="userAction"></slot>
        </template>
      </RplPrimaryNavBar>

      <!-- Mega menu -->
      <RplPrimaryNavMegaMenu
        v-if="isMegaNavActive"
        :items="items"
        :show-quick-exit="showQuickExit"
        :active-nav-items="activeNavItems"
        :toggle-item="toggleNavItem"
      >
        <template #userAction>
          <slot name="userAction"></slot>
        </template>
      </RplPrimaryNavMegaMenu>

      <!-- Search form -->
      <RplPrimaryNavSearchForm
        v-if="isSearchActive"
        :show-quick-exit="showQuickExit"
      />
    </div>
  </nav>
</template>

<style src="./RplPrimaryNav.css" />
