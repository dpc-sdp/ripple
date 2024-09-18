<template>
  <RplPageComponent class="tide-grant__documents">
    <ul v-if="documents.length > 0" class="rpl-type-p">
      <li v-for="(doc, i) in documents" :key="i">
        <RplFile
          data-cy="document"
          :url="doc.url"
          :name="doc.name"
          :extension="doc.extension"
          :size="doc.size"
          :openInNewWindow="isExternalUrl(doc.url, $app_hostname)"
          :download="true"
        />
      </li>
    </ul>
  </RplPageComponent>
</template>

<script setup lang="ts">
import { useNuxtApp } from '#imports'
import { isExternalUrl } from '@dpc-sdp/ripple-ui-core'
import type { TideGrantDocument } from '../types'

const { $app_hostname } = useNuxtApp()

interface Props {
  documents: Array<TideGrantDocument>
}

defineProps<Props>()
</script>

<style>
.tide-grant__documents ul {
  display: flex;
  flex-direction: column;
  gap: var(--rpl-sp-3);
}
</style>
