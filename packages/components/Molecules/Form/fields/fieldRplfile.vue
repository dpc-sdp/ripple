<template>
  <rpl-file
    :max-size="schema.maxSize"
    :max-files="schema.maxFiles"
    :allowed-types="schema.allowedTypes"
    :multiple="schema.multiple"
    :disabled="schema.disabled"
    :readonly="schema.readonly"
    :placeholder="schema.placeholder"
    :identifier="getFieldID(schema)"
    :name="schema.model"
    :reset="reset"
    :handle-post="postFile"
    :handle-delete="deleteFile"
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
  inject: ['postFile', 'deleteFile'],
  data () {
    return {
      reset: null
    }
  },
  created () {
    if (!this.value) {
      this.value = this.schema.multiple ? [] : ''
    }
  },
  watch: {
    value: function (val) {
      if (val === null || val === undefined) {
        this.reset = Date.now()
        this.value = this.schema.multiple ? [] : ''
      }
    }
  },
  methods: {
    onUpdate (val) {
      this.value = val
    }
  }
}
</script>
