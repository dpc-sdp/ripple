<template>
  <div class="tide-publication__actions rpl-u-margin-b-9">
    <RplPageAction>
      <template v-if="documents.length > 0" #upper>
        <RplFile
          v-for="file in documents"
          :key="file.id"
          v-bind="file"
          @download="(payload) => onDownload(payload, file)"
        />
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
import { inject } from 'vue'

interface Props {
  documents: any
}

defineProps<Props>()

const $rplEvent = inject('$rplEvent')

const onDownload = (payload, file) =>
  $rplEvent.emit('rpl-document/download', { ...payload, type: file.extension })
</script>
