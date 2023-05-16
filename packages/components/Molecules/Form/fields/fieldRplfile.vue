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
    :reset="reset"
    :handle-post="handlePost"
    :handle-delete="handleDelete"
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
    async handlePost (item, updateProgress) {
      const source = this.$axios.CancelToken.source()
      const [ id, field ] = this.getFieldID(this.schema).split(/-(.*)/g)

      try {
        const res = await this.$tide.upload(`/webform_rest/${id}/upload/${field}`, item.file, {}, {
          onUploadProgress: (progress) => updateProgress(item.id, progress, source),
          cancelToken: source.token
        })
        if (res?.fid && res?.uuid) {
          return { status: 'success', id: res.fid?.[0]?.value, uuid: res.uuid?.[0]?.value }
        }
        return { status: 'error', message: res?.message }
      } catch (e) {
        return { status: 'error', message: e?.response?.data?.message }
      }
    },
    async handleDelete (file) {
      try {
        await this.$tide.delete(`file/file/${file.uuid}`)

        return true
      } catch (e) {
        return false
      }
    },
    onUpdate (val) {
      this.value = val
    }
  }
}
</script>
