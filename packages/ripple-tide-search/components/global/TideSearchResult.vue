<script setup lang="ts">
import { useSearchResult } from '#imports'

interface Props {
  result: any
}

const props = defineProps<Props>()

const { title, url, updated, summary } = useSearchResult(props.result)
</script>

<template>
  <RplSearchResult
    class="tide-search-result"
    :title="title"
    :url="url"
    :content="summary"
    :updated="updated"
  >
  </RplSearchResult>
</template>
