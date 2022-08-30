<script lang="ts">
export default { name: 'RplBreadcrumbs' }
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { RplBreadcrumbsItemArray } from './constants'
import RplTextLink from '../text-link/text-link.vue'

defineProps({
  items: {
    type: Array as PropType<typeof RplBreadcrumbsItemArray[]>,
    default: () => []
  }
})
</script>

<template>
  <nav aria-label="breadcrumbs" class="rpl-breadcrumbs">
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
