<script lang="ts">
export default { name: 'RplRelatedLinks' }
</script>

<script setup lang="ts">
import { RplListItemArray } from '../list/constants'
import RplList from '../list/list.vue'

interface Props {
  title?: string
  items?: RplListItemArray[]
}

withDefaults(defineProps<Props>(), {
  title: 'Related links',
  items: () => []
})
</script>

<template>
  <div class="rpl-related-links">
    <div class="rpl-related-links__heading rpl-type-label-large">
      {{ title }}
    </div>
    <RplList
      :items="items"
      container-class="rpl-related-links__list"
      item-class="rpl-related-links__item rpl-type-p"
    >
    </RplList>
  </div>
</template>

<style src="./related-links.css" />
