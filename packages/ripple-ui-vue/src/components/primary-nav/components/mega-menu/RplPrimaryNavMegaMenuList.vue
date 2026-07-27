<script setup lang="ts">
import RplPrimaryNavMegaMenuAction from './RplPrimaryNavMegaMenuAction.vue'
import {
  IRplPrimaryNavItem,
  IRplPrimaryNavActiveItems,
  RplPrimaryNavToggleItemOptions
} from '../../constants'
import RplPrimaryNavMegaMenuHomeButton from './RplPrimaryNavMegaMenuHomeButton.vue'

interface Props {
  parent?: IRplPrimaryNavItem
  items: IRplPrimaryNavItem[]
  level: 1 | 2 | 3 | 4
  activeNavItems: IRplPrimaryNavActiveItems
  toggleItem?: (...args: RplPrimaryNavToggleItemOptions) => void
}

withDefaults(defineProps<Props>(), {
  parent: undefined,
  toggleItem: undefined
})
</script>

<template>
  <ul
    :class="`
      rpl-primary-nav__mega-menu-list
      rpl-primary-nav__mega-menu-list--level-${level}
    `"
  >
    <!-- 'Home' link - Only visible on mobile -->
    <li v-if="level == 1">
      <RplPrimaryNavMegaMenuHomeButton />
    </li>

    <!-- Repeat of parent as a clickable link -->
    <li v-if="parent" class="rpl-primary-nav__mega-menu-item">
      <RplPrimaryNavMegaMenuAction
        :key="`${level}:${parent.id}`"
        :item="parent"
        :level="level"
        position="first"
        type="link"
        :toggle-item="toggleItem"
      />
    </li>

    <!-- Children -->
    <li v-for="(child, i) in items" :key="child.id">
      <RplPrimaryNavMegaMenuAction
        :item="child"
        :type="child.items?.length && level < 4 ? 'toggle' : 'link'"
        :level="level"
        :parent="parent?.id"
        :position="i === items.length - 1 ? 'last' : undefined"
        :active-nav-items="activeNavItems"
        :toggle-item="toggleItem"
      />
    </li>
  </ul>
</template>
