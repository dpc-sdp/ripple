<template>
  <div class="tide-publication__actions rpl-u-margin-b-9">
    <RplPageAction>
      <template v-if="documents.length > 0" #upper>
        <RplFile v-for="file in documents" :key="file.id" v-bind="file" />
      </template>
      <RplDocument
        v-if="printUrl"
        :url="printUrl"
        :global-events="false"
        class="tide-publication__actions-print"
        @download="handleDownload"
      >
        <template #icon>
          <RplIcon name="icon-print-lined" size="l" colour="default" />
        </template>
        <template #name>Print full document</template>
      </RplDocument>
    </RplPageAction>
  </div>
</template>

<script setup lang="ts">
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'

interface Props {
  documents?: any
  printUrl?: string
}

withDefaults(defineProps<Props>(), {
  documents: () => [],
  printUrl: undefined
})

const emit = defineEmits<{
  (e: 'print', payload: rplEventPayload): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-document', emit)

const handleDownload = (payload: rplEventPayload) => {
  emitRplEvent(
    'print',
    {
      ...payload,
      action: 'print'
    },
    { global: true }
  )
}
</script>
