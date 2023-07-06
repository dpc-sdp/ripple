<script setup lang="ts">
import { computed, getSearchResultValue, capitalizeFirstLetter } from '#imports'

interface Props {
  result: any
}

const props = defineProps<Props>()

const formatContentTypeString = (str) => {
  const ignoredTypes = ['landing_page']
  if (!ignoredTypes.includes(str)) {
    return capitalizeFirstLetter(str).replace('_', ' ')
  }
}

const title = computed(() => getSearchResultValue(props.result, 'title'))
const meta = computed(() => {
  return {
    contentType: formatContentTypeString(
      getSearchResultValue(props.result, 'type')
    ),
    topic: getSearchResultValue(props.result, 'field_topic_name'),
    dateStart: getSearchResultValue(
      props.result,
      'field_node_dates_start_value'
    ),
    dateEnd: getSearchResultValue(props.result, 'field_node_dates_end_value'),
    isGrantOngoing: getSearchResultValue(props.result, 'field_node_on_going')
    // @todo add profile and recommendation meta or a way to hook into this from other layers
    // fvRecommendationStatus
    // inductionYear
  }
})
const url = computed(() =>
  getSearchResultValue(props.result, 'url').replace(/\/site-(\d+)/, '')
)
const content = computed(() =>
  getSearchResultValue(props.result, 'field_landing_page_summary')
)
const img = computed(() => {
  const src = getSearchResultValue(
    props.result,
    'field_media_image_absolute_path'
  )
  if (src) {
    return {
      src,
      alt: ''
    }
  }
})
</script>

<template>
  <RplPromoCard
    class="tide-search-result-card rpl-col-12 rpl-col-4-m"
    :key="title"
    :image="img"
    :title="title"
    :url="url"
    :highlight="!img"
  >
    <template #meta v-if="result.type">
      <TideLandingPageCardSharedMeta :meta="meta" />
    </template>
    <p>
      {{ content }}
    </p>
  </RplPromoCard>
</template>

<style>
.tide-search-result-card {
  height: 100%;
}
</style>
