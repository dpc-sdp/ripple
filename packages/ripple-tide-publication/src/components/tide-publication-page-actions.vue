<script lang="ts">
export default { name: 'TidePublicationPageActions' }
</script>

<template>
  <div class="tide-publication__actions rpl-u-margin-b-9">
    <RplPageAction>
      <template #upper>
        <RplFile v-for="file in documents" :key="file.id" v-bind="file" />
      </template>
      <RplDocument url="https://vic.gov.au/#print">
        <template #icon>
          <RplIcon name="icon-print-lined" size="l" colour="default" />
        </template>
        <template #name> Print full document </template>
      </RplDocument>
    </RplPageAction>
  </div>
</template>

<script setup lang="ts">
import { RplPageAction, RplFile, RplDocument } from '@dpc-sdp/ripple-ui-core'

defineProps<{
  documents: any
}>()
</script>
