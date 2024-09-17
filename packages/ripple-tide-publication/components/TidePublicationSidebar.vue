<template>
  <div class="tide-publication__sidebar">
    <TidePublicationPageActions
      :documents="publication.documents"
      :printUrl="`${publication.url}/print-all`"
    >
    </TidePublicationPageActions>
    <RplSidebarComponent>
      <RplVerticalNav
        v-if="navigation?.length"
        :title="publication.text"
        :items="navigation"
        class="rpl-u-margin-b-9"
      ></RplVerticalNav>
    </RplSidebarComponent>
  </div>
</template>

<script setup lang="ts">
import { indexNode } from '../types'

interface Props {
  publication: any
  navigation: indexNode[]
}

defineProps<Props>()
</script>
