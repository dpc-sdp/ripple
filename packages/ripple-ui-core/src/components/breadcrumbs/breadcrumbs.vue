<script lang="ts">
export default { name: 'RplBreadcrumbs' }
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { RplBreadcrumbsThemes } from './constants'
import RplTextLink from '../text-link/TextLink.vue'

defineProps({
  theme: {
    type: String as PropType<typeof RplBreadcrumbsThemes[number]>,
    default: RplBreadcrumbsThemes[0]
  },
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <nav
    aria-label="breadcrumbs"
    :className="`rpl-breadcrumbs rpl-breadcrumbs__${theme}`"
  >
    <ol v-if="items.length > 0" className="rpl-breadcrumbs__items">
      <li
        v-for="(item, index) of items"
        :key="index"
        :className="`rpl-breadcrumbs__item${
          index === items.length - 2 ? ' rpl-breadcrumbs__item--parent' : ''
        }`"
      >
        <RplTextLink
          v-if="index < items.length - 1"
          :url="item.url"
          class="rpl-breadcrumbs__item-link"
          >{{ item.label }}</RplTextLink
        >
        <span v-else className="rpl-breadcrumbs__item--current">{{
          item.label
        }}</span>
      </li>
    </ol>
  </nav>
</template>

<style src="./breadcrumbs.css" />
