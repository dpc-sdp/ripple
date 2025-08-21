<template>
  <div class="tide-publication__sidebar">
    <TidePublicationPageActions
      v-if="publication.documents?.length || printUrl"
      :documents="publication.documents"
      :printUrl="printUrl"
    >
    </TidePublicationPageActions>
    <RplSidebarComponent>
      <RplVerticalNav
        v-if="navigation?.length"
        :title="publication.text"
        :items="navigation"
        class="tide-publication__sidebar-nav rpl-u-margin-b-9"
      ></RplVerticalNav>
    </RplSidebarComponent>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { indexNode } from '../types'
import { flattenMenu } from '#imports'

interface Props {
  publication: any
  navigation: indexNode[]
}

const props = defineProps<Props>()

// The maximum number of items is used as larger publication print pages
// will result in "414 Request-URI Too Large"
const MAX_NAV_ITEMS = 80

const printUrl = computed(() => {
  const url = `${props.publication.url}/print-all`

  if (!props.navigation?.length) return url

  const navItems = flattenMenu(props.navigation)

  return navItems.length < MAX_NAV_ITEMS ? url : null
})
</script>
