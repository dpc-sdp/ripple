<script lang="ts">
export default { name: 'RplPrimaryNavMenuList' }
</script>

<script setup lang="ts">
import RplPrimaryNavMenuAction from './nav-menu-action.vue'
import { RplPrimaryNavItem } from './constants'

interface Props {
  parent: RplPrimaryNavItem
  items: RplPrimaryNavItem[]
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <ul class="rpl-primary-nav__nav-menu-list">
    <!-- Repeat of parent as a clickable link -->
    <li class="rpl-primary-nav__nav-menu-item">
      <RplPrimaryNavMenuAction :item="props.parent" />
    </li>

    <!-- Children -->
    <li v-for="(child, childIndex) in props.items" :key="childIndex">
      <RplPrimaryNavMenuAction :item="child" />
    </li>
  </ul>
</template>
