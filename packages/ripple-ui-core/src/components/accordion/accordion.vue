<script lang="ts"> export default { name: 'RplAccordion' }</script>

<script setup lang="ts">
import { ref, computed } from 'vue'

import RplButton from '../button/button.vue'
import RplIcon from '../icon/icon.vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
    required: true
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

const toggleAllLabel = computed(() => {
  let label = 'Open all'

  if (activeItems.value.length === props.items.length) {
    label = 'Close all'
  }

  return label
})

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
</script>

<template>
  <div :className="`rpl-accordion`" style="width: 450px;">
    <!-- Toggle all -->
    <div class="rpl-accordion__toggle-all-wrapper">
      <RplButton
        v-if="items.length > 1"
        theme="white"
        :label="toggleAllLabel"
        class="rpl-accordion__toggle-all"
        @click="toggleAll"
      />
    </div>

    <div className="rpl-accordion__items">
      <!-- TODO: Seperate the items into their own component -->
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
          className="rpl-accordion__item-toggle"
          @click="toggleItem(index)"
        >
          <span className="rpl-accordion__item-heading  rpl-type-h4">
            {{ item.title }}
          </span>
          <span className="rpl-accordion__item-icon">
            <RplIcon name="icon-chevron-down"></RplIcon>
          </span>
        </button>

        <!-- Item content -->
        <!-- TODO: Use rplmarkup component instead when its available -->
        <div className="rpl-accordion__item-content">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div className="rpl-accordion__item-content-inner" v-html="item.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./accordion.css" />
