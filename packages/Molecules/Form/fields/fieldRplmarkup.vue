<template>
  <rpl-markup :plugins="this.schema.plugins" :html="markup" />
</template>

<script>
import { abstractField } from 'vue-form-generator'
import RplMarkup from '@dpc-sdp/ripple-markup'
export default {
  mixins: [abstractField],
  components: {RplMarkup},
  computed: {
    markup () {
      return this.schema.markup
    }
  }
}
</script>