<template>
  <div>
    <RplButton label="tests" :theme="'tertiary'" />
    <NuxtWelcome />
  </div>
</template>

<script lang="ts">
import { RplButton } from '@dpc-sdp/ripple-ui-core'

export default {
  components: {
    RplButton
  }
}
</script>
