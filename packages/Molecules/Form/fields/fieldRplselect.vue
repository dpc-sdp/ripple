<template>
  <multiselect
    :options="options"
    :value="localValue"
    v-bind="selectOptions"
    :placeholder="schema.placeholder"
    :custom-label="customLabel"
    :max="schema.max || null"
    :disabled="disabled"
    @input="updateSelected"
    @search-change="onSearchChange"
    @tag="addTag"
    :option-height="selectOptions.optionHeight"
  >
  </multiselect>
</template>
<script>
import { abstractField } from 'vue-form-generator'

// See discussion on this issue:
// https://github.com/shentao/vue-multiselect/issues/385
// this might be able to removed if vue-multiselect implements fix

export default {
  mixins: [abstractField],
  data () {
    return {
      localValue: null
    }
  },
  watch: {
    value (newVal, oldVal) {
      if (newVal === null || newVal === undefined) {
        this.updateSelected(this.selectOptions.multiple ? [] : null)
        if (this.errors && this.errors.length > 0) {
          this.vfg.clearValidationErrors()
        }
      }
    }
  },
  mounted () {
    if (this.value) {
      this.updateSelected(this.options.find(opt => opt[this.selectOptions.trackBy] === this.value))
    }
  },
  computed: {
    selectOptions () {
      return this.schema.selectOptions || {}
    },
    options () {
      let values = this.schema.values
      if (typeof values === 'function') {
        return values.apply(this, [this.model, this.schema])
      } else {
        return values
      }
    },
    customLabel () {
      if (
        typeof this.schema.selectOptions !== 'undefined' &&
        typeof this.schema.selectOptions.customLabel !== 'undefined' &&
        typeof this.schema.selectOptions.customLabel === 'function'
      ) {
        return this.schema.selectOptions.customLabel
      } else {
        // this will let the multiselect library use the default behavior if customLabel is not specified
        return undefined
      }
    }
  },
  methods: {
    updateSelected (value) {
      const trackBy = this.selectOptions.trackBy || 'id'
      const isObj = (v) => typeof v === 'object' && v !== null && v.hasOwnProperty(trackBy)
      if (!this.selectOptions.multiple) {
        this.localValue = value
        if (isObj(value)) {
          this.value = value[trackBy]
        } else {
          this.value = value
        }
      } else {
        if (!this.localValue) {
          this.localValue = []
        }
        if (!this.value) {
          this.value = []
        }

        this.localValue = value

        if (value.every(v => isObj(v))) {
          this.value = value.map(v => v[trackBy])
        } else {
          this.value = value
        }

        if (Array.isArray(value) && value.length === 0) {
          this.value = []
          this.localValue = []
        }
      }
    },
    addTag (newTag, id) {
      let onNewTag = this.selectOptions.onNewTag
      if (typeof onNewTag === 'function') {
        onNewTag(newTag, id, this.options, this.value)
      }
    },
    onSearchChange (searchQuery, id) {
      let onSearch = this.selectOptions.onSearch
      if (typeof onSearch === 'function') {
        onSearch(searchQuery, id, this.options)
      }
    }
  }
}
</script>
