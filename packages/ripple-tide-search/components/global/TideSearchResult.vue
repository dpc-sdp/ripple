<script setup lang="ts">
import { computed, getSearchResultValue, useSearchResult } from '#imports'

interface Props {
  result: any
}

const props = defineProps<Props>()

const { title, url, updated } = useSearchResult(props.result)
const content = computed(() =>
  getSearchResultValue(props.result, 'field_landing_page_summary')
)
</script>

<template>
  <RplSearchResult
    class="tide-search-result"
    :title="title"
    :url="url"
    :content="content"
    :updated="updated"
  >
  </RplSearchResult>
</template>
