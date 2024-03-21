<template>
  <div>
    <RplContent class="rpl-type-p rpl-u-margin-b-4" :html="description" />
    <RplContent v-if="searchState.error">
      <p>Sorry! Something went wrong. Please try again later.</p>
    </RplContent>
    <RplContent v-else-if="searchComplete && !searchState.totalResults">
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
        v-if="link.url"
        class="rpl-type-label rpl-type-weight-bold rpl-u-margin-t-6"
      >
        <RplTextLink v-bind="link" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate, useSearchUI, useRuntimeConfig } from '#imports'
import { computed, inject } from 'vue'
import {
  IContentCollectionDisplay,
  IContentCollectionFilter,
  IContentCollectionSort
} from '../../../mapping/components/content-collection/content-collection-mapping'
import type { IRplFeatureFlags } from '@dpc-sdp/ripple-tide-api/types'
import { stripSiteId } from '@dpc-sdp/ripple-tide-api'

const { public: config } = useRuntimeConfig()

const featureFlags: IRplFeatureFlags = inject('featureFlags', {
  contentCollectionSearchConnector: 'appSearch'
})

const apiConnectorOptions = {
  type: featureFlags.contentCollectionSearchConnector,
  ...(config.tide?.[featureFlags.contentCollectionSearchConnector] || {})
}

const props = defineProps<{
  title: string
  description?: string
  link: {
    text: string
    url: string
  }
  display: IContentCollectionDisplay
  perPage: number
  filters: IContentCollectionFilter[]
  sortBy: IContentCollectionSort[]
  hasSidebar: boolean
}>()

const cardClasses = computed(() =>
  props.hasSidebar
    ? 'rpl-col-12 rpl-col-6-s'
    : 'rpl-col-12 rpl-col-6-s rpl-col-4-m'
)

const searchResultsMappingFn = (item): any => {
  const { $app_origin } = useNuxtApp()
  const rawUpdated = item.changed?.raw?.[0]
  const rawImage = item.field_media_image_absolute_path?.raw?.[0]

  return {
    id: item._meta.id,
    props: {
      el: 'li',
      title: item.title?.raw?.[0],
      url: stripSiteId(item.url?.raw?.[0], $app_origin || ''),
      image:
        props.display.style === 'thumbnail' && rawImage
          ? { src: rawImage }
          : null,
      updated: rawUpdated ? formatDate(rawUpdated) : '',
      type: item.type?.raw?.[0]
    },
    slots: {
      default:
        item.field_landing_page_summary?.snippet ||
        item.field_landing_page_summary?.raw?.[0]
    }
  }
}

const searchDriverOptions = {
  trackUrlState: false,
  alwaysSearchOnInitialLoad: true,
  initialState: {
    resultsPerPage: props.perPage,
    sortList: props.sortBy
  },
  searchQuery: {
    filters: props.filters,
    result_fields: {
      title: {
        raw: {
          size: 150
        }
      },
      field_landing_page_summary: {
        snippet: {
          size: 150,
          fallback: true
        }
      },
      field_media_image_absolute_path: {
        raw: {}
      },
      changed: {
        raw: {}
      },
      url: {
        raw: {}
      },
      type: {
        raw: {}
      }
    }
  }
}

const { results, searchState, searchComplete } = await useSearchUI(
  apiConnectorOptions,
  searchDriverOptions,
  [],
  searchResultsMappingFn
)
</script>
