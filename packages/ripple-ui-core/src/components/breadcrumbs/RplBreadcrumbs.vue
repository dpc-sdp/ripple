<script setup lang="ts">
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
    <ol v-if="items.length > 0" class="rpl-breadcrumbs__items rpl-type-p">
      <li
        v-for="(item, index) of items"
        :key="index"
        :class="{
          'rpl-breadcrumbs__item': true,
          'rpl-breadcrumbs__item--parent': index === items.length - 2
        }"
      >
        <RplTextLink
          v-if="index < items.length - 1"
          :url="item.url"
          :theme="false"
          class="rpl-breadcrumbs__item-link"
          @click="() => handleClick(item, index)"
          >{{ item.text }}</RplTextLink
        >
        <span v-else class="rpl-breadcrumbs__item--current">{{
          item.text
        }}</span>
      </li>
    </ol>
  </nav>
</template>

<style src="./RplBreadcrumbs.css" />
