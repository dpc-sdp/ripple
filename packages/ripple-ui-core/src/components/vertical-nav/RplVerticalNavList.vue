<script setup lang="ts">
import { computed } from 'vue'
import { IRplVerticalNavItem } from './constants'
import RplVerticalNavLink from './RplVerticalNavLink.vue'
import RplVerticalNavToggle from './RplVerticalNavToggle.vue'
import RplExpandable from '../expandable/RplExpandable.vue'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

interface Props {
  items: IRplVerticalNavItem[]
  level: number
  toggleLevels: number
  isExpanded: (id: string) => boolean
  toggleId: (id: string) => void
  toggleItem: (item: IRplVerticalNavItem) => void
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'itemClick', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-vertical-nav', emit)

const showIcon = computed(() => {
  return props.level > Math.max(1, props.toggleLevels) + 1
})

const isExpandable = (item: IRplVerticalNavItem) => {
  return item.items && props.level <= props.toggleLevels
}

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
      rpl-vertical-nav__list--level-${level}
      rpl-type-p-small
    `"
  >
    <li
      v-for="(item, index) in items"
      :key="index"
      :class="{
        'rpl-vertical-nav__list-item': true,
        'rpl-vertical-nav__list-item--expanded': isExpanded(item.id)
      }"
    >
      <template v-if="isExpandable(item)">
        <div class="rpl-vertical-nav__header">
          <RplVerticalNavLink
            v-if="item.url"
            :text="item.text"
            :href="item.url"
            :active="item?.active && !item.items?.some((i) => i.active)"
            :show-child-icon="showIcon"
            @item-click="(event) => handleClick(event)"
          />
          <RplVerticalNavToggle
            :id="toggleId(item.id)"
            :text="item.text"
            :show-text="!item.url"
            :aria-expanded="isExpanded(item.id)"
            @click="toggleItem(item)"
          />
        </div>
        <RplExpandable
          :aria-labelledby="`rpl-vertical-nav-${item.id}-toggle`"
          :aria-hidden="!isExpanded(item.id)"
          :expanded="isExpanded(item.id)"
          class="rpl-vertical-nav__list-item-children"
        >
          <RplVerticalNavList
            v-bind="props"
            :items="item.items"
            :level="props.level + 1"
            @item-click="handleClick"
          />
        </RplExpandable>
      </template>
      <template v-else>
        <RplVerticalNavLink
          :text="item.text"
          :href="item.url"
          :active="item?.active && !item.items?.some((i) => i.active)"
          :show-child-icon="showIcon"
          @item-click="(event) => handleClick(event)"
        />
        <RplVerticalNavList
          v-if="item.items"
          v-bind="props"
          :items="item.items"
          :level="props.level + 1"
          @item-click="handleClick"
        />
      </template>
    </li>
  </ul>
</template>
