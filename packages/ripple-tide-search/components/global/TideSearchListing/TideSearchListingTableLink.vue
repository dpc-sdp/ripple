<template>
  <RplTextLink :url="item.url[0]">
    {{ item.title[0] }}
  </RplTextLink>
</template>

<script setup lang="ts">
interface Props {
  item: {
    url: string
    title: string
  }
}

defineProps<Props>()
</script>
