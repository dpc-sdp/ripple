<script setup lang="ts">
import { computed, getSearchResultValue, useSearchResult } from '#imports'

interface Props {
  result: any
  displayImage?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  displayImage: false
})

const { title, url, summary } = useSearchResult(props.result)

const isOnGoing = computed(
  () => getSearchResultValue(props.result, 'field_node_on_going') ?? false
)

const dateFrom = computed(() =>
  getSearchResultValue(props.result, 'field_node_dates_start_value')
)

const dateTo = computed(() =>
  getSearchResultValue(props.result, 'field_node_dates_end_value')
)

const image = computed(() => {
  if (!props.displayImage) return null

  const imgSrc = getSearchResultValue(
    props.result,
    'field_media_image_absolute_path',
    false
  )

  return imgSrc ? { src: imgSrc } : undefined
})

const link = computed(() => {
  const externalURL = getSearchResultValue(props.result, 'field_node_link')

  return externalURL || url.value
})
</script>

<template>
  <RplPromoCard
    class="tide-grant-search-result-card"
    :title="title"
    :url="link"
    :image="image"
  >
    <template #meta>
      <span class="tide-grant-search-result-card__meta">
        <RplTag variant="neutral" label="Grant" />
        <TideGrantMeta
          variant="inline"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :ongoing="isOnGoing"
        />
      </span>
    </template>
    <p>{{ summary }}</p>
  </RplPromoCard>
</template>

<style>
.tide-grant-search-result-card {
  max-width: var(--rpl-content-max-width);
}

.tide-grant-search-result-card__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: var(--rpl-sp-2) var(--rpl-sp-3);
}

.tide-grant-search-result-card__meta .tide-grant-meta--inline {
  margin-bottom: 0;
}
</style>
