<script setup lang="ts">
import {
  computed,
  getSearchResultValue,
  formatGrantAudiences,
  formatPriceRange,
  useSearchResult
} from '#imports'

interface Props {
  result: any
}

const props = defineProps<Props>()

const { title, url, updated } = useSearchResult(props.result)

const content = computed(() =>
  getSearchResultValue(props.result, 'field_landing_page_summary')
)
const audience = computed(() =>
  formatGrantAudiences(
    getSearchResultValue(props.result, 'field_audience_name', true)
  )
)
const amount = computed(() => {
  const from = getSearchResultValue(props.result, 'funding_level_from')
  const to = getSearchResultValue(props.result, 'funding_level_to')
  if (from || to) {
    return formatPriceRange(from, to)
  }
  return null
})

const isOnGoing = computed(() =>
  getSearchResultValue(props.result, 'field_node_on_going')
)

const dateFrom = computed(() =>
  getSearchResultValue(props.result, 'field_node_dates_start_value')
)

const dateTo = computed(() =>
  getSearchResultValue(props.result, 'field_node_dates_end_value')
)
</script>

<template>
  <RplSearchResult
    class="tide-grant-search-result"
    :title="title"
    :url="url"
    :content="content"
    :updated="updated"
  >
    <template #details>
      <TideGrantMeta
        variant="inline"
        :audience="audience"
        :funding="amount"
        :dateFrom="dateFrom"
        :dateTo="dateTo"
        :ongoing="isOnGoing"
      />
    </template>
  </RplSearchResult>
</template>

<style>
.tide-grant-search-result {
  max-width: var(--rpl-content-max-width);
}
</style>
