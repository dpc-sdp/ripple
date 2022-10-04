<script lang="ts">
export default { name: 'RplPrimaryMegaMenuList' }
</script>

<script setup lang="ts">
import RplPrimaryNavMegaMenuAction from './mega-menu-action.vue'
import { RplPrimaryNavItem } from './constants'

interface Props {
  parent?: RplPrimaryNavItem
  items: RplPrimaryNavItem[]
  level: '1' | '2' | '3' | '4'
  isItemExpanded?: (id: string) => boolean
  toggleItem?: (id: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  parent: undefined,
  isItemExpanded: undefined,
  toggleItem: undefined
})
</script>

<template>
  <ul
    :class="`
      rpl-primary-nav__mega-menu-list
      rpl-primary-nav__mega-menu-list--level-${props.level}
      rpl-col-12
      rpl-col-4-l
      rpl-col-3-xl
    `"
  >
    <!-- Repeat of parent as a clickable link -->
    <li v-if="parent" class="rpl-primary-nav__mega-menu-item">
      <RplPrimaryNavMegaMenuAction :item="props.parent" type="link" />
    </li>

    <!-- Children -->
    <li v-for="child in props.items" :key="child.id">
      <RplPrimaryNavMegaMenuAction
        :item="child"
        :type="child.items?.length ? 'toggle' : 'link'"
        :is-item-expanded="isItemExpanded"
        :toggle-item="toggleItem"
      />
    </li>
  </ul>
</template>
