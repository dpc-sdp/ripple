<template>
  <rpl-input
    v-model="value"
    :disabled="false"
    placeholder=""
    :readonly="false"
    :identifier="getFieldID(schema)"
    autocomplete="off"
    tabindex="-1"
  />
</template>

<script>
import RplInput from '../Input.vue'
import { abstractField } from 'vue-form-generator'
export default {
  name: 'RplHopo',
  components: {
    RplInput
  },
  mixins: [abstractField],
  mounted () {
    this.schema.label = this.schema.label || 'Important email'
    this.schema.model = this.schema.model || 'honeypot'
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  @import "../scss/form";

  .field-rplhopo {
    display: none !important;

    &.rplhopo-show {
      display: block !important;
    }
  }

</style>
