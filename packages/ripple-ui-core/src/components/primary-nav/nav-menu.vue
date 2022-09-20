<script lang="ts">
export default { name: 'RplPrimaryNavBarMenu' }
</script>

<script setup lang="ts">
import RplPrimaryNavMenuAction from './nav-menu-action.vue'
import { RplPrimaryNavItem } from './constants'

interface Props {
  item: RplPrimaryNavItem
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div class="rpl-primary-nav__nav-menu">
    <div class="rpl-primary-nav__section-title rpl-type-h3-fixed">
      {{ props.item.text }}
    </div>

    <ul class="rpl-primary-nav__nav-menu-list">
      <!-- Repeat of parent as a clickable link -->
      <li class="rpl-primary-nav__nav-menu-item">
        <RplPrimaryNavMenuAction :item="props.item" />
      </li>

      <!-- Children -->
      <li v-for="(child, childIndex) in props.item.items" :key="childIndex">
        <RplPrimaryNavMenuAction :item="child" />
      </li>
    </ul>
  </div>
</template>
