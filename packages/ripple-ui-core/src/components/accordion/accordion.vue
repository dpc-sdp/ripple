<script lang="ts"> export default { name: 'RplAccordion' }</script>

<script setup lang="ts">
import { ref, computed } from 'vue'

import RplIcon from '../icon/icon.vue'
import { rplEventBus } from '../../index'

rplEventBus.register('rpl-accordion/open-all')
rplEventBus.register('rpl-accordion/close-all')
rplEventBus.register('rpl-accordion/open-item')
rplEventBus.register('rpl-accordion/close-item')

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    default: () => [],
    required: true
  },
  numbered: {
    type: Boolean,
    default: false
  }
})

const activeItems = ref([])

const itemContentEls = {};

const isActive = (index) => {
  return activeItems.value.includes(index)
}

const toggleItem = (itemIndex) => {
  const activeItemIndex = activeItems.value.indexOf(itemIndex)
  const itemContentEl = itemContentEls[itemIndex]
  const itemContentHeight = itemContentEl.scrollHeight

  // Item needs to open
  if (activeItemIndex === -1) {
    // Add the item from the activeItems array
    activeItems.value.push(itemIndex)

    rplEventBus.emit('rpl-accordion/open-item')

    // Set the elements height to that of its content so that we aren't
    // transitioning to 'auto'
    itemContentEl.style.height = `${itemContentHeight}px`

    // When the transition ends remove the set height so it can default to auto
    itemContentEl.addEventListener('transitionend', () => {
      itemContentEl.style.height = null
    }, { once: true })
  }

  // Item needs to close
  else {
    rplEventBus.emit('rpl-accordion/close-item')

    // Set the elements height to that of its content so that we aren't
    // transitioning from 'auto'
    itemContentEl.style.height = `${itemContentHeight}px`

    // Remove the item from the activeItems array
    activeItems.value.splice(activeItemIndex, 1)

    // Set the height to 0 so that it can transition to closed
    requestAnimationFrame(() => {
      itemContentEl.style.height = '0'
    })
  }
}

const toggleAll = () => {
  // Open all
  if (activeItems.value.length !== props.items.length) {
    rplEventBus.emit('rpl-accordion/open-all')

    props.items.forEach((item, index) => {
      if (!isActive(index)) {
        toggleItem(index)
      }
    })
  }

  // Close all
  else {
    rplEventBus.emit('rpl-accordion/close-all')

    props.items.forEach((item, index) => {
      if (isActive(index)) {
        toggleItem(index)
      }
    })
  }
}

const toggleAllLabel = computed(() => {
  let label = 'Open all'

  if (activeItems.value.length === props.items.length) {
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
        class="rpl-accordion__toggle-all"
        @click="toggleAll()"
      >
        {{ toggleAllLabel }}
      </button>
    </div>

    <!-- Items -->
    <div class="rpl-accordion__items">
      <div
        v-for="(item, index) in items"
        :key="index"
        :class="{
          'rpl-accordion__item': true,
          'rpl-accordion__item--active': isActive(index)
        }"
      >
        <!-- Item toggle -->
        <button
          :id="`accordion-${id}-${index}-toggle`"
          class="rpl-accordion__item-toggle"
          type="button"
          :aria-controls="`accordion-${id}-${index}-content`"
          :aria-expanded="isActive(index)"
          @click="toggleItem(index)"
        >
          <span class="rpl-accordion__item-heading-wrapper">
            <!-- Number -->
            <span
              v-if="numbered"
              class="rpl-accordion__item-number  rpl-type-h4"
            >
              {{ index + 1 }}
            </span>

            <!-- Title -->
            <span class="rpl-accordion__item-heading  rpl-type-h4">
              {{ item.title }}
            </span>
          </span>

          <!-- Icon -->
          <span
            class="rpl-accordion__item-icon"
            aria-hidden="true"
          >
            <RplIcon name="icon-chevron-down"></RplIcon>
          </span>
        </button>

        <!-- Item content -->
        <!-- TODO: Use rplmarkup component instead when its available -->
        <div
          :id="`accordion-${id}-${index}-content`"
          :ref="(el) => { itemContentEls[index] = el }"
          class="rpl-accordion__item-content"
          role="region"
          :aria-labelledby="`accordion-${id}-${index}-toggle`"
          :aria-hidden="isActive(index) === false ? 'true' : null"
        >
          <div class="rpl-accordion__item-content-inner" v-html="item.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./accordion.css" />
