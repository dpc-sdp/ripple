<script setup lang="ts">
import { ref } from 'vue'
import RplTextLink from '../text-link/RplTextLink.vue'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

interface IRplBreadcrumbsItem {
  text: string
  url: string
}

interface Props {
  items: IRplBreadcrumbsItem[]
  besideQuickExit?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  besideQuickExit: false
})

const emit = defineEmits<{
  (e: 'navigate', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-breadcrumbs', emit)

const handleClick = (item, index) => {
  emitRplEvent(
    'navigate',
    {
      action: 'click',
      text: item.text,
      value: item.url,
      index: index + 1
    },
    { global: true }
  )
}

const collapseInnerLinks = ref()
collapseInnerLinks.value = props.items.length > 3

const firstItem = (index: number) => index === 0
const lastItem = (index: number) => index === props.items.length - 1

const toggleCollapsed = () => {
  collapseInnerLinks.value = 0
}
</script>

<template>
  <nav
    aria-label="breadcrumbs"
    :class="{
      'rpl-breadcrumbs': true,
      'rpl-u-screen-only': true,
      'rpl-breadcrumbs--beside-exit': props.besideQuickExit
    }"
  >
    <ol
      v-if="items.length > 0"
      :class="[
        'rpl-breadcrumbs__items',
        'rpl-type-p-small',
        { 'rpl-breadcrumbs__items--collapsed': collapseInnerLinks }
      ]"
    >
      <li
        v-for="(item, index) of items"
        :key="index"
        :class="[
          'rpl-breadcrumbs__item',
          { 'rpl-breadcrumbs__item--parent': index === items.length - 1 },
          {
            'rpl-breadcrumbs__item--first':
              firstItem(index) && collapseInnerLinks
          },
          {
            'rpl-breadcrumbs__item--collapsed':
              !firstItem(index) && !lastItem(index) && collapseInnerLinks
          }
        ]"
      >
        <RplTextLink
          :url="item.url"
          :theme="false"
          class="rpl-breadcrumbs__item-link"
          @click="() => handleClick(item, index)"
          >{{ item.text }}</RplTextLink
        >
        <span
          v-if="firstItem(index) && collapseInnerLinks"
          class="rpl-breadcrumbs__collapse-link"
        >
          <RplTextLink
            url=""
            :theme="false"
            class="rpl-breadcrumbs__collapse-link-trigger"
            @click.prevent="() => toggleCollapsed()"
            >&hellip;</RplTextLink
          >
        </span>
      </li>
    </ol>
  </nav>
</template>

<style src="./RplBreadcrumbs.css" />
