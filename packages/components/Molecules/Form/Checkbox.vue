<template>
  <label :is="presentational ? 'div' : 'label'" @click="labelClick" class="rpl-checkbox">
    <input
      type="checkbox"
      ref="input_checkbox"
      :id="inputId"
      v-model="checked"
      :autocomplete="inputAutocomplete"
      :disabled="inputDisabled"
      :name="inputName"
      :class="inputClass"
      :required="inputRequired"
      v-if="!presentational"
    />
    <span
      class="rpl-checkbox__box"
      :class="{ 'rpl-checkbox__box--checked': checked }"
    ><rpl-icon symbol="tick" color="primary" /></span>
    <span v-if="inlineLabel" class="rpl-checkbox__inline-label">{{ inlineLabel }}</span>
  </label>
</template>

<script>
import RplIcon from '@dpc-sdp/ripple-icon'

export default {
  name: 'RplCheckbox',
  props: {
    inputId: String,
    value: Boolean,
    inputAutocomplete: Boolean,
    inputDisabled: Boolean,
    presentational: Boolean,
    inputName: String,
    inputClass: Object,
    inputRequired: Boolean,
    inlineLabel: String
  },
  components: {
    RplIcon
  },
  methods: {
    updateValue (val) {
      this.$emit('input', val)
    },
    labelClick () {
      if (!this.presentational) {
        this.$refs['input_checkbox'].focus()
      }
    },
    updateChange (event) {
      this.$emit('change', event)
    }
  },
  computed: {
    checked: {
      set (val) {
        this.updateValue(val)
        this.updateChange(val)
      },
      get () {
        if (this.value === null || this.value === undefined) {
          return false
        }
        return this.value
      }
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  @import "scss/form";

  $rpl-checkbox-box-border: 1px solid $rpl-form-radio-border-color !default;
  $rpl-checkbox-box-border-focus: 1px solid rpl-color('primary') !default;
  $rpl-checkbox-box-border-radius: rem(4px);

  .rpl-checkbox {
    position: relative;
    text-indent: rem(-33px);
    padding-left: rem(33px);

    input[type="checkbox"] {
      position: absolute;
      top: 1px;
      left: 1px;
      opacity: 0;
      width: $rpl-space * 5;
      height: $rpl-space * 5;

      &:focus {
        & + .rpl-checkbox__box {
          border: $rpl-checkbox-box-border-focus;
        }
      }
    }

    &__inline-label {
      @include rpl_typography_ruleset($rpl-form-element-text-ruleset);
      margin-left: $rpl-space-2;
    }

    &__box {
      display: inline-block;
      vertical-align: middle;
      border: $rpl-checkbox-box-border;
      border-radius: $rpl-checkbox-box-border-radius;
      background-color: rpl-color('light_neutral');
      width: $rpl-space * 5;
      height: $rpl-space * 5;
      position: relative;

      .rpl-icon {
        display: none;
      }

      &--checked {
        background-color: rpl-color('white');
        box-shadow: $rpl-form-shadow;
        .rpl-icon {
          display: block;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
        }
      }
    }
  }
</style>
