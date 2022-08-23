<script lang="ts">
export default { name: 'RplVerticalNav' }
</script>

<script setup lang="ts">
import { PropType, ref } from 'vue'
import { RplListItemArray } from '../list/constants'
import RplVerticalNavLink from './link.vue'
import RplVerticalNavToggle from './toggle.vue'
import RplVerticalNavChildList from './child-list.vue'
import { useExpandableCollection } from '../../composables/useExpandableCollection'

const props = defineProps({
  title: {
    type: String as PropType<string>,
    required: true
  },
  items: {
    type: Array as PropType<typeof RplListItemArray[]>,
    default: () => [],
    required: true
  }
})

const itemContentEls = ref([])

const {
  isItemExpanded,
  toggleItem
} = useExpandableCollection(props.items, itemContentEls)
</script>

<template>
  <nav class="rpl-vertical-nav">
    <h3 class="rpl-vertical-nav__heading rpl-type-h3-fixed">{{ title }}</h3>

    <ul
      class="
        rpl-vertical-nav__list
        rpl-vertical-nav__list--level-1
        rpl-type-p-small
      "
    >
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="{
          'rpl-vertical-nav__list-item': true,
          'rpl-vertical-nav__list-item--expanded': isItemExpanded(index)
        }"
      >
        <RplVerticalNavToggle
          v-if="item.items"
          :id="`rpl-vertical-nav-${index}-toggle`"
          :text="item.text"
          @click="toggleItem(index)"
        />

        <div
          v-if="item.items"
          :ref="
            (el) => {
              itemContentEls[index] = el
            }
          "
          role="region"
          :aria-labelledby="`rpl-vertical-nav-${index}-toggle`"
          :aria-hidden="isItemExpanded(index) === false ? 'true' : null"
          class="rpl-vertical-nav__list-item-children"
        >
          <RplVerticalNavChildList
            :items="item.items"
            :level="2"
            :is-expanded="isItemExpanded(index)"
          />
        </div>

        <RplVerticalNavLink
          v-else
          :text="item.text"
          :href="item.url"
          :active="item?.active"
        />
      </li>
    </ul>
  </nav>
</template>

<style src="./vertical-nav.css" />
