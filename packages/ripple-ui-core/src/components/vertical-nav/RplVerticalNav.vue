<script setup lang="ts">
import RplVerticalNavList from './RplVerticalNavList.vue'
import { useExpandableState } from '../../composables/useExpandableState'
import { IRplVerticalNavItem, IRplVerticalNavProcessed } from './constants'
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

// Because toggle-able item aren't actually links,
// we need to ensure that the first child of each toggle is a link to that page
// we also need to recursively get a flat array of active indexes for useExpandableState
const processedItems = computed<IRplVerticalNavProcessed>(
  (): IRplVerticalNavProcessed => {
    let active = []

    const processItem = (
      item: IRplVerticalNavItem,
      repeat = false,
      depth = 1
    ): IRplVerticalNavItem => {
      const nextLevel = depth + 1

      if (item.active) {
        active.push(item.id)
      }

      if (item.url && item.items?.length && repeat) {
        return {
          ...item,
          items: [
            {
              id: item.id,
              text: item.text,
              url: item.url,
              active: item.active && !item.items.some((i) => i.active)
            },
            ...(item.items || []).map((child) =>
              processItem(child, nextLevel <= props.toggleLevels, nextLevel)
            )
          ]
        }
      }

      return item
    }

    const items = (props.items || []).map((item) => processItem(item, true))

    return { active, items }
  }
)

const { isItemExpanded, toggleItem } = useExpandableState(
  processedItems.value.active,
  processedItems.value.items.length
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
      :items="processedItems.items"
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
