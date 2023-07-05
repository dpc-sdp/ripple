<script setup lang="ts">
import RplVerticalNavLink from './RplVerticalNavLink.vue'
import RplVerticalNavToggle from './RplVerticalNavToggle.vue'
import RplVerticalNavChildList from './RplVerticalNavChildList.vue'
import RplExpandable from '../expandable/RplExpandable.vue'
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
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (
    e: 'toggleMenuItem',
    payload: rplEventPayload & { action: 'open' | 'close' }
  ): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-vertical-nav', emit)

// Because the top level items with children aren't actually links, we need to ensure that
// the first child of each top level item is a link to that page. These links
// have the same label as the parent item.
const processedItems = computed<IRplVerticalNavItem[]>(
  (): IRplVerticalNavItem[] => {
    return (props.items || []).map((item) => {
      if (item.url && item.items?.length) {
        return {
          ...item,
          items: [
            {
              id: item.id,
              text: item.text,
              url: item.url,
              active: item.active && !item.items.some((i) => i.active)
            },
            ...(item.items || [])
          ]
        }
      } else {
        return item
      }
    })
  }
)

const initialActiveIndexes: string[] = processedItems.value.reduce(
  (result: string[], current: IRplVerticalNavItem): string[] => {
    if (current.active) {
      return [...result, current.id]
    }

    return result
  },
  []
)

const { isItemExpanded, toggleItem } = useExpandableState(
  initialActiveIndexes,
  processedItems.value.length
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
      label: props?.title
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

    <ul
      class="rpl-vertical-nav__list rpl-vertical-nav__list--level-1 rpl-type-p-small"
    >
      <li
        v-for="(item, index) in processedItems"
        :key="index"
        :class="{
          'rpl-vertical-nav__list-item': true,
          'rpl-vertical-nav__list-item--expanded': isItemExpanded(item.id)
        }"
      >
        <RplVerticalNavToggle
          v-if="item.items"
          :id="toggleID(item.id)"
          :text="item.text"
          @click="() => handleToggle(item)"
        />

        <RplExpandable
          v-if="item.items"
          :aria-labelledby="`rpl-vertical-nav-${item.id}-toggle`"
          :aria-hidden="isItemExpanded(item.id) === false ? 'true' : null"
          :expanded="isItemExpanded(item.id)"
          class="rpl-vertical-nav__list-item-children"
        >
          <RplVerticalNavChildList
            :items="item.items"
            :level="2"
            :is-expanded="isItemExpanded(item.id)"
          />
        </RplExpandable>

        <RplVerticalNavLink
          v-else
          :text="item.text"
          :href="item.url"
          :active="item?.active && !item.items?.some((i) => i.active)"
        />
      </li>
    </ul>
  </nav>
</template>

<style src="./RplVerticalNav.css" />
