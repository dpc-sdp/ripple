<template>
  <div class="rpl-date-picker">
    <el-date-picker
      v-if="schema.range"
      v-model="date"
      type="daterange"
      format="dd/MM/yyyy"
      range-separator="To"
      start-placeholder="Start date"
      end-placeholder="End date"
      @change="dateChange"
    >
      <template slot="sidebar">Woo</template>
    </el-date-picker>
    <el-date-picker
      v-if="!schema.range"
      v-model="date"
      type="date"
      format="dd/MM/yyyy"
      placeholder="Pick a date"
      @change="dateChange"
    ></el-date-picker>
  </div>
</template>

<script>
import { abstractField } from 'vue-form-generator'
import moment from 'moment'
import RplIcon from '@dpc-sdp/ripple-icon'
import { DatePicker } from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

// configure language
locale.use(lang)

export default {
  mixins: [abstractField],
  components: {
    'ElDatePicker': DatePicker,
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

.el-picker-panel {
  $root: &;
  background: rpl-color('white');
  border: 1px solid #0052c2;
  border-radius: 4px;
  padding: 20px;

  &.el-date-range-picker {
    #{$root}__body {
      display: flex;
      flex-wrap: nowrap;
    }

    #{$root}__content {
      &:nth-child(2) {
        margin-left: $rpl-space * 5;
      }
    }
  }
}

.el-date-picker__header,
.el-date-range-picker__header {
  color: rpl-color('dark_neutral');

  button {
    border: 0;
    background-color: transparent;
    width: 26px;
    height: 26px;
    padding: 0;
  }

  [class*=arrow-left] {
    float: left;
  }

  [class*=arrow-right] {
    float: right;
  }
}

.el-icon-d-arrow-left {
  &:before {
    content: '<<';
  }
}

.el-icon-arrow-left {
  &:before {
    content: '<';
  }
}

.el-icon-arrow-right {
  &:before {
    content: '>';
  }
}

.el-icon-d-arrow-right {
  &:before {
    content: '>>';
  }
}

.el-date-picker__header {
  margin-bottom: $rpl-space-4;
  text-align: center;
}

.el-date-range-picker__header {
  margin-bottom: $rpl-space-4;
  div {
    text-align: center;
    margin-left: 26px * 2;
    margin-right: 26px * 2;
  }
}

th {
  text-align: center;
  color: rpl-color('dark_neutral');
  opacity: 0.65;
  font-weight: normal;
}

.el-date-editor--daterange {
  display: flex;
  align-items: center;
}

.el-range-separator {
  margin: 0 $rpl-space-2;
}

.el-date-table__row {
  td {
    width: 34px + 16px;
    height: 34px;
    text-align: center;
    color: rpl-color('dark_neutral');

    div {
      margin: auto;
      height: 34px;
      width: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &.in-range {
      background-color: rpl-color('light_neutral');
      color: rpl-color('extra_dark_neutral');
    }

    &.prev-month,
    &.next-month {
      color: rpl-color('mid_neutral_1');
    }

    &.start-date {
      background-image: linear-gradient(to right, rpl-color('white') 0%, rpl-color('white') 49.9%, rpl-color('light_neutral') 50%, rpl-color('light_neutral') 100%);
    }

    &.end-date {
      background-image: linear-gradient(to right, rpl-color('light_neutral') 0%, rpl-color('light_neutral') 49.9%, rpl-color('white') 50%, rpl-color('white') 100%);
    }

    &.start-date,
    &.end-date,
    &.current {
      div {
        color: rpl-color('white');
        border-radius: 100%;
        background-image: rpl-gradient('primary_gradient_90');
      }
    }
  }
}
</style>
