<template>
  <div>
    <RplContent class="rpl-type-p rpl-u-margin-b-4" :html="description" />
    <template v-if="component === 'RplSearchResult'">
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
      <ul class="rpl-grid">
        <template v-for="item in results" :key="item.id">
          <component
            :is="component"
            class="rpl-col-12 rpl-col-6-m rpl-col-4-l"
            v-bind="item.props"
          >
            {{ item.slots.default }}
          </component>
        </template>
      </ul>
    </template>
    <div
      v-if="link.url"
      class="rpl-type-label rpl-type-weight-bold rpl-u-margin-t-6"
    >
      <RplTextLink v-bind="link" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate, useTideSearch, useRuntimeConfig } from '#imports'
import { computed, inject, onMounted } from 'vue'
import {
  IContentCollectionDisplay,
  IContentCollectionSort
} from '../../../mapping/page-components/content-collection/content-collection-mapping'
import type { IRplFeatureFlags } from '@dpc-sdp/ripple-tide-api/types'

const { public: config } = useRuntimeConfig()

const featureFlags: IRplFeatureFlags = inject('featureFlags', {
  contentCollectionSearchConnector: 'appSearch'
})

const apiConnectorOptions =
  config.tide?.[featureFlags.contentCollectionSearchConnector]

interface IContentCollectionFilter {
  field: string
  values: string[]
}

const props = defineProps<{
  title: string
  description?: string
  link: {
    text: string
    url: string
  }
  display: IContentCollectionDisplay
  filters: IContentCollectionFilter[]
  sortBy: IContentCollectionSort
  perPage: number
}>()

const component = computed(() => {
  if (props.display.type === 'search-result') {
    return 'RplSearchResult'
  }

  return 'RplCardPromoCard'
})

const searchResultsMappingFn = (item): any => {
  const rawUpdated = item.changed?.raw?.[0]
  const rawImage = item.field_media_image_absolute_path?.raw?.[0]

  return {
    id: item._meta.id,
    props: {
      el: 'li',
      title: item.title?.raw?.[0],
      url: item.url?.raw?.[0].replace(/\/site-(\d+)/, ''),
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
  debug: true,
  trackUrlState: false,
  initialState: {
    resultsPerPage: props.perPage,
    sortList: [
      {
        field: props.sortBy.field,
        direction: props.sortBy.direction
      }
    ]
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

const { doSearch, results } = await useTideSearch(
  apiConnectorOptions,
  searchDriverOptions,
  [],
  searchResultsMappingFn
)

onMounted(() => doSearch())
</script>
