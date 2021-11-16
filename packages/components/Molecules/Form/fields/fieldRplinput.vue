<!-- fieldAwesome.vue -->
<template>
  <rpl-input
    v-model="value"
    :disabled="schema.disabled"
    :max="schema.max"
    :placeholder="schema.placeholder"
    :readonly="schema.readonly"
    :icon="schema.icon"
    :identifier="getFieldID(schema)"
  />
</template>
<script>
import RplInput from './../Input.vue'
import { abstractField } from 'vue-form-generator'
export default {
  name: 'RplInputField',
  components: {
    RplInput
  },
  mixins: [abstractField]
}
</script>
