<script lang="ts">
export default { name: 'TidePublicationSidebar' }
</script>

<template>
  <div class="tide-publication__sidebar">
    <TidePublicationPageActions
      v-if="publication.documents"
      :documents="publication.documents"
    ></TidePublicationPageActions>
    <RplVerticalNav
      v-if="!error && sidebar.items.length > 0"
      :title="publication.text"
      :items="sidebar.items"
    ></RplVerticalNav>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { indexNode, processMenu } from './processMenu.js'
import {
  useFetch,
  useRuntimeConfig
  // @ts-ignore
} from '#imports'

interface Props {
  publication: any
}

const props = defineProps<Props>()

const sidebar = reactive({
  items: <indexNode[]>[]
})

const { public: config } = useRuntimeConfig()

const { data: menu, error: error } =
  (await useFetch('/api/tide/publication-index', {
    baseURL: config.API_URL || '',
    params: {
      id: props.publication.id
    }
  })) || {}

onMounted(() => {
  /* eslint-disable no-undef */
  // @ts-ignore Nuxt auto import
  sidebar.items = processMenu(menu.value.publication, useRoute())
  /* eslint-enable no-undef */
})
</script>
