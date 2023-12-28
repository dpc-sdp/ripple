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
  itemClass?: string | object
  containerClass?: string | object
  depth?: number
  maxDepth?: number | null
  iconPlacement?: RplIconPlacement
  withLinkIds?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  type: 'ul',
  itemClass: '',
  containerClass: '',
  depth: 0,
  maxDepth: null,
  iconPlacement: 'before',
  withLinkIds: false
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

const handleClick = (item: IRplListItemArray, index: number) => {
  emitRplEvent('itemClick', {
    action: 'click',
    value: item.url,
    text: item.text,
    index: index + 1,
    type: item?.type
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
    <template v-for="(item, index) of items" :key="index">
      <li
        v-if="item.url || item.text"
        :class="['rpl-list__item', itemClass ? itemClass : null]"
      >
        <RplTextLink
          v-if="item.url"
          :id="withLinkIds ? item.id : undefined"
          :url="item.url"
          class="rpl-list__link"
          @click="() => handleClick(item, index)"
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
        ></RplList></li
    ></template>
  </component>
</template>
