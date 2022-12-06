<script lang="ts">
export default { name: 'RplPrimaryNav' }
</script>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, useSlots } from 'vue'
import type { Ref } from 'vue'
import { UseFocusTrap } from '@vueuse/integrations/useFocusTrap/component'
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

const slots = useSlots()

const isHidden: Ref<boolean> = ref(false)
const isMegaNavActive: Ref<boolean> = ref(false)
const isSearchActive: Ref<boolean> = ref(false)
const activeNavItems: Ref<string[]> = ref([])

const handleScroll = () => {
  // If the page is not scrolled to the top, set isHidden to true
  isHidden.value = window.scrollY > 0 ? true : false
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

const classList = computed(() => {
  const classes = ['rpl-primary-nav']

  if (isHidden.value) {
    classes.push('rpl-primary-nav--hidden')
  }

  if (isExpanded.value) {
    classes.push('rpl-primary-nav--expanded')
  }

  let itemCount = props?.items?.length ? props.items.length : 0
  if (props.showSearch) {
    itemCount++
  }
  if (slots.userAction) {
    itemCount++
  }
  // Add classes to control when the desktop version of the nav bar appears
  // show mobile nav bar until 'xl' breakpoint if:
  // - nav bar has 6 items without secondary logo
  // - nav bar has 5 items with secondary logo
  // show mobile nav bar for all breakpoints if:
  // - nav bar has 7 or more items without secondary logo
  // - nav bar has 6 or more items with secondary logo
  // else show mobile nav bar until 'l' breakpoint
  if (
    (itemCount == 6 && !props.secondaryLogo) ||
    (itemCount == 5 && props.secondaryLogo)
  ) {
    classes.push('rpl-primary-nav--collapse-until-xl')
  } else if (
    (itemCount >= 7 && !props.secondaryLogo) ||
    (itemCount >= 6 && props.secondaryLogo)
  ) {
    classes.push('rpl-primary-nav--collapse-always')
  } else {
    classes.push('rpl-primary-nav--collapse-until-l')
  }

  return classes.join(' ')
})
</script>

<template>
  <nav :class="classList">
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
      <UseFocusTrap v-if="isMegaNavActive" :options="{ immediate: true }">
        <RplPrimaryNavMegaMenu
          :items="items"
          :show-quick-exit="showQuickExit"
          :is-item-active="isNavItemActive"
          :toggle-item="toggleNavItem"
        >
          <template #userAction>
            <slot name="userAction"></slot>
          </template>
        </RplPrimaryNavMegaMenu>
      </UseFocusTrap>

      <!-- Search form -->
      <UseFocusTrap v-if="isSearchActive" :options="{ immediate: true }">
        <RplPrimaryNavSearchForm :show-quick-exit="showQuickExit" />
      </UseFocusTrap>
    </div>
  </nav>
</template>

<style src="./primary-nav.css" />
