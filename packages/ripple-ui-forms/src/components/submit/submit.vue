<script setup lang="ts">
import { RplButton } from '@dpc-sdp/ripple-ui-core'
defineProps({
  context: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <RplButton
    :id="context.id"
    :variant="context.variant || 'filled'"
    theme="default"
    :type="context.type || 'submit'"
    :disabled="context.disabled"
    :icon-name="context.icon"
    :class="{
      ...context?.classes?.submit,
      'rpl-u-margin-t-4': true
    }"
    >{{ context.label }}</RplButton
  >
</template>
