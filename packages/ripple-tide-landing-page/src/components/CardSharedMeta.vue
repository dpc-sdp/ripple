<template>
  <RplTag :label="meta.contentType" variant="neutral" />
  <span class="rpl-card__topic">{{ meta.topic }}</span>
  <span class="rpl-card__status">
    <RplIcon class="rpl-icon--colour-error" name="icon-cancel-circle-filled" />
    <span>TODO_GRANT</span>
  </span>
  <span>TODO_FVSTATUS</span>
  <span>TODO_FORMATTED_DATE</span>
  <span>TODO_INDUCTION_YEAR</span>
</template>

<script setup lang="ts">
import { RplTag } from '@dpc-sdp/ripple-ui-core'

interface Props {
  meta: {
    contentType: string
    topic: string
    isGrantOngoing: boolean
  }
}

const props = withDefaults(defineProps<Props>(), {})
</script>
