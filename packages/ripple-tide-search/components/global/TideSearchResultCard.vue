<script setup lang="ts">
import {
  computed,
  getSearchResultValue,
  capitalizeFirstLetter,
  useSearchResult
} from '#imports'

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

const { title, url, summary, image } = useSearchResult(props.result)

const id = computed(() => getSearchResultValue(props.result, 'uid'))
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
    publishDate: getSearchResultValue(props.result, 'field_news_date'),
    isGrantOngoing: getSearchResultValue(props.result, 'field_node_on_going')
    // @todo add profile and recommendation meta or a way to hook into this from other layers
    // fvRecommendationStatus
    // inductionYear
  }
})
</script>

<template>
  <RplPromoCard
    :key="id"
    class="tide-search-result-card rpl-col-12 rpl-col-4-m"
    :image="image"
    :title="title"
    :url="url"
    :highlight="!image"
  >
    <template v-if="result.type" #meta>
      <TideLandingPageCardSharedMeta :meta="meta" />
    </template>
    <p>
      {{ summary }}
    </p>
  </RplPromoCard>
</template>
