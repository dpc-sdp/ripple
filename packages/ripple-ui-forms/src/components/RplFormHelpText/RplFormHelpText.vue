<script setup lang="ts">
import { RplContent } from '@dpc-sdp/ripple-ui-core'

interface Props {
  html: string
}

const props = withDefaults(defineProps<Props>(), {
  html: ''
})
</script>

<template>
  <RplContent class="rpl-form-help" :html="html" />
</template>

<style src="./RplFormHelpText.css"></style>
