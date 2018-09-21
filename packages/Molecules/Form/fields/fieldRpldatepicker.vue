<template>
  <div v-if="isRanged" class="rpl-date-picker rpl-date-picker--range">
    <pikaday
      class="rpl-date-picker__start"
      v-model="modelStart"
      :autocomplete="schema.autocomplete"
      :disabled="disabled"
      :placeholder="schema.startPlaceholder"
      :readonly="schema.readonly"
      :name="schema.inputName"
      @change="startChange"
      @init="startInit" />
    <span class="rpl-date-picker__separator">-</span>
    <pikaday
      class="rpl-date-picker__end"
      v-model="modelEnd"
      :autocomplete="schema.autocomplete"
      :disabled="disabled"
      :placeholder="schema.endPlaceholder"
      :readonly="schema.readonly"
      :name="schema.inputName"
      @change="endChange"
      @init="endInit" />
  </div>
  <div v-else class="rpl-date-picker rpl-date-picker--single">
    <pikaday
      v-model="datePickValue"
      :autocomplete="schema.autocomplete"
      :disabled="disabled"
      :placeholder="schema.placeholder"
      :readonly="schema.readonly"
      :name="schema.inputName"
      @change="singleUpdateDate" />
  </div>
</template>

<script>
import { abstractField, dateFieldHelper } from 'vue-form-generator'
import moment from 'moment'
import pikaday from '../formPikaday.vue'

export default {
  mixins: [abstractField],
  components: {
    pikaday
  },
  data () {
    if (this.schema.range) {
      let startValue = ''
      let endValue = ''
      if (this.value) {
        if (this.value[0]) {
          startValue = moment(this.value[0]).format()
        }
        if (this.value[1]) {
          endValue = moment(this.value[1]).format()
        }
      }
      return {
        isRanged: true,
        startPicker: null,
        endPicker: null,
        modelStart: startValue,
        modelEnd: endValue,
        returnStart: startValue,
        returnEnd: endValue
      }
    } else {
      return {
        isRanged: false,
        datePickValue: this.value
      }
    }
  },
  methods: {
    // Range Methods
    startChange (val) {
      const pikadate = moment(val)
      this.returnStart = pikadate.format()
      this.startRange(pikadate.toDate())
      this.rangeUpdateDate()
    },
    endChange (val) {
      const pikadate = moment(val)
      this.returnEnd = pikadate.format()
      this.endRange(pikadate.toDate())
      this.rangeUpdateDate()
    },
    startRange (date) {
      this.startPicker.setStartRange(date)
      this.endPicker.setStartRange(date)
    },
    endRange (date) {
      this.startPicker.setEndRange(date)
      this.endPicker.setEndRange(date)
    },
    startInit (picker) {
      this.startPicker = picker
      this.initRanges()
    },
    endInit (picker) {
      this.endPicker = picker
      this.initRanges()
    },
    initRanges () {
      if (this.startPicker && this.endPicker) {
        this.startRange(moment(this.modelStart).toDate())
        this.endRange(moment(this.modelEnd).toDate())
      }
    },
    rangeUpdateDate () {
      this.value = [this.returnStart, this.returnEnd]
    },
    // Single Methods
    singleUpdateDate (val) {
      this.value = moment(val).format()
    },
    ...dateFieldHelper
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/style";
@import "../scss/form";

.rpl-date-picker {
  $root: &;

  &--range {
    @include rpl-breakpoint('s') {
      display: flex;
      align-items: center;
    }
  }

  &__separator {
    display: none;
    @include rpl-breakpoint('s') {
      display: block;
      margin: 0 $rpl-space-2;
    }
  }

  // Override default rpl-form input margin.
  .rpl-form & {
    input[type='text'] {
      &#{$root}__start {
        margin-bottom: $rpl-form-element-margin-bottom-s;
        @include rpl_breakpoint('s') {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
