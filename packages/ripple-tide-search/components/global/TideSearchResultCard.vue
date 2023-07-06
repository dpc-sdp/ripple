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
  >
    {{ content }}
  </RplPromoCard>
</template>

<style>
.tide-search-result-card {
  height: 100%;
}
</style>
