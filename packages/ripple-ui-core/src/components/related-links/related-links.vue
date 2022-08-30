<script lang="ts"> export default { name: 'RplRelatedLinks' }</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { RplListItemArray } from '../list/constants'
import RplList from '../list/list.vue'

defineProps({
  title: {
    type: String as PropType<string>,
    default: 'Related links'
  },
  items: {
    type: Array as PropType<typeof RplListItemArray[]>,
    default: () => []
  }
})
</script>

<template>
  <div class="rpl-related-links">
    <div class="rpl-related-links__heading rpl-type-label-large">{{ title }}</div>
    <RplList
      :items="items"
      container-class="rpl-related-links__list"
      item-class="rpl-related-links__item rpl-type-p"
    >
    </RplList>
  </div>
</template>

<style src="./related-links.css" />
