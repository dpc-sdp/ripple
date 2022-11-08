<script lang="ts">
export default { name: 'TideGrantDocuments' }
</script>

<template>
  <div class="tide-grant__documents rpl-u-margin-t-9">
    <ul v-if="documents.length > 0" class="rpl-type-p">
      <li v-for="(doc, i) in documents" :key="i">
        <RplDocument :url="doc.url" data-cy="document">
          <template #icon>
            <RplIcon name="icon-document-lined" size="l" colour="default" />
          </template>
          <template #name>{{ doc.name }} </template>
          <template #info>
            <span class="rpl-file__meta">{{ doc.extension }}</span>
            <span class="rpl-file__meta">{{ doc.filesize }}</span>
          </template>
        </RplDocument>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { TideGrantDocument } from '../types'
import { RplDocument, RplIcon } from '@dpc-sdp/ripple-ui-core'

defineProps<{
  documents: Array<TideGrantDocument>
}>()
</script>
