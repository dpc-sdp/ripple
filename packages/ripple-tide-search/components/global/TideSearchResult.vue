<script setup lang="ts">
import { computed, getSearchResultValue } from '#imports'

interface Props {
  result: any
}

const props = defineProps<Props>()

const title = computed(() => getSearchResultValue(props.result, 'title'))
const url = computed(() =>
  getSearchResultValue(props.result, 'url').replace(/\/site-(\d+)/, '')
)
const updated = computed(() => getSearchResultValue(props.result, 'changed'))
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
