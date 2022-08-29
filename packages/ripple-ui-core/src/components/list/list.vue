<script lang="ts">
export default { name: 'RplList' }
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { RplListTypes, RplListItemArray } from './constants'

import RplIcon from '../icon/icon.vue'
import RplList from '../list/list.vue'
import RplTextLink from '../text-link/text-link.vue'

defineProps({
  items: {
    type: Array as PropType<typeof RplListItemArray[]>,
    default: () => []
  },
  type: {
    type: String as PropType<typeof RplListTypes[number]>,
    default: 'ul'
  },
  itemClass: {
    type: String,
    default: ''
  },
  containerClass: {
    type: String,
    default: ''
  },
  depth: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <component
    :is="type"
    v-if="items.length > 0"
    :class="['rpl-list__items', containerClass ? containerClass : null]"
  >
    <li
      v-for="(item, index) of items"
      :key="index"
      :class="['rpl-list__item', itemClass ? itemClass : null]"
    >
      <RplTextLink v-if="item.url" :url="item.url" class="rpl-list__link">
        <span v-if="depth > 0" class="rpl-icon--child"></span>
        <RplIcon
          v-if="item.icon"
          :name="item.icon"
          class="rpl-list__icon"
        ></RplIcon
        ><span class="rpl-list__label">{{ item.text }}</span>
      </RplTextLink>
      <RplList
        v-if="item.items"
        :key="`${depth}-${index}`"
        :items="item.items"
        :item-class="itemClass"
        container-class="rpl-list__items--sub"
        :depth="depth + 1"
      ></RplList>
    </li>
  </component>
</template>
