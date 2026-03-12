<script setup lang="ts">
import RplVerticalNavList from './RplVerticalNavList.vue'
import { useExpandableState } from '../../composables/useExpandableState'
import { IRplVerticalNavItem } from './constants'
import { computed } from 'vue'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

interface Props {
  title?: string
  items: IRplVerticalNavItem[]
  toggleLevels?: number
}

const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  toggleLevels: 1
})

const emit = defineEmits<{
  (
    e: 'toggleMenuItem',
    payload: rplEventPayload & { action: 'open' | 'close' }
  ): void
  (e: 'navigate', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-vertical-nav', emit)

const getActiveItems = (
  items: IRplVerticalNavItem[],
  activeChain: string[] = []
): string[] => {
  let active: string[] = []

  for (const item of items) {
    if (item.active) {
      active.push(item.id)
    }
    if (item.items) {
      active = active.concat(
        getActiveItems(item.items, [...activeChain, item.id])
      )
    }
  }

  return active
}

const initiallyExpandedItems = computed<string[]>((): string[] => {
  if (!props.items?.length) {
    return []
  }

  return getActiveItems(props.items)
})

const { isItemExpanded, toggleItem } = useExpandableState(
  initiallyExpandedItems.value,
  props.items?.length || 0
)

const toggleID = (itemId) => `rpl-vertical-nav-${itemId}-toggle`

const handleToggle = (item: IRplVerticalNavItem) => {
  toggleItem(item.id)

  emitRplEvent(
    'toggleMenuItem',
    {
      id: toggleID(item.id),
      action: isItemExpanded(item.id) ? 'open' : 'close',
      text: item.text,
      name: props?.title
    },
    { global: true }
  )
}

const handleClick = (event) => {
  emitRplEvent(
    'navigate',
    {
      ...event,
      name: props?.title
    },
    { global: true }
  )
}
</script>

<template>
  <nav class="rpl-vertical-nav rpl-u-screen-only">
    <h3 v-if="title" class="rpl-vertical-nav__heading rpl-type-h3-fixed">
      {{ title }}
    </h3>
    <RplVerticalNavList
      :items="items"
      :level="1"
      :toggle-levels="toggleLevels"
      :is-expanded="isItemExpanded"
      :toggle-id="toggleID"
      :toggle-item="handleToggle"
      @item-click="handleClick"
    />
  </nav>
</template>

<style src="./RplVerticalNav.css" />
