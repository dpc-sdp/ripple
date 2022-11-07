<script lang="ts">
export default { name: 'RplPrimaryNavMegaMenuList' }
</script>

<script setup lang="ts">
import RplIcon from '../icon/icon.vue'
import RplPrimaryNavMegaMenuAction from './mega-menu-action.vue'
import { RplPrimaryNavItem } from './constants'

interface Props {
  parent?: RplPrimaryNavItem
  items: RplPrimaryNavItem[]
  level: '1' | '2' | '3' | '4'
  isItemActive?: (id: string) => boolean
  toggleItem?: (id: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  parent: undefined,
  isItemActive: undefined,
  toggleItem: undefined
})
</script>

<template>
  <ul
    :class="`
      rpl-primary-nav__mega-menu-list
      rpl-primary-nav__mega-menu-list--level-${props.level}
    `"
  >
    <!-- 'Home' link - Only visible on mobile -->
    <li v-if="level == '1'">
      <a
        class="
          rpl-primary-nav__mega-menu-action
          rpl-primary-nav__mega-menu-action--home
          rpl-u-focusable-block rpl-type-p-small
        "
        href="/"
      >
        <span class="rpl-primary-nav__mega-menu-action-icon rpl-u-margin-r-2">
          <RplIcon name="icon-home" size="s" />
        </span>
        <span>Home</span>
      </a>
    </li>

    <!-- Repeat of parent as a clickable link -->
    <li v-if="parent" class="rpl-primary-nav__mega-menu-item">
      <RplPrimaryNavMegaMenuAction :item="props.parent" type="link" />
    </li>

    <!-- Children -->
    <li v-for="child in props.items" :key="child.id">
      <RplPrimaryNavMegaMenuAction
        :item="child"
        :type="child.items?.length ? 'toggle' : 'link'"
        :is-item-active="isItemActive"
        :toggle-item="toggleItem"
      />
    </li>
  </ul>
</template>
