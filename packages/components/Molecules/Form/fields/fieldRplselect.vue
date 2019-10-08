<template>
  <rpl-select
    :multiselect="schema.multiselect"
    :values="values"
    :value="value"
    :model="model"
    :selectOptions="this.schema.values"
    :fieldId="getFieldID(schema)"
  />
</template>
<script>
import RplSelect from './../Select'
import { abstractField } from 'vue-form-generator'
export default {
  name: 'RplSelectField',
  mixins: [abstractField],
  components: {
    RplSelect
  },
  watch: {
    value: function (val) {
      if (val === null || val === undefined) {
        if (this.schema.multiselect) {
          this.value = []
        } else {
          this.value = ''
        }
      }
      // fixes issue with errors not clearing after selecting new val
      if (val && this.schema.multiselect && val.length > 0) {
        if (this.errors && this.errors.length > 0 && this.vfg) {
          this.vfg.clearValidationErrors()
        }
      }
    }
  },
  created () {
    if (!this.value) {
      if (this.schema.multiselect) {
        this.value = []
      } else {
        this.value = ''
      }
    }
  }
}
</script>
