<script setup lang="ts">
import { IRplVerticalNavItem } from './constants'
import RplVerticalNavLink from './RplVerticalNavLink.vue'

interface Props {
  items: IRplVerticalNavItem[]
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
        :active="item?.active && !item?.items?.length"
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
