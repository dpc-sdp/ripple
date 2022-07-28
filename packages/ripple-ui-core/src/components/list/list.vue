<script lang="ts">
export default { name: 'RplList' }
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { RplListTypes } from './constants'

defineProps({
  items: {
    type: Array as PropType<Array<string>[]>,
    default: () => []
  },
  type: {
    type: String as PropType<typeof RplListTypes[number]>,
    default: 'ul'
  },
  itemClass: {
    type: String,
    default: 'rpl-list__item'
  }
})
</script>

<template>
  <component :is="type" v-if="items.length > 0">
    <li v-for="(item, index) of items" :key="index" :class="itemClass">
      {{ item }}
    </li>
  </component>
</template>

<style src="./list.css" />
