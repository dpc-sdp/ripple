<template>
  <rpl-file
    :state="value"
    :max-size="schema.maxSize"
    :max-files="schema.maxFiles"
    :allowed-types="schema.allowedTypes"
    :disabled="schema.disabled"
    :readonly="schema.readonly"
    :placeholder="schema.placeholder"
    :identifier="getFieldID(schema)"
    @update="onUpdate"
  />
</template>
<script>
import RplFile from './../File.vue'
import { abstractField } from 'vue-form-generator'

export default {
  name: 'RplFileField',
  components: {
    RplFile
  },
  mixins: [abstractField],
  created () {
    if (!this.value) {
      this.value = []
    }
  },
  methods: {
    onUpdate (val) {
      this.value = val
    }
  }
}
</script>
