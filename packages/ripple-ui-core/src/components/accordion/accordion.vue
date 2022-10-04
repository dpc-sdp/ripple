<script lang="ts">
export default { name: 'RplAccordion' }
</script>

<script setup lang="ts">
import { computed } from 'vue'

import RplIcon from '../icon/icon.vue'
import RplContent from '../content/content.vue'
import RplExpandable from '../expandable/expandable.vue'
import { useExpandableState } from '../../composables/useExpandableState'

type RplAccordionItem = {
  title: string
  content: string
  active: boolean
}

interface Props {
  id: string
  items: RplAccordionItem[]
  numbered: boolean
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  numbered: false
})

const initialActiveIndexes: number[] = props.items.reduce(
  (result: number[], current: RplAccordionItem, i: number): number[] => {
    if (current.active) {
      return [...result, i]
    }

    return result
  },
  []
)

const { isItemExpanded, isAllExpanded, toggleItem, toggleAll } =
  useExpandableState(initialActiveIndexes, props.items.length)

const toggleAllLabel = computed(() => {
  let label = 'Open all'

  if (isAllExpanded()) {
    label = 'Close all'
  }

  return label
})
</script>

<template>
  <div :id="id" class="rpl-accordion">
    <!-- Toggle all -->
    <div class="rpl-accordion__toggle-all-wrapper">
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
        :key="index"
        :class="{
          'rpl-accordion__item': true,
          'rpl-accordion__item--active': isItemExpanded(index)
        }"
      >
        <!-- Item toggle -->
        <button
          :id="`accordion-${id}-${index}-toggle`"
          class="rpl-accordion__item-toggle rpl-u-focusable-block"
          type="button"
          :aria-controls="`accordion-${id}-${index}-content`"
          :aria-expanded="isItemExpanded(index)"
          @click="toggleItem(index)"
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
          <span class="rpl-accordion__item-icon" aria-hidden="true">
            <RplIcon name="icon-chevron-down"></RplIcon>
          </span>
        </button>

        <!-- Item content -->
        <RplExpandable
          :id="`accordion-${id}-${index}-content`"
          :aria-labelledby="`accordion-${id}-${index}-toggle`"
          :aria-hidden="isItemExpanded(index) === false ? 'true' : null"
          :expanded="isItemExpanded(index)"
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

<style src="./accordion.css" />
