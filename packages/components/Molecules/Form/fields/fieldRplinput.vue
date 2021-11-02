<!-- fieldAwesome.vue -->
<template>
  <rpl-input
    v-model="value"
    v-bind="schema"
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
