<template>
  <multiselect
    :options="options"
    :value="localValue"
    v-bind="selectOptions"
    :multiple="false"
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

export default {
  mixins: [abstractField],
  data () {
    return {
      localValue: null
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
      if (!this.selectOptions.multiple) {
        this.localValue = value
        if (typeof value === 'object' && value !== null) {
          this.value = value[this.selectOptions.trackBy || 'id']
        } else {
          this.value = value
        }
      } else {
        // TODO handle multiple selection
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
