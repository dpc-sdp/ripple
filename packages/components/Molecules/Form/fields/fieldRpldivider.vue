<template>
  <rpl-divider />
</template>

<script>
import { RplDivider } from '@dpc-sdp/ripple-global'
import { abstractField } from 'vue-form-generator'

export default {
  mixins: [abstractField],
  components: {
    RplDivider
  }
}
</script>
