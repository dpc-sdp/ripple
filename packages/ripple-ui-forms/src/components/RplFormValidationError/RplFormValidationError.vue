<script setup lang="ts">
import { computed } from 'vue'
import { RplIcon } from '@dpc-sdp/ripple-ui-core/vue'

interface Props {
  messages: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {})

const messageType = computed(() => {
  return Object.keys(props.messages)
    .map((key) => {
      return props.messages[key].value
    })
    .join(', ')
})
</script>

<template>
  <span class="rpl-form-validation-error rpl-type-p rpl-type-weight-bold">
    <RplIcon name="icon-exclamation-circle-filled" />
    <span>{{ messageType }}</span>
  </span>
</template>

<style src="./RplFormValidationError.css"></style>
