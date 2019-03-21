<template>
  <rpl-checkbox
    :data-field-id="getFieldID(schema)"
    :inputId="getFieldID(schema, true)"
    v-model="value"
    :inputAutocomplete="schema.autocomplete"
    :inputDisabled="disabled"
    :inputName="schema.inputName"
    :inputClass="schema.fieldClasses"
    :inputRequired="schema.required"
    :inlineLabel="schema.inlineLabel"
  />
</template>

<script>
import RplCheckbox from '../Checkbox.vue'
import { abstractField } from 'vue-form-generator'

export default {
  mixins: [abstractField],
  components: {
    RplCheckbox
  }
}
</script>
