<script lang="ts">
export default { name: 'RplBreadcrumbs' }
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { RplBreadcrumbsThemes, RplItemsArray } from './constants'
import RplTextLink from '../text-link/text-link.vue'

defineProps({
  theme: {
    type: String as PropType<typeof RplBreadcrumbsThemes[number]>,
    default: RplBreadcrumbsThemes[0]
  },
  items: {
    type: Array as PropType<typeof RplItemsArray[]>,
    default: () => []
  }
})
</script>

<template>
  <nav
    aria-label="breadcrumbs"
    :className="`rpl-breadcrumbs rpl-breadcrumbs__${theme}`"
  >
    <ol v-if="items.length > 0" class="rpl-breadcrumbs__items rpl-type-p">
      <li
        v-for="(item, index) of items"
        :key="index"
        :class="`rpl-breadcrumbs__item${
          index === items.length - 2 ? ' rpl-breadcrumbs__item--parent' : ''
        }`"
      >
        <RplTextLink
          v-if="index < items.length - 1"
          :url="item.url"
          class="rpl-breadcrumbs__item-link"
          >{{ item.label }}</RplTextLink
        >
        <span v-else class="rpl-breadcrumbs__item--current">{{
          item.label
        }}</span>
      </li>
    </ol>
  </nav>
</template>

<style src="./breadcrumbs.css" />
