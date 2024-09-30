<script setup lang="ts">
import { inject, ref } from 'vue'
import RplTextLink from '../text-link/RplTextLink.vue'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'
import type { IRplFeatureFlags } from '@dpc-sdp/ripple-tide-api/types'

interface IRplBreadcrumbsItem {
  text: string
  url: string
}

interface Props {
  items: IRplBreadcrumbsItem[]
  besideQuickExit?: boolean
  displayBeforeCollapse?: number
  collapse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  besideQuickExit: false,
  displayBeforeCollapse: 3,
  collapse: false
})

const emit = defineEmits<{
  (e: 'navigate', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-breadcrumbs', emit)

const { breadcrumbsCollapseInnerLinks }: IRplFeatureFlags = inject(
  'featureFlags',
  {
    breadcrumbsCollapseInnerLinks: false
  }
)

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

const initialCollapseInnerLinks =
  props.collapse || breadcrumbsCollapseInnerLinks!

const collapseInnerLinks = ref()
collapseInnerLinks.value = initialCollapseInnerLinks
  ? props.displayBeforeCollapse
  : 0

const firstItem = (index: number) => index === 0
const lastItem = (index: number) => index === props.items.length - 1
const secondLastItem = (index: number) => index === props.items.length - 2

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
        { 'rpl-type-p-small': initialCollapseInnerLinks },
        { 'rpl-breadcrumbs__items--collapsed': collapseInnerLinks }
      ]"
    >
      <template v-for="(item, index) of items" :key="index">
        <li
          v-if="!initialCollapseInnerLinks || !lastItem(index)"
          :class="[
            'rpl-breadcrumbs__item',
            {
              'rpl-breadcrumbs__item--parent': index === items.length - 2
            },
            {
              'rpl-breadcrumbs__item--first':
                firstItem(index) && collapseInnerLinks
            },
            {
              'rpl-breadcrumbs__item--collapsed':
                !firstItem(index) &&
                !secondLastItem(index) &&
                collapseInnerLinks
            }
          ]"
        >
          <RplTextLink
            v-if="!lastItem(index) || collapseInnerLinks"
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
            <button
              class="rpl-text-link rpl-u-focusable-inline rpl-breadcrumbs__collapse-link-trigger"
              type="button"
              aria-label="Expand hidden breadcrumbs"
              @click.prevent="() => toggleCollapsed()"
            >
              &hellip;
            </button>
          </span>
          <span
            v-if="!initialCollapseInnerLinks && lastItem(index)"
            class="rpl-breadcrumbs__item--current"
            >{{ item.text }}</span
          >
        </li>
      </template>
    </ol>
  </nav>
</template>

<style src="./RplBreadcrumbs.css" />
