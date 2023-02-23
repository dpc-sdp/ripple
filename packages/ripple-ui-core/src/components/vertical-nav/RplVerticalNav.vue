<script setup lang="ts">
import RplVerticalNavLink from './RplVerticalNavLink.vue'
import RplVerticalNavToggle from './RplVerticalNavToggle.vue'
import RplVerticalNavChildList from './RplVerticalNavChildList.vue'
import RplExpandable from '../expandable/RplExpandable.vue'
import { useExpandableState } from '../../composables/useExpandableState'
import { IRplVerticalNavItem } from './constants'

interface Props {
  title: string
  items: IRplVerticalNavItem[]
}

const props = defineProps<Props>()

const initialActiveIndexes: string[] = props.items.reduce(
  (result: string[], current: IRplVerticalNavItem): string[] => {
    if (current.active) {
      return [...result, current.id]
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
    <h3 v-if="title" class="rpl-vertical-nav__heading rpl-type-h3-fixed">
      {{ title }}
    </h3>

    <ul
      class="rpl-vertical-nav__list rpl-vertical-nav__list--level-1 rpl-type-p-small"
    >
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="{
          'rpl-vertical-nav__list-item': true,
          'rpl-vertical-nav__list-item--expanded': isItemExpanded(item.id)
        }"
      >
        <RplVerticalNavToggle
          v-if="item.items"
          :id="`rpl-vertical-nav-${item.id}-toggle`"
          :text="item.text"
          @click="toggleItem(item.id)"
        />

        <RplExpandable
          v-if="item.items"
          :aria-labelledby="`rpl-vertical-nav-${item.id}-toggle`"
          :aria-hidden="isItemExpanded(item.id) === false ? 'true' : null"
          :expanded="isItemExpanded(item.id)"
          class="rpl-vertical-nav__list-item-children"
        >
          <RplVerticalNavChildList
            :items="item.items"
            :level="2"
            :is-expanded="isItemExpanded(item.id)"
          />
        </RplExpandable>

        <RplVerticalNavLink
          v-else
          :text="item.text"
          :href="item.url"
          :active="item?.active && !item?.items?.length"
        />
      </li>
    </ul>
  </nav>
</template>

<style src="./RplVerticalNav.css" />
