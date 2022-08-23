<script lang="ts">
export default { name: 'RplVerticalNav' }
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { RplListItemArray } from '../list/constants'
import RplVerticalNavLink from './link.vue'
import RplVerticalNavToggle from './toggle.vue'
import RplVerticalNavChildList from './child-list.vue'

defineProps({
  title: {
    type: String as PropType<string>,
    required: true
  },
  items: {
    type: Array as PropType<typeof RplListItemArray[]>,
    default: () => []
  }
})
</script>

<template>
  <div class="rpl-vertical-nav">
    <h3 class="rpl-vertical-nav__heading rpl-type-h3-fixed">{{ title }}</h3>

    <ul
      class="
        rpl-vertical-nav__list
        rpl-vertical-nav__list--level-1
        rpl-type-p-small
      "
    >
      <li
        v-for="(item, index) in items"
        :key="index"
        class="rpl-vertical-nav__list-item"
      >
        <RplVerticalNavToggle
          v-if="item.items"
          :text="item.text"
        />

        <RplVerticalNavChildList
          v-if="item.items"
          :items="item.items"
          :level="2"
        />

        <RplVerticalNavLink
          v-else
          :text="item.text"
          :href="item.url"
        />
      </li>
    </ul>
  </div>
</template>

<style src="./vertical-nav.css" />
