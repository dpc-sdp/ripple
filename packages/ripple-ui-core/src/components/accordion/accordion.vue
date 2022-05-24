<script lang="ts"> export default { name: 'RplAccordion' }</script>

<script setup lang="ts">
import { PropType, ref } from 'vue'
import { RplAccordionThemes } from './constants'

import RplIcon from '../icon/icon.vue'

const props = defineProps({
  theme: {
    type: String as PropType<typeof RplAccordionThemes[number]>,
    default: RplAccordionThemes[0]
  },
  items: {
    type: Array,
    // TODO: Wire this data up to come from the story / props
    default: () => [
      {
        title: 'Accordion one',
        content: `
          <p class="rpl-type-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        `
      },
      {
        title: 'Accordion two',
        content: `
          <p class="rpl-type-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        `
      },
      {
        title: 'Accordion three',
        content: `
          <p class="rpl-type-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        `
      }
    ]
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
</script>

<template>
  <div :className="`rpl-accordion rpl-accordion--${theme}`">
    <!-- Toggle all -->
    <!-- TODO: Wire this up, dont show if only 1 item -->
    <div className="rpl-accordion__toggle-all">Open all</div>

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
        <div className="rpl-accordion__item-content" v-html="item.content"></div>
      </div>
    </div>
  </div>
</template>

<style src="./accordion.css" />
