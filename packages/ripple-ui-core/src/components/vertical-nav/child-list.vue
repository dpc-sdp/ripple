<script lang="ts">
export default { name: 'RplVerticalNavChildList' }
</script>

<script setup lang="ts">
import { RplVerticalNavItem } from './constants'
import RplVerticalNavLink from './link.vue'

interface Props {
  items: RplVerticalNavItem[]
  level: number
  isExpanded: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <ul
    :class="`
      rpl-vertical-nav__list
      rpl-vertical-nav__list--level-${props.level}
      rpl-type-p-small
    `"
  >
    <li
      v-for="(item, index) in props.items"
      :key="index"
      class="rpl-vertical-nav__list-item"
    >
      <RplVerticalNavLink
        :text="item.text"
        :href="item.url"
        :active="item?.active"
        :show-child-icon="props.level > 2"
        :tabindex="props.isExpanded ? '0' : '-1'"
      />

      <RplVerticalNavChildList
        v-if="item.items"
        :items="item.items"
        :level="props.level + 1"
        :is-expanded="props.isExpanded"
      />
    </li>
  </ul>
</template>
