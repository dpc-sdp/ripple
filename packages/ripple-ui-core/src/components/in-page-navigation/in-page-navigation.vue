<script lang="ts">
export default { name: 'RplInPageNavigation' }
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { RplListItemArray } from '../list/constants'
import RplList from '../list/list.vue'

defineProps({
  title: {
    type: String as PropType<string>,
    default: 'On this page'
  },
  items: {
    type: Array as PropType<typeof RplListItemArray[]>,
    default: () => []
  }
})
</script>

<template>
  <div class="rpl-in-page-navigation">
    <h3 class="rpl-in-page-navigation__title rpl-type-h3">
      {{ title }}
    </h3>
    <RplList :items="items" item-class="rpl-type-p-small"></RplList>
  </div>
</template>

<style src="./in-page-navigation.css" />
