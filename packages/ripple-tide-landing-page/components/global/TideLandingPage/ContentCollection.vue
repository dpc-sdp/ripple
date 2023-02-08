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
import { useTideSearch, useRuntimeConfig } from '#imports'
import { computed, onMounted } from 'vue'
import { IContentCollectionDisplay } from '../../../mapping/page-components/content-collection/content-collection-mapping'

const { public: config } = useRuntimeConfig()
const apiConnectorOptions = config.tide?.appSearch

const component = computed(() => {
  if (props.display.type === 'search-result') {
    return 'RplSearchResult'
  }

  return 'RplCardPromoCard'
})

const searchResultsMappingFn = (item): any => {
  return {
    id: item._meta.id,
    props: {
      el: 'li',
      title: item.title?.raw?.[0],
      url: item.url?.raw?.[0].replace(/\/site-(\d+)/, ''),
      image:
        props.display.style === 'thumbnail' &&
        item.field_media_image_absolute_path?.raw?.[0]
          ? { src: item.field_media_image_absolute_path?.raw?.[0] }
          : null
    },
    slots: {
      default: item.field_landing_page_summary?.raw?.[0]
    }
  }
}

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
  filters: IContentCollectionFilter[]
  sortBy: string
  perPage: number
  display: IContentCollectionDisplay
}>()

const { doSearch, results } = await useTideSearch(
  apiConnectorOptions,
  {
    debug: true,
    searchQuery: {
      filters: props.filters
    }
  },
  [],
  searchResultsMappingFn
)

onMounted(() =>
  doSearch({
    perPage: props.perPage,
    sortBy: props.sortBy
  })
)
</script>
