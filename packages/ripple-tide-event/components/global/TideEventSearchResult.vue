<script setup lang="ts">
import { computed } from 'vue'
import { getSearchResultValue, useSearchResult } from '#imports'
import { formatDateRange } from '@dpc-sdp/ripple-ui-core'

interface Props {
  result: any
}

const props = defineProps<Props>()

const { title, url, summary, image } = useSearchResult(props.result)

const date = computed(() => {
  return formatDateRange({
    from: getSearchResultValue(
      props.result,
      'field_event_date_start_value',
      true
    ),
    to: getSearchResultValue(props.result, 'field_event_date_end_value', true)
  })
})

const location = computed(() => {
  const locality = getSearchResultValue(
    props.result,
    'field_event_details_event_locality',
    true
  )

  return Array.isArray(locality) ? locality[0] : locality
})
</script>

<template>
  <RplNavCard
    :title="title"
    :url="url"
    :image="image"
    class="tide-event-search-result"
  >
    <template #meta>
      <RplTag v-if="date" variant="neutral" :label="date" />
    </template>
    <p>{{ summary }}</p>
    <span v-if="location" class="tide-event-search-result__location">
      <RplIcon name="icon-pin" colour="default" />
      {{ location }}
    </span>
  </RplNavCard>
</template>

<style>
.tide-event-search-result__location {
  display: flex;
  gap: var(--rpl-sp-2);
  align-items: center;
  margin-top: var(--rpl-sp-3);
}
</style>
