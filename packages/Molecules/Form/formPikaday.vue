<template>
  <div class="rpl-form-pikaday">
    <input
      class="rpl-form-pikaday__input"
      type="text"
      v-model="displayVal"
      :autocomplete="autocomplete"
      :disabled="disabled"
      :placeholder="placeholder"
      :readonly="readonly"
      :name="inputName"
      @keyup="keyup"
    />
    <rpl-icon class="rpl-form-pikaday__icon" symbol="calendar" color="primary" />
  </div>
</template>

<script>
import { defaults } from 'lodash'
import moment from 'moment'
import RplIcon from '@dpc-sdp/ripple-icon'

export default {
  props: {
    value: String,
    autocomplete: String,
    disabled: Boolean,
    placeholder: String,
    readonly: String,
    inputName: String,
    options: Object
  },
  components: {
    RplIcon
  },
  data () {
    let pickerOptions = defaults(this.options || {}, {
      showDaysInNextAndPreviousMonths: true,
      format: 'DD/MM/YYYY',
      theme: 'rpl-pikaday',
      i18n: {
        previousMonth: 'Previous Month',
        nextMonth: 'Next Month',
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        weekdaysShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
      }
    })
    return {
      displayVal: this.value ? moment(this.value).format(pickerOptions.format) : '',
      picker: null,
      pickerOptions: pickerOptions
    }
  },
  methods: {
    pikadayInit: async function () {
      const Pikaday = await import('pikaday')
      this.picker = new Pikaday(defaults(this.pickerOptions, {
        field: this.$el,
        onSelect: () => {
          this.displayVal = this.picker.toString()
          this.$emit('change', this.picker.getDate())
        }
      }))
      this.$emit('init', this.picker)
    },
    keyup (e) {
      if (this.displayVal === '') {
        this.$emit('change', null)
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.pikadayInit()
    })
  },
  computed: {
    model () {
      return this.$parent.model[this.$parent.schema.model]
    }
  },
  watch: {
    model (newVal, oldVal) {
      if (newVal === null || newVal === undefined) {
        this.displayVal = ''
      }
    }
  },
  beforeDestroy () {
    if (this.picker) {
      this.picker.destroy()
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";
@import "./scss/form";

$rpl-pikaday-background: rpl-color('white') !default;
$rpl-pikaday-border: 1px solid rpl-color('primary') !default;
$rpl-pikaday-border-radius: rem(4px) !default;
$rpl-pikaday-padding: $rpl-space-3 !default;
$rpl-pikaday-label-text-color: rpl-color('extra_dark_neutral') !default;
$rpl-pikaday-nav-arrow-color: rpl-color('primary') !default;
$rpl-pikaday-nav-arrow-color-hover: rpl-color('secondary') !default;
$rpl-pikaday-header-text-color: mix(rpl-color('white'), rpl-color('dark_neutral'), 0.65) !default;
$rpl-pikaday-date-size: 2.125rem !default;
$rpl-pikaday-date-text-color: rpl-color('dark_neutral') !default;
$rpl-pikaday-date-text-color-hover: rpl-color('primary') !default;
$rpl-pikaday-date-disabled-text-color: rpl-color('mid_neutral_1') !default;
$rpl-pikaday-date-start-range-background-cover: linear-gradient(to right, rpl-color('white') 0%, rpl-color('white') 49.9%, rpl-color('light_neutral') 50%, rpl-color('light_neutral') 100%) !default;
$rpl-pikaday-date-end-range-background-cover: linear-gradient(to right, rpl-color('light_neutral') 0%, rpl-color('light_neutral') 49.9%, rpl-color('white') 50%, rpl-color('white') 100%) !default;
$rpl-pikaday-date-range-text-color: rpl-color('white') !default;
$rpl-pikaday-date-range-background: rpl-gradient('primary_gradient_90') !default;
$rpl-pikaday-date-range-border-radius: 100% !default;
$rpl-pikaday-date-in-range-background: rpl-color('light_neutral') !default;
$rpl-pikaday-date-in-range-text-color: rpl-color('extra_dark_neutral') !default;
$rpl-pikaday-date-today-text-color: rpl-color('secondary') !default;

// Following styles are adapted from the Pikaday calendar library.
// Copyright © 2014 David Bushell | BSD & MIT license | http://dbushell.com/
.rpl-pikaday {
  z-index: 9999;
  display: block;
  position: relative;
  background: $rpl-pikaday-background;
  border: $rpl-pikaday-border;
  border-radius: $rpl-pikaday-border-radius;
  padding: $rpl-pikaday-padding;

  &:before,
  &:after {
    content: " ";
    display: table;
  }

  &:after {
    clear: both;
  }

  &.is-hidden {
    display: none;
  }

  &.is-bound {
    @include rpl_dropshadow;
    position: absolute;
  }

  .pika-lendar {
    float: left;
    width: rem(240px);
    margin: rem(8px);
  }

  .pika-title {
    position: relative;
    text-align: center;

    select {
      cursor: pointer;
      position: absolute;
      z-index: 9998;
      margin: 0;
      left: 0;
      top: rem(5px);
      opacity: 0;
    }
  }

  .pika-label {
    display: inline-block;
    position: relative;
    z-index: 9999;
    overflow: hidden;
    margin: 0;
    padding: rem(5px) rem(3px);
    color: $rpl-pikaday-label-text-color;
  }

  .pika-prev,
  .pika-next {
    background-color: transparent;
    display: block;
    cursor: pointer;
    position: relative;
    outline: none;
    overflow: hidden;
    border: 0;
    padding: 0;
    width: rem(20px);
    height: rem(30px);
    text-indent: rem(20px);
    white-space: nowrap;

    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
      margin: rem(5px) 0 0 rem(5px);
    }

    .is-disabled {
      cursor: default;
    }
  }

  .pika-prev,
  .is-rtl .pika-next {
    float: left;

    &::before {
      border-width: rem(5px) rem(8.7px) rem(5px) 0;
      border-color: transparent $rpl-pikaday-nav-arrow-color transparent transparent;
    }

    &:hover,
    &:focus {
      &::before {
        border-color: transparent $rpl-pikaday-nav-arrow-color-hover transparent transparent;
      }
    }
  }

  .pika-next,
  .is-rtl .pika-prev {
    float: right;

    &::before {
      border-width: rem(5px) 0 rem(5px) rem(8.7px);
      border-color: transparent transparent transparent $rpl-pikaday-nav-arrow-color;
    }

    &:hover,
    &:focus {
      &::before {
        border-color: transparent transparent transparent $rpl-pikaday-nav-arrow-color-hover;
      }
    }
  }

  .pika-select {
    display: inline-block;
  }

  .pika-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border: 0;

    abbr {
      border-bottom: none;
      text-decoration: none;
    }

    th {
      text-align: center;
      color: $rpl-pikaday-header-text-color;
      font-weight: normal;
    }
  }

  .pika-row {
    td {
      width: $rpl-pikaday-date-size + $rpl-space-4;
      height: $rpl-pikaday-date-size;
      text-align: center;

      &.is-disabled,
      &.is-outside-current-month {
        .pika-button {
          pointer-events: none;
          color: $rpl-pikaday-date-disabled-text-color;
        }
      }

      &.is-startrange {
        background: $rpl-pikaday-date-start-range-background-cover;
      }

      &.is-endrange {
        background: $rpl-pikaday-date-end-range-background-cover;
      }

      &.is-inrange {
        background-color: $rpl-pikaday-date-in-range-background;

        .pika-button {
          color: $rpl-pikaday-date-in-range-text-color;
        }
      }

      &.is-today {
        .pika-button {
          color: $rpl-pikaday-date-today-text-color;
        }
      }

      .pika-button {
        cursor: pointer;
        color:  $rpl-pikaday-date-text-color;
        background-color: transparent;
        border: 0;
        margin: 0;
        height: $rpl-pikaday-date-size;
        width: $rpl-pikaday-date-size;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover,
        &:focus {
          color: $rpl-pikaday-date-text-color-hover;
        }
      }

      &.is-startrange,
      &.is-endrange {
        .pika-button {
          color: $rpl-pikaday-date-range-text-color;
          border-radius: $rpl-pikaday-date-range-border-radius;
          background-image: $rpl-pikaday-date-range-background;
        }
      }
    }
  }
}

.rpl-form-pikaday {
  position: relative;
  flex-grow: 1;

  &__icon {
    position: absolute;
    top: 0;
    bottom: 0;
    right: $rpl-space-4;
    margin: auto;
    pointer-events: none;
  }
}
</style>
