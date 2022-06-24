<script lang="ts"> export default { name: 'RplAccordion' }</script>

<script setup lang="ts">
import { ref, computed } from 'vue'

import RplIcon from '../icon/icon.vue'

const props = defineProps({
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

const isActive = (index) => {
  return activeItems.value.includes(index)
}

const toggleItem = (itemIndex) => {
  const itemFound = activeItems.value.indexOf(itemIndex)

  // Item needs to be removed from activeItems
  if (itemFound !== -1) {
    activeItems.value.splice(itemFound, 1)
  }
  // Item needs to be added to activeItems
  else {
    activeItems.value.push(itemIndex)
  }
}

const toggleAll = () => {
  // Open all
  if (activeItems.value.length !== props.items.length) {
    activeItems.value = []

    props.items.forEach((item, index) => {
      activeItems.value.push(index)
    })
  }

  // Close all
  else {
    activeItems.value = []
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
        @click="toggleAll"
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
          class="rpl-accordion__item-toggle"
          @click="toggleItem(index)"
        >
          <span class="rpl-accordion__item-heading-wrapper">
            <!-- Number -->
            <span
              v-if="numbered"
              class="rpl-accordion__item-number  rpl-type-h4"
            >
              {{ index }}
            </span>

            <!-- Title -->
            <span class="rpl-accordion__item-heading  rpl-type-h4">
              {{ item.title }}
            </span>
          </span>

          <!-- Icon -->
          <span class="rpl-accordion__item-icon">
            <RplIcon name="icon-chevron-down"></RplIcon>
          </span>
        </button>

        <!-- Item content -->
        <!-- TODO: Use rplmarkup component instead when its available -->
        <div class="rpl-accordion__item-content">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="rpl-accordion__item-content-inner" v-html="item.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./accordion.css" />
