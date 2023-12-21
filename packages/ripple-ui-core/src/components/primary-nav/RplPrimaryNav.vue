<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  onMounted,
  onUnmounted,
  useSlots,
  provide
} from 'vue'
import type { Ref } from 'vue'
import { useBreakpoints, useElementBounding } from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import RplPrimaryNavBar from './components/nav-bar/RplPrimaryNavBar.vue'
import RplPrimaryNavMegaMenu from './components/mega-menu/RplPrimaryNavMegaMenu.vue'
import RplPrimaryNavSearchForm from './components/search-form/RplPrimaryNavSearchForm.vue'
import { bpMin } from '../../lib/breakpoints'
import {
  IRplPrimaryNavLogo,
  IRplPrimaryNavItem,
  IRplPrimaryNavActiveItems,
  IRplPrimaryNavFocusOptions
} from './constants'
import RplPrimaryNavQuickExit from './components/quick-exit/RplPrimaryNavQuickExit.vue'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'
import { useViewportHeight } from '../../composables/useViewportHeight'

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

const emit = defineEmits<{
  (e: 'toggleMenu', payload: rplEventPayload & { action: 'open' | 'close' })
  (e: 'toggleSearch', payload: rplEventPayload & { action: 'open' | 'close' })
}>()

const slots = useSlots()
const { emitRplEvent } = useRippleEvent('rpl-primary-nav', emit)

const navContainer = ref()
const { activate: activateFocusTrap, deactivate: deactivateFocusTrap } =
  useFocusTrap(navContainer)
const { top: navOffest } = useElementBounding(navContainer)
const bp = useBreakpoints(bpMin)
const height = useViewportHeight()

const isLargeScreen = bp.greaterOrEqual('l')
const isXLargeScreen = bp.greaterOrEqual('xl')

const focus: Ref<string> = ref('')
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
  const beyondNav = navOffest.value < 0

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

const toggleNavItem = (
  level: 1 | 2 | 3,
  item: IRplPrimaryNavItem,
  open: boolean
) => {
  // Item needs to be made active
  if (activeNavItems.value['level' + level]?.id !== item?.id) {
    activeNavItems.value['level' + level] = item
  }

  // Item needs to be made inactive
  else {
    activeNavItems.value['level' + level] = undefined
  }

  if (level == 1) {
    const keepNavOpen = open || (navCollapse.value.collapsed && level === 1)

    // Make search inactive
    isSearchActive.value = false

    // If the target item is now active, make sure the mega nav is also active
    isMegaNavActive.value =
      keepNavOpen || activeNavItems.value.level1?.id == item.id

    // Clear any active sub menus
    activeNavItems.value.level2 = undefined
    activeNavItems.value.level3 = undefined
  } else if (level == 2) {
    activeNavItems.value.level3 = undefined
  }
}

const toggleMobileMenu = (text) => {
  // Make search inactive
  isSearchActive.value = false

  // Toggle mega nav
  isMegaNavActive.value = !isMegaNavActive.value

  emitRplEvent(
    'toggleMenu',
    {
      text,
      action: isMegaNavActive.value ? 'open' : 'close'
    },
    { global: true }
  )
}

const toggleSearch = () => {
  // Make mega nav inactive
  isMegaNavActive.value = false

  // Toggle search
  isSearchActive.value = !isSearchActive.value

  emitRplEvent(
    'toggleSearch',
    {
      action: isSearchActive.value ? 'open' : 'close'
    },
    { global: true }
  )
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

// Determine when the collapsed version of the nav bar appears
// supplementary elements are counted in nav bar total, i.e. search, userActions and secondaryLogo
const navCollapse = computed(() => {
  let collapsed = true
  let breakpoint = 'default'
  let count = props?.items?.length || 0

  if (props.showSearch) count++
  if (slots.userAction) count++
  if (props.secondaryLogo) count++

  if (count <= 6) {
    breakpoint = 'l'
    collapsed = !isLargeScreen.value
  } else if (count === 7) {
    breakpoint = 'xl'
    collapsed = !isXLargeScreen.value
  } else if (count > 7) {
    breakpoint = 'always'
  }

  return { breakpoint, collapsed }
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

  classes.push(
    `rpl-primary-nav--collapse-until-${navCollapse.value.breakpoint}`
  )

  return classes.join(' ')
})

const navFocus: IRplPrimaryNavFocusOptions = {
  focus,
  setFocus: (target: string) => (focus.value = target),
  navCollapsed: navCollapse.value.collapsed,
  hasQuickExit: props.showQuickExit,
  hasUserActions: Boolean(slots.userAction)
}
provide('navFocus', navFocus)
</script>

<template>
  <nav ref="navContainer" :class="classList" aria-label="Primary navigation">
    <div
      class="rpl-primary-nav__inner"
      :style="`--local-expanded-height: ${height}px`"
    >
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
    <RplPrimaryNavQuickExit v-if="showQuickExit" variant="fixed" />
  </nav>
</template>

<style src="./RplPrimaryNav.css" />
