<script lang="ts">
export default { name: 'RplAccordion' }
</script>

<script setup lang="ts">
import { PropType, ref, computed } from 'vue'

import RplIcon from '../icon/icon.vue'
import RplContent from '../content/content.vue'
import { useExpandableCollection } from '../../composables/useExpandableCollection'

type RplAccordionItem = {
  title: string
  content: string
}

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  items: {
    type: Array as PropType<RplAccordionItem[]>,
    default: () => [],
    required: true
  },
  numbered: {
    type: Boolean,
    default: false
  }
})

const itemContentEls = ref([])

const {
  isItemExpanded,
  isAllExpanded,
  toggleItem,
  toggleAll
} = useExpandableCollection(props.items, itemContentEls)

const toggleAllLabel = computed(() => {
  let label = 'Open all'

  if (isAllExpanded()) {
    label = 'Close all'
  }

  return label
})
</script>

<template>
  <div class="rpl-accordion">
    <!-- Toggle all -->
    <div class="rpl-accordion__toggle-all-wrapper">
      <button
        v-if="items.length > 1"
        class="
          rpl-accordion__toggle-all
          rpl-u-focusable rpl-u-focusable--inline
        "
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
          class="rpl-accordion__item-toggle rpl-u-focusable"
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
        <div
          :id="`accordion-${id}-${index}-content`"
          :ref="
            (el) => {
              itemContentEls[index] = el
            }
          "
          class="rpl-accordion__item-content"
          role="region"
          :aria-labelledby="`accordion-${id}-${index}-toggle`"
          :aria-hidden="isItemExpanded(index) === false ? 'true' : null"
        >
          <RplContent
            class="rpl-accordion__item-content-inner"
            :html="item.content"
          >
          </RplContent>
        </div>
      </li>
    </component>
  </div>
</template>

<style src="./accordion.css" />
