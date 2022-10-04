<script lang="ts">
export default { name: 'TideGrantDocuments' }
</script>

<template>
  <div class="tide-grant__documents">
    <ul v-if="documents.length > 0" class="rpl-type-p">
      <li v-for="(doc, i) in documents" :key="i">
        <rpl-text-link :url="doc.url">{{ doc.name }}</rpl-text-link>
        <!-- <rpl-file
          :name="doc.name"
          :url="doc.url"
          :size="doc.filesize"
          :extension="doc.extension"
        ></rpl-file> -->
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { TideGrantDocument } from '../../types'

defineProps<{
  documents: Array<TideGrantDocument>
}>()
</script>

<style>
.tide-grant__documents {
  margin-top: var(--rpl-sp-12);
  margin-bottom: var(--rpl-sp-12);
}
</style>
