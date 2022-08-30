<script lang="ts">
export default { name: 'RplVerticalNavChildList' }
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { RplListItemArray } from '../list/constants'
import RplVerticalNavLink from './link.vue'

defineProps({
  items: {
    type: Array as PropType<typeof RplListItemArray[]>,
    default: () => []
  },
  level: {
    type: Number,
    required: true
  },
  isExpanded: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <ul
    :class="`
      rpl-vertical-nav__list
      rpl-vertical-nav__list--level-${level}
      rpl-type-p-small
    `"
  >
    <li
      v-for="(item, index) in items"
      :key="index"
      class="rpl-vertical-nav__list-item"
    >
      <RplVerticalNavLink
        :text="item.text"
        :href="item.url"
        :active="item?.active"
        :show-child-icon="level > 2"
        :tabindex="isExpanded ? '0' : '-1'"
      />

      <RplVerticalNavChildList
        v-if="item.items"
        :items="item.items"
        :level="level+1"
        :is-expanded="isExpanded"
      />
    </li>
  </ul>
</template>
