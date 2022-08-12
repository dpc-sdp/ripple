<script setup lang="ts">
import { RplButton } from '@dpc-sdp/ripple-ui-core'
defineProps({
  context: Object
})
</script>

<template>
  <RplButton
    :variant="context.variant || 'filled'"
    theme="default"
    :type="context.type || 'submit'"
    :disabled="context.disabled"
    :iconName="context.icon"
    :id="context.id"
    :class="{
      ...context?.classes?.submit,
      'rpl-u-margin-t-4': true
    }"
    >{{ context.label }}</RplButton
  >
</template>
