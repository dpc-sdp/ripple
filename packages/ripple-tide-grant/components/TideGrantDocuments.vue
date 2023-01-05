<template>
  <RplLayoutPageComponent class="tide-grant__documents">
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
  </RplLayoutPageComponent>
</template>

<script setup lang="ts">
import type { TideGrantDocument } from '../../types'

interface Props {
  documents: Array<TideGrantDocument>
}

defineProps<Props>()
</script>
