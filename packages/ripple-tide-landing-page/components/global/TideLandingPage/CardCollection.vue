<template>
  <div>
    <pre>
      {{ filters }}
    </pre>
    <RplContent class="rpl-type-p rpl-u-margin-b-4" :html="description" />
    <ul class="rpl-storybook__page rpl-grid">
      <template v-for="(item) in results" :key="item.id">
        <component :is="item.component" class="rpl-col-12 rpl-col-6-m rpl-col-4-l" v-bind="item.props">
          {{ item.slots.default }}
        </component>
      </template>
    </ul>
    {{ results }}
    <RplTextLink v-bind="link" />
  </div>
</template>

<script setup lang="ts">
import { useTideSearch, useRuntimeConfig } from '#imports'
import { onMounted } from 'vue'

const { public: config } = useRuntimeConfig()
const apiConnectorOptions = config.tide?.appSearch

const searchResultsMappingFn = (item): any => {
  return {
    id: item._meta.id,
    component: 'RplCardNavCard',
    props: {
      title: item.title?.raw?.[0],
      url: item.url?.raw?.[0].replace(/\/site-(\d+)/, ''),
      image: item.field_media_image_absolute_path?.raw?.[0] && {
        src: item.field_media_image_absolute_path?.raw?.[0]
      }
    },
    slots: {
      default: item.field_landing_page_summary?.raw?.[0],
    }
  }
}

interface IContentCollectionFilter {
  field: string
  values: string[]
}

const props =
  defineProps<{
    title: string
    description?: string
    link: {
      text: string
      url: string
    }
    filters: IContentCollectionFilter[]
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

onMounted(() => {
  doSearch()
})


</script>
