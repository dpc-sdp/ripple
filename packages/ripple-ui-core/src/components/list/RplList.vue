<script setup lang="ts">
import { RplListTypes, IRplListItemArray } from './constants'
import RplListContent from './RplListContent.vue'
import RplTextLink from '../text-link/RplTextLink.vue'
import { RplIconPlacement } from '../icon/constants'
import { computed } from 'vue'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

export interface Props {
  items?: IRplListItemArray[]
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

const emit = defineEmits<{
  (e: 'itemClick', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-list', emit)

const shouldRenderChildren = computed(() => {
  if (props.maxDepth !== null) {
    return props.depth < props.maxDepth
  }
  return true
})

const handleClick = (item) => {
  emitRplEvent('itemClick', {
    action: 'click',
    value: item.url,
    text: item.text
  })
}
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
      <RplTextLink
        v-if="item.url"
        :url="item.url"
        class="rpl-list__link"
        @click="() => handleClick(item)"
      >
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
