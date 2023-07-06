<script setup lang="ts">
import {
  computed,
  getSearchResultValue,
  formatGrantAudiences,
  getGrantStatus,
  formatPriceRange
} from '#imports'

interface Props {
  result: any
}

const props = defineProps<Props>()

const title = computed(() => getSearchResultValue(props.result, 'title'))
const url = computed(() => getSearchResultValue(props.result, 'url'))
const updated = computed(() => getSearchResultValue(props.result, 'changed'))
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
const status = computed(() =>
  getGrantStatus(
    new Date(),
    isOnGoing.value,
    getSearchResultValue(props.result, 'field_node_dates_start_value'),
    getSearchResultValue(props.result, 'field_node_dates_end_value')
  )
)

const items = computed(() => {
  const list = []
  if (audience) {
    list.push({
      text: audience.value,
      icon: 'icon-user-circle-filled'
    })
  }
  if (amount.value) {
    list.push({
      text: amount.value,
      icon: 'icon-dollar-circle-filled'
    })
  }
  if (status) {
    list.push({
      text: status.value.displayLabel,
      icon: 'icon-cancel-circle-filled',
      iconColour: 'error'
    })
  }
  return list
})
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
      <RplList :items="items" />
    </template>
  </RplSearchResult>
</template>

<style>
.tide-grant-search-result {
  max-width: var(--rpl-content-max-width);
}
</style>
