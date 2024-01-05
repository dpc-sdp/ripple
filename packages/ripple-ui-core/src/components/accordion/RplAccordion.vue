<script setup lang="ts">
import { computed } from 'vue'
import RplIcon from '../icon/RplIcon.vue'
import RplContent from '../content/RplContent.vue'
import RplExpandable from '../expandable/RplExpandable.vue'
import { useExpandableState } from '../../composables/useExpandableState'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

type RplAccordionItem = {
  id: string
  title?: string
  content: string
  active: boolean
}

interface Props {
  id: string
  items: RplAccordionItem[]
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

const initialActiveIndexes: string[] = props.items.reduce(
  (result: string[], current: RplAccordionItem): string[] => {
    if (current.active) {
      return [...result, current.id]
    }

    return result
  },
  []
)

const { isItemExpanded, isAllExpanded, toggleItem } = useExpandableState(
  initialActiveIndexes,
  props.items.length
)

const itemID = (itemId) => `accordion-${props.id}-${itemId}`

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
    props.items.forEach((item) => {
      // If the item is not expanded, make it expanded
      if (!isItemExpanded(item.id)) {
        toggleItem(item.id)
      }
    })
  }

  // Make all items inactive
  else {
    props.items.forEach((item) => {
      // If the item is expanded, make it not expanded
      if (isItemExpanded(item.id)) {
        toggleItem(item.id)
      }
    })
  }
}

const toggleSingle = (item: RplAccordionItem) => {
  emitRplEvent(
    'toggleItem',
    {
      id: itemID(item.id),
      action: isItemExpanded(item.id) ? 'close' : 'open',
      text: item.title
    },
    { global: true }
  )

  toggleItem(item.id)
}

const toggleAllLabel = computed(() => {
  let label = 'Open all'

  if (isAllExpanded()) {
    label = 'Close all'
  }

  return label
})
</script>

<template>
  <div :id="`accordion-${id}`" class="rpl-accordion">
    <!-- Toggle all -->
    <div
      v-if="displayToggleAll"
      class="rpl-accordion__toggle-all-wrapper rpl-u-screen-only"
    >
      <button
        v-if="items.length > 1"
        class="rpl-accordion__toggle-all rpl-u-focusable-inline"
        @click="toggleAll()"
      >
        {{ toggleAllLabel }}
      </button>
    </div>

    <!-- Items -->
    <component :is="numbered ? 'ol' : 'ul'" class="rpl-accordion__items">
      <li
        v-for="(item, index) in items"
        :id="itemID(item.id)"
        :key="item.id"
        :class="{
          'rpl-accordion__item': true,
          'rpl-accordion__item--active': isItemExpanded(item.id)
        }"
      >
        <!-- Item toggle -->
        <button
          :id="`${itemID(item.id)}-toggle`"
          class="rpl-accordion__item-toggle rpl-u-focusable-block"
          type="button"
          :aria-controls="`${itemID(item.id)}-content`"
          :aria-expanded="isItemExpanded(item.id)"
          @click="toggleSingle(item)"
        >
          <span class="rpl-accordion__item-heading-wrapper">
            <!-- Number -->
            <span
              v-if="numbered"
              class="rpl-accordion__item-number rpl-type-h4"
            >
              {{ index + 1 }}
            </span>

            <!-- Title -->
            <span class="rpl-accordion__item-heading rpl-type-h4">
              {{ item.title }}
            </span>
          </span>

          <!-- Icon -->
          <span
            class="rpl-accordion__item-icon rpl-u-screen-only"
            aria-hidden="true"
          >
            <RplIcon name="icon-chevron-down"></RplIcon>
          </span>
        </button>

        <!-- Item content -->
        <RplExpandable
          :id="`${itemID(item.id)}-content`"
          :aria-labelledby="`${itemID(item.id)}-toggle`"
          :aria-hidden="isItemExpanded(item.id) === false ? 'true' : null"
          :expanded="isItemExpanded(item.id)"
          class="rpl-accordion__item-content"
        >
          <RplContent
            class="rpl-accordion__item-content-inner"
            :html="item.content"
          >
          </RplContent>
        </RplExpandable>
      </li>
    </component>
  </div>
</template>

<style src="./RplAccordion.css" />
