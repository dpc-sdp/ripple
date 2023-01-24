<script lang="ts">
export default { name: 'RplList' }
</script>

<script setup lang="ts">
import { RplListTypes, RplListItemArray } from './constants'
import RplListContent from './list-content.vue'
import RplTextLink from '../text-link/text-link.vue'
import { RplIconPlacement } from '../icon/constants'
import { computed } from 'vue'

export interface Props {
  items?: RplListItemArray[]
  type?: RplListTypes
  itemClass?: string
  containerClass?: string
  depth?: number
  maxDepth?: number | null
  iconPlacement?: RplIconPlacement
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  type: 'ul',
  itemClass: '',
  containerClass: '',
  depth: 0,
  maxDepth: null,
  iconPlacement: 'before'
})

const shouldRenderChildren = computed(() => {
  if (props.maxDepth !== null) {
    return props.depth < props.maxDepth
  }
  return true
})
</script>

<template>
  <component
    :is="type"
    v-if="items.length > 0"
    :class="['rpl-list__items', containerClass ? containerClass : null]"
    :data-depth="depth"
  >
    <li
      v-for="(item, index) of items"
      :key="index"
      :class="['rpl-list__item', itemClass ? itemClass : null]"
    >
      <RplTextLink v-if="item.url" :url="item.url" class="rpl-list__link">
        <RplListContent
          :icon-name="item?.icon"
          :icon-colour="item?.iconColour"
          :icon-placement="iconPlacement"
          :depth="depth"
        >
          {{ item.text }}
        </RplListContent>
      </RplTextLink>
      <RplListContent
        v-else
        :icon-name="item?.icon"
        :icon-colour="item?.iconColour"
        :icon-placement="iconPlacement"
        :depth="depth"
      >
        {{ item.text }}
      </RplListContent>
      <RplList
        v-if="shouldRenderChildren && item.items"
        :key="`${depth}-${index}`"
        :items="item.items"
        :item-class="itemClass"
        container-class="rpl-list__items--sub"
        :depth="depth + 1"
      ></RplList>
    </li>
  </component>
</template>
