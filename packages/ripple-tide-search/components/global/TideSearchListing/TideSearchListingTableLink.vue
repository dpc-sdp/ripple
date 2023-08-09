<template>
  <RplTextLink :url="url">
    {{ title }}
  </RplTextLink>
</template>

<script setup lang="ts">
import { useSearchResult } from '#imports'

interface Props {
  item: {
    url: string
    title: string
  }
}

const props = defineProps<Props>()

const { title, url } = useSearchResult(props.item)
</script>
