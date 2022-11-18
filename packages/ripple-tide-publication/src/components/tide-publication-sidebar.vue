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
      v-if="!indexError"
      :title="publication.text"
      :items="items"
    ></RplVerticalNav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  useFetch,
  useRuntimeConfig
  // @ts-ignore
} from '#imports'

interface Props {
  publication: any
}

const props = defineProps<Props>()

const { public: config } = useRuntimeConfig()

const [{ data: menu, error: indexError }] = await Promise.all([
  useFetch('/api/tide/publication-index', {
    baseURL: config.API_URL || '',
    params: {
      id: props.publication.id
    }
  })
])

/* eslint-disable no-undef */
// @ts-ignore Nuxt auto import
const route = useRoute()
/* eslint-enable no-undef */

interface indexNode {
  text: string
  url: string
  id: string
  items: indexNode[] | undefined
  active: boolean
}

const parseChildren = (node) => {
  if (node.children) {
    const returnNode: indexNode[] = []

    node.children.map((child) => {
      returnNode.push({
        text: child.text,
        url: child.url,
        id: child.id,
        active: child.url === route.path,
        items: parseChildren(child)
      })
    })
    return returnNode
  }
}

const transformNode = (node) =>
  [
    {
      text: node.text,
      url: node.url,
      id: node.id,
      active: node.url === route.path
    }
  ].concat(parseChildren(node))

const items = computed(() => [
  {
    text: menu.value.publication.text,
    url: menu.value.publication.url,
    id: menu.value.publication.id,
    active: menu.value.publication.url === route.path
  },
  ...menu.value.publication.children.map((child) => ({
    text: child.text,
    url: child.url,
    id: child.id,
    active: route.path.includes(child.url),
    items:
      // Group chapter together (child with its children)
      child.children?.length > 0 ? transformNode(child) : undefined
  }))
])
</script>
