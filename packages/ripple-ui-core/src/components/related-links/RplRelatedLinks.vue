<script setup lang="ts">
import { IRplListItemArray } from '../list/constants'
import RplList from '../list/RplList.vue'

interface Props {
  title?: string
  items?: IRplListItemArray[]
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

<style src="./RplRelatedLinks.css" />
