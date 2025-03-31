<template>
  <RplLinkList :variant="variant">
    <RplLinkListItem v-for="item in items" :key="item.id" :url="item.url">{{
      item.text
    }}</RplLinkListItem>
  </RplLinkList>
</template>

<script setup lang="ts">
interface Props {
  variant: 'onLight' | 'onDark'
  items: Array<{
    id: string
    text: string
    url: string
  }>
}

withDefaults(defineProps<Props>(), {
  variant: 'onLight',
  items: () => []
})
</script>
