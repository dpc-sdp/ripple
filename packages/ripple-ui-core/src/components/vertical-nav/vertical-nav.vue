<script lang="ts"> export default { name: 'RplVerticalNav' }</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { RplListItemArray } from '../list/constants'
import RplList from '../list/list.vue'
import RplAccordion from '../accordion/accordion.vue'
import { RplVerticalNavItems } from './constants'

defineProps({
  items: {
    type: Array as PropType<typeof RplListItemArray[]>,
    default: () => []
  }
})
</script>

<template>
  <nav class="rpl-vertical-nav">
    <h3 class="rpl-type-h3-fixed">Section name</h3>

    <RplAccordion
      :items="RplVerticalNavItems"
    ></RplAccordion>
  </nav>
</template>

<style src="./vertical-nav.css" />
