<script setup lang="ts">
import { computed, ref, type Ref, provide, useSlots } from 'vue'
import { useExpandableState } from '../../../composables/useExpandableState'
import {
  useRippleEvent,
  rplEventPayload
} from '../../../composables/useRippleEvent'
import RplAccordionItem from './RplAccordionItem.vue'
import type { AccordionItem } from '../constants'

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

const sharedActiveItems: Ref<string[]> = ref([])

sharedActiveItems.value.push(
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

sharedActiveItems.value.push(
  ...(slots.default
    ? slots.default().reduce((result: string[], current): string[] => {
        if (current.props?.active) {
          return [...result, itemise(current.props.id)]
        }
        return result
      }, [])
    : [])
)

const itemLength = computed(() =>
  props.items.length > 0
    ? props.items.length
    : (slots?.default?.()?.length as number) || 0
)

const { isItemExpanded, isAllExpanded, toggleItem } = useExpandableState(
  [],
  itemLength.value,
  sharedActiveItems
)

provide('activeItems', {
  sharedActiveItems: sharedActiveItems,
  totalItems: itemLength.value,
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

  if (!isAllExpanded()) {
    props.items.forEach((item) => {
      if (!isItemExpanded(itemise(item.id))) {
        toggleItem(itemise(item.id))
      }
    })
    slots.default?.().forEach((item) => {
      if (!isItemExpanded(itemise(item.props!.id))) {
        toggleItem(itemise(item.props!.id))
      }
    })
  } else {
    props.items.forEach((item) => {
      if (isItemExpanded(itemise(item.id))) {
        toggleItem(itemise(item.id))
      }
    })
    slots.default?.().forEach((item) => {
      if (isItemExpanded(itemise(item.props!.id))) {
        toggleItem(itemise(item.props!.id))
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

<style src="../RplAccordion.css" />
