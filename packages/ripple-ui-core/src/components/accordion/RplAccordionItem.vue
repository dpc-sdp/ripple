<script lang="ts" setup>
import { inject, ref, computed, useSlots } from 'vue'
import RplIcon from '../icon/RplIcon.vue'
import RplExpandable from '../expandable/RplExpandable.vue'
import { useExpandableState } from '../../composables/useExpandableState'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

type AccordionItem = {
  id: string
  title?: string
  content: string
  active: boolean
}

interface Props {
  item?: AccordionItem
  index?: number
  numbered?: boolean
  id?: string
  active?: boolean
}

const props = defineProps<Props>()

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

const { initialActiveIndexes, totalItems, sharedActiveItems, parentId } =
  inject('activeItems', {
    initialActiveIndexes: [],
    totalItems: 0,
    sharedActiveItems: ref<string[]>(),
    parentId: ''
  })

const { isItemExpanded, toggleItem } = useExpandableState(
  initialActiveIndexes,
  totalItems,
  sharedActiveItems
)

const toggleSingle = () => {
  emitRplEvent(
    'toggleItem',
    {
      id: itemId.value,
      action: isItemExpanded(itemId.value) ? 'close' : 'open',
      text: itemTitle.value as string
    },
    { global: true }
  )

  toggleItem(itemId.value)
}

const itemId = computed(
  () => `accordion-${parentId}-${props.item?.id || props.id}`
)

const itemTitle = computed(
  () => props.item?.title || slots?.title?.()?.[0]?.children
)
</script>

<template>
  <li
    :id="itemId"
    :key="item?.id"
    :class="{
      'rpl-accordion__item': true,
      'rpl-accordion__item--active': isItemExpanded(itemId)
    }"
  >
    <button
      :id="`${itemId}-toggle`"
      class="rpl-accordion__item-toggle rpl-u-focusable-block"
      type="button"
      :aria-controls="`${itemId}-content`"
      :aria-expanded="isItemExpanded(itemId)"
      @click="toggleSingle"
    >
      <span class="rpl-accordion__item-heading-wrapper">
        <span v-if="numbered" class="rpl-accordion__item-number rpl-type-h4">
          {{ index + 1 }}
        </span>

        <span class="rpl-accordion__item-heading rpl-type-h4">
          {{ itemTitle }}
        </span>
      </span>

      <span
        class="rpl-accordion__item-icon rpl-u-screen-only"
        aria-hidden="true"
      >
        <RplIcon name="icon-chevron-down"></RplIcon>
      </span>
    </button>

    <RplExpandable
      :id="`${itemId}-content`"
      :aria-labelledby="`${itemId}-toggle`"
      :aria-hidden="isItemExpanded(itemId) === false ? 'true' : null"
      :expanded="isItemExpanded(itemId)"
      class="rpl-accordion__item-content"
    >
      <RplContent
        class="rpl-accordion__item-content-inner"
        :html="item?.content"
      >
        <slot />
      </RplContent>
    </RplExpandable>
  </li>
</template>
