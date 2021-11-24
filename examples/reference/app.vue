<template>
  <div>
    <!-- Remove this component to get started! -->
    <NuxtWelcome />
    <RplButton label="test" :primary="true" />
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
