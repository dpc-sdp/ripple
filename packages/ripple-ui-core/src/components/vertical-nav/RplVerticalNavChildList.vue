<script setup lang="ts">
import { IRplVerticalNavItem } from './constants'
import RplVerticalNavLink from './RplVerticalNavLink.vue'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

interface Props {
  items: IRplVerticalNavItem[]
  level: number
  isExpanded: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'itemClick', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-vertical-nav', emit)

const handleClick = (event) => {
  emitRplEvent('itemClick', {
    index: props.level,
    ...event
  })
}
</script>

<template>
  <ul
    :class="`
      rpl-vertical-nav__list
      rpl-vertical-nav__list--level-${props.level}
      rpl-type-p-small
    `"
  >
    <li
      v-for="(item, index) in props.items"
      :key="index"
      class="rpl-vertical-nav__list-item"
    >
      <RplVerticalNavLink
        :text="item.text"
        :href="item.url"
        :active="item?.active && !item.items?.some((i) => i.active)"
        :show-child-icon="props.level > 2"
        :tabindex="props.isExpanded ? '0' : '-1'"
        @item-click="(event) => handleClick(event)"
      />

      <RplVerticalNavChildList
        v-if="item.items"
        :items="item.items"
        :level="props.level + 1"
        :is-expanded="props.isExpanded"
        @item-click="handleClick"
      />
    </li>
  </ul>
</template>
