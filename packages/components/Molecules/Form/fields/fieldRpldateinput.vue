<template>
  <div class="rpl-date-input">
    <input
      v-model.lazy="displayValue"
      :autocomplete="schema.autocomplete"
      :disabled="disabled"
      :placeholder="schema.placeholder"
      :readonly="schema.readonly"
      :name="schema.inputName"
      v-cleave="maskOptions"
    >
  </div>
</template>

<script>
import Cleave from 'cleave.js'
import moment from 'moment'
import { abstractField } from 'vue-form-generator'

export default {
  mixins: [abstractField],
  watch: {
    displayValue () {
      this.value = moment(this.displayValue, ['DD', 'MM', 'YYYY'].join(this.maskOptions.delimiter)).format()
    }
  },
  data () {
    return {
      maskOptions: {
        date: true,
        delimiter: '/',
        datePattern: ['d', 'm', 'Y'],
        ...this.schema.mask
      },
      displayValue: this.value
    }
  },
  directives: {
    cleave: {
      inserted: (el, binding) => {
        el.cleave = new Cleave(el, binding.value || {})
      },
      update: (el) => {
        const event = new Event('input', { bubbles: true })
        setTimeout(function () {
          el.value = el.cleave.properties.result
          el.dispatchEvent(event)
        }, 100)
      }
    }
  }
}
</script>
