<script setup lang="ts">
import RplIcon from '../../../icon/RplIcon.vue'
import RplPrimaryNavMegaMenuAction from './RplPrimaryNavMegaMenuAction.vue'
import {
  IRplPrimaryNavItem,
  IRplPrimaryNavActiveItems,
  IRplPrimaryNavToggleItemOptions
} from '../../constants'

interface Props {
  parent?: IRplPrimaryNavItem
  items: IRplPrimaryNavItem[]
  level: 1 | 2 | 3 | 4
  activeNavItems: IRplPrimaryNavActiveItems
  toggleItem?: (...args: IRplPrimaryNavToggleItemOptions) => void
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
      <RplLink
        class="rpl-primary-nav__mega-menu-action rpl-primary-nav__mega-menu-action--home rpl-u-focusable-block rpl-type-p-small"
        url="/"
      >
        <span class="rpl-primary-nav__mega-menu-action-icon rpl-u-margin-r-2">
          <RplIcon name="icon-home" size="s" />
        </span>
        <span class="rpl-primary-nav__mega-menu-action-text">Home</span>
      </RplLink>
    </li>

    <!-- Repeat of parent as a clickable link -->
    <li v-if="parent" class="rpl-primary-nav__mega-menu-item">
      <RplPrimaryNavMegaMenuAction :item="parent" type="link" />
    </li>

    <!-- Children -->
    <li v-for="child in items" :key="child.id">
      <RplPrimaryNavMegaMenuAction
        :item="child"
        :type="child.items?.length ? 'toggle' : 'link'"
        :level="level"
        :active-nav-items="activeNavItems"
        :toggle-item="toggleItem"
      />
    </li>
  </ul>
</template>
