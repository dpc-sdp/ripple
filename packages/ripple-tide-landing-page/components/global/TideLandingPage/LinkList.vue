<template>
  <RplLinkList :numColumns="numColumns">
    <RplLinkListItem v-for="item in items" :key="item.id" :url="item.url">{{
      item.text
    }}</RplLinkListItem>
  </RplLinkList>
</template>

<script setup lang="ts">
import { computed } from '#imports'

interface Props {
  hasSidebar?: boolean
  items: Array<{
    id: string
    text: string
    url: string
  }>
}

const props = withDefaults(defineProps<Props>(), {
  hasSidebar: false,
  items: () => []
})

const numColumns = computed(() => {
  return props.hasSidebar ? 1 : 2
})
</script>
