<template>
  <div>
    <RplContent class="rpl-type-p rpl-u-margin-b-4" :html="description" />
    <RplContent v-if="error">
      <p>Sorry! Something went wrong. Please try again later.</p>
    </RplContent>
    <RplContent v-else-if="searchComplete && !results.length">
      <p>Sorry! We couldn't find any matches.</p>
    </RplContent>
    <div v-else>
      <template v-if="display.type === 'list'">
        <div class="rpl-grid">
          <div class="rpl-col-12 rpl-col-8-m">
            <RplResultListing>
              <template v-for="item in results" :key="item.id">
                <RplResultListingItem>
                  <RplSearchResult
                    v-bind="item.props"
                    :content="item.slots.default"
                  />
                </RplResultListingItem>
              </template>
            </RplResultListing>
          </div>
        </div>
      </template>
      <template v-else>
        <ul class="rpl-grid" style="--local-grid-cols: 12">
          <RplPromoCard
            v-for="item in results"
            :key="item.id"
            :class="cardClasses"
            v-bind="item.props"
          >
            {{ item.slots.default }}
          </RplPromoCard>
        </ul>
      </template>
      <div
        v-if="link?.url"
        class="rpl-type-label rpl-type-weight-bold rpl-u-margin-t-6"
      >
        <RplTextLink v-bind="link" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  formatDate,
  useRuntimeConfig,
  useFetch,
  trackError,
  getSingleResultValue,
  useNuxtApp,
  stripSiteId
} from '#imports'
import { computed, ref } from 'vue'
import { IContentCollectionDisplay } from '../../../mapping/components/content-collection/content-collection-mapping'
import { stripMediaBaseUrl } from '@dpc-sdp/ripple-tide-api/utils'

const { public: config } = useRuntimeConfig()

const props = defineProps<{
  description?: string
  link?: {
    text: string
    url: string
  } | null
  searchQuery: Record<string, any>
  display: IContentCollectionDisplay
  hasSidebar?: boolean
}>()

const cardClasses = computed(() =>
  props.hasSidebar
    ? 'rpl-col-12 rpl-col-6-s'
    : 'rpl-col-12 rpl-col-6-s rpl-col-4-m'
)

const searchResultsMappingFn = (item): any => {
  const { $app_origin, $config } = useNuxtApp()
  const rawUpdated = getSingleResultValue(item._source?.changed)
  const rawImage = getSingleResultValue(
    item._source?.field_media_image_absolute_path
  )

  return {
    id: item._id,
    props: {
      el: 'li',
      title: getSingleResultValue(item._source?.title),
      url: stripSiteId(
        getSingleResultValue(item._source?.url),
        $app_origin || ''
      ),
      image:
        props.display.style === 'thumbnail' && rawImage
          ? { src: stripMediaBaseUrl(rawImage, $config.public?.tide?.baseUrl) }
          : null,
      updated: rawUpdated ? formatDate(rawUpdated) : '',
      type: getSingleResultValue(item._source?.type)
    },
    slots: {
      default: getSingleResultValue(item._source?.field_landing_page_summary)
    }
  }
}

const error = ref(null)
const searchComplete = ref(false)
const results = ref(null)

const index = config.tide.elasticsearch.index
const searchUrl = `${config.apiUrl}/api/tide/elasticsearch/${index}/_search`

const { data, error: fetchError } = await useFetch(searchUrl, {
  method: 'POST',
  body: props.searchQuery
})

if (fetchError.value) {
  trackError(fetchError.value)
  error.value = fetchError.value
} else {
  results.value = data.value?.hits?.hits?.map(searchResultsMappingFn)
}

searchComplete.value = true
</script>
