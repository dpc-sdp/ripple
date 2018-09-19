<template>
  <div class="rpl-date-picker">
    <date-picker
      lang="en-au"
      v-model="date"
      :range="schema.range"
      format="DD/MM/YYYY"
      rangeSeparator="-"
      @change="dateChange"
    >
      <template slot="calendar-icon"><rpl-icon symbol="calendar" color="primary" aria-label="Toggle Calendar"/></template>
      <template slot="mx-clear-icon"><rpl-icon symbol="close" color="primary" aria-label="Clear date"/></template>
    </date-picker>
  </div>
</template>

<script>
import { abstractField } from 'vue-form-generator'
import moment from 'moment'
import DatePicker from 'vue2-datepicker'
import RplIcon from '@dpc-sdp/ripple-icon'

export default {
  mixins: [abstractField],
  components: {
    DatePicker,
    RplIcon
  },
  data () {
    return {
      date: ''
    }
  },
  methods: {
    dateChange (val) {
      // Return array for date range, or single value for single date.
      const invalidDate = (this.schema.range && (val[0] === null || val[1] === null)) || val === null
      if (!invalidDate) {
        this.model[this.schema.model] = (this.schema.range) ? [moment(val[0]).format(), moment(val[1]).format()] : moment(val).format()
      } else {
        this.model[this.schema.model] = ''
      }
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/style";
@import "../scss/form";

.rpl-date-picker {
  .mx-input-append {
    display: flex;
    align-items: center;
    background-color: $rpl-form-element-bg-color;
    cursor: pointer;
  }

  .mx-input-wrapper:hover {
    .mx-clear-wrapper {
      display: flex;
    }
  }

  .mx-datepicker {
    width: auto;
    display: block;
  }
}

</style>
