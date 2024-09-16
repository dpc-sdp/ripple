<script setup lang="ts">
import { computed, ref, type Ref, provide, useSlots } from 'vue'
import RplContent from '../content/RplContent.vue'
import { useExpandableState } from '../../composables/useExpandableState'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'
import RplAccordionItem from './RplAccordionItem.vue'

type AccordionItem = {
  id: string
  title?: string
  content: string
  active: boolean
}

interface Props {
  id: string
  items?: AccordionItem[]
  numbered?: boolean
  displayToggleAll?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  numbered: false,
  displayToggleAll: true
})

const emit = defineEmits<{
  (
    e: 'toggleAll',
    payload: rplEventPayload & { action: 'open' | 'close' }
  ): void
  (
    e: 'toggleItem',
    payload: rplEventPayload & { action: 'open' | 'close' }
  ): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-accordion', emit)

const slots = useSlots()

const itemise = (inputId: string): string => `accordion-${props.id}-${inputId}`

const initialActiveIndexes: Ref<string[]> = ref([])

// Prop based items
initialActiveIndexes.value.push(
  ...props.items.reduce(
    (result: string[], current: AccordionItem): string[] => {
      if (current.active) {
        return [...result, itemise(current.id)]
      }

      return result
    },
    []
  )
)

// Slot based items
initialActiveIndexes.value.push(
  ...(slots.default
    ? slots.default().reduce((result: string[], current): string[] => {
        if (current.props.active) {
          return [...result, itemise(current.props.id)]
        }
        return result
      }, [])
    : [])
)

const sharedActiveItems = ref(initialActiveIndexes.value)

const itemLength = computed(() =>
  props.items.length > 0
    ? props.items.length
    : (slots?.default?.()?.length as number) || 0
)

const { isItemExpanded, isAllExpanded, toggleItem } = useExpandableState(
  initialActiveIndexes.value,
  itemLength.value,
  sharedActiveItems
)

provide('activeItems', {
  initialActiveIndexes: initialActiveIndexes,
  totalItems: itemLength.value,
  sharedActiveItems: sharedActiveItems,
  parentId: props.id
})

const toggleAll = () => {
  emitRplEvent(
    'toggleAll',
    {
      id: `accordion-${props.id}`,
      action: isAllExpanded() ? 'close' : 'open',
      text: toggleAllLabel.value
    },
    { global: true }
  )

  // Make all items active
  if (!isAllExpanded()) {
    // If the item is not expanded, make it expanded
    props.items.forEach((item) => {
      if (!isItemExpanded(itemise(item.id))) {
        toggleItem(itemise(item.id))
      }
    })
    slots.default?.().forEach((item) => {
      if (!isItemExpanded(itemise(item.props.id))) {
        toggleItem(itemise(item.props.id))
      }
    })
  }

  // Make all items inactive
  else {
    // If the item is expanded, make it not expanded
    props.items.forEach((item) => {
      if (isItemExpanded(itemise(item.id))) {
        toggleItem(itemise(item.id))
      }
    })
    slots.default?.().forEach((item) => {
      if (isItemExpanded(itemise(item.props.id))) {
        toggleItem(itemise(item.props.id))
      }
    })
  }
}

const toggleAllLabel = computed(
  () => `${isAllExpanded() ? 'Close' : 'Open'} all`
)
</script>

<template>
  <div :id="`accordion-${id}`" class="rpl-accordion">
    <!-- Toggle all -->
    <div
      v-if="displayToggleAll && itemLength > 1"
      class="rpl-accordion__toggle-all-wrapper rpl-u-screen-only"
    >
      <button
        class="rpl-accordion__toggle-all rpl-u-focusable-inline"
        @click="toggleAll()"
      >
        {{ toggleAllLabel }}
      </button>
    </div>

    <!-- Items -->
    <component
      :is="numbered ? 'ol' : 'ul'"
      v-if="itemLength > 0"
      class="rpl-accordion__items"
    >
      <RplAccordionItem
        v-for="(item, index) in items"
        :key="item.id"
        :item="item"
        :numbered="numbered"
        :index="index"
      />
      <slot />
    </component>
  </div>
</template>

<style src="./RplAccordion.css" />
