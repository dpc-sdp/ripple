<template>
  <RplPageComponent class="tide-grant__documents">
    <ul v-if="documents.length > 0" class="rpl-type-p">
      <li v-for="(file, i) in documents" :key="i">
        <RplFile
          v-bind="file"
          @download="(payload) => onDownload(payload, file)"
        />
      </li>
    </ul>
  </RplPageComponent>
</template>

<script setup lang="ts">
import type { TideGrantDocument } from '../types'
import { inject } from 'vue'

interface Props {
  documents: Array<TideGrantDocument>
}

defineProps<Props>()

const $rplEvent = inject('$rplEvent')

const onDownload = (payload, file) =>
  $rplEvent.emit('rpl-document/download', { ...payload, type: file.extension })
</script>
