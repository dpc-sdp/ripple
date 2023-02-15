<script setup lang="ts">
import { RplContent } from '@dpc-sdp/ripple-ui-core/vue'
interface Props {
  html: string
}

defineProps<Props>()
</script>
<template>
  <div class="rpl-form__outer">
    <RplContent :html="html" />
  </div>
</template>
