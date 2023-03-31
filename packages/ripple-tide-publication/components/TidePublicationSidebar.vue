<template>
  <div class="tide-publication__sidebar">
    <TidePublicationPageActions
      :documents="publication.documents"
      :printUrl="`${publication.url}/print-all`"
    >
    </TidePublicationPageActions>
    <RplSidebarComponent>
      <RplVerticalNav
        v-if="sidebar.items.length > 0"
        :title="publication.text"
        :items="sidebar.items"
        class="rpl-u-margin-b-9"
      ></RplVerticalNav>
    </RplSidebarComponent>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { indexNode, processMenu } from '../utils/processMenu.js'
import { useTidePublicationMenu } from '#imports'

interface Props {
  publication: any
}

const props = defineProps<Props>()

const sidebar = reactive({
  items: <indexNode[]>[]
})

const menu = await useTidePublicationMenu(props.publication.id)

onMounted(() => {
  /* eslint-disable no-undef */
  // @ts-ignore Nuxt auto import
  sidebar.items = processMenu(menu.publication, useRoute())
  /* eslint-enable no-undef */
})
</script>
