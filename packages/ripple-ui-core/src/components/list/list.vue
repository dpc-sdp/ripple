<script lang="ts">
export default { name: 'RplList' }
</script>

<script setup lang="ts">
import { RplListTypes, RplListItemArray } from './constants'

import RplIcon from '../icon/icon.vue'
import RplList from '../list/list.vue'
import RplTextLink from '../text-link/text-link.vue'
import { RplIconPlacement } from '../icon/constants'

export interface Props {
  items?: RplListItemArray[]
  type?: RplListTypes
  itemClass?: string
  containerClass?: string
  depth?: number
  iconPlacement?: RplIconPlacement
}

withDefaults(defineProps<Props>(), {
  items: () => [],
  type: 'ul',
  itemClass: '',
  containerClass: '',
  depth: 0,
  iconPlacement: 'before'
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
          v-if="item.icon && iconPlacement === 'before'"
          :name="item.icon"
          class="rpl-list__icon"
        ></RplIcon
        ><span class="rpl-list__label">{{ item.text }}</span
        ><RplIcon
          v-if="item.icon && iconPlacement === 'after'"
          :name="item.icon"
          class="rpl-list__icon"
        ></RplIcon>
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
