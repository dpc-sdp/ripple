<script lang="ts">
export default { name: 'RplVerticalNav' }
</script>

<script setup lang="ts">
import { RplVerticalNavItem } from './constants'
import RplVerticalNavLink from './link.vue'
import RplVerticalNavToggle from './toggle.vue'
import RplVerticalNavExpandable from './expandable.vue'
import RplVerticalNavChildList from './child-list.vue'
import { useExpandableState } from '../../composables/useExpandableState'

interface Props {
  title: string
  items: RplVerticalNavItem[]
}

const props = defineProps<Props>()

const initialActiveIndexes: number[] = props.items.reduce(
  (result: number[], current: RplVerticalNavItem, i: number): number[] => {
    if (current.active) {
      return [...result, i]
    }

    return result
  },
  []
)

const { isItemExpanded, toggleItem } = useExpandableState(
  initialActiveIndexes,
  props.items.length
)
</script>

<template>
  <nav class="rpl-vertical-nav">
    <h3 class="rpl-vertical-nav__heading rpl-type-h3-fixed">{{ title }}</h3>

    <ul
      class="
        rpl-vertical-nav__list rpl-vertical-nav__list--level-1
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

        <RplVerticalNavExpandable
          v-if="item.items"
          :aria-labelledby="`rpl-vertical-nav-${index}-toggle`"
          :aria-hidden="isItemExpanded(index) === false ? 'true' : null"
          :expanded="isItemExpanded(index)"
        >
          <RplVerticalNavChildList
            :items="item.items"
            :level="2"
            :is-expanded="isItemExpanded(index)"
          />
        </RplVerticalNavExpandable>

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
