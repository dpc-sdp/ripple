<template>
  <div :id="getFieldID(schema)" class="rpl-option-button" :disabled="disabled" v-attributes="'wrapper'">
    <label v-for="(item, index) in optionValues" :key="index" :for="getId(index)" class="rpl-option-button__label" :class="{ 'rpl-option-button__label--checked': isItemChecked(item) }">
      <input :id="getId(index)" type="radio" :name="getFieldID(schema)" class="rpl-option-button__radio" @click="onSelection(item)" :value="item" :class="schema.fieldClasses" :required="schema.required" />
      <span class="rpl-option-button__text">{{ item }}</span>
    </label>
  </div>
</template>

<script>
import { abstractField } from 'vue-form-generator'
import { RplFormEventBus } from '@dpc-sdp/ripple-form'

export default {
  name: 'RplOptionButton',
  mixins: [abstractField],
  data () {
    return {
      optionValues: this.schema.optionValues || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    }
  },
  computed: {
    id () {
      return this.schema.model
    }
  },
  methods: {
    getId (idx) {
      return `${this.getFieldID(this.schema)}-opt-${idx + 1}`
    },
    onSelection (item) {
      this.value = item
      if (this.schema.submitOnClick) {
        RplFormEventBus.$emit('submitform')
      }
    },
    isItemChecked (item) {
      return (item === this.value)
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  @import "../scss/form";

  $rpl-option-button-label-background-color: rpl-color('white') !default;
  $rpl-option-button-label-border-width: 1px !default;
  $rpl-option-button-label-border: $rpl-option-button-label-border-width solid $rpl-form-element-border-color !default;
  $rpl-option-button-label-checked-border: $rpl-option-button-label-border-width solid rpl-color('primary') !default;
  $rpl-option-button-text-focused-color: rpl-color('primary') !default;
  $rpl-option-button-text-focused-border: $rpl-option-button-label-border-width solid rpl-color('primary') !default;

  .rpl-option-button {
    $root: &;
    margin-left: $rpl-option-button-label-border-width;
    margin-top: $rpl-option-button-label-border-width;

    &__label {
      position: relative;
      display: inline-block;
      background-color: $rpl-option-button-label-background-color;
      color: $rpl-form-element-text-color;
      border: $rpl-option-button-label-border;
      padding: $rpl-space-2;
      min-width: rem(40px);
      box-sizing: border-box;
      text-align: center;
      margin-left: -$rpl-option-button-label-border-width;
      margin-top: -$rpl-option-button-label-border-width;

      &:focus-within {
        border: $rpl-option-button-text-focused-border;
        z-index: 1;

        #{$root}__text {
          text-decoration: underline;
          color: $rpl-option-button-text-focused-color;
        }
      }

      &--checked {
        border: $rpl-option-button-label-checked-border;
        z-index: 1;

        #{$root}__text {
          text-decoration: none;
        }
      }

      @include rpl-breakpoint('l') {
        &:first-child {
          border-radius: $rpl-form-element-border-radius 0 0 $rpl-form-element-border-radius;
        }
        &:last-child {
          border-radius: 0 $rpl-form-element-border-radius $rpl-form-element-border-radius 0;
        }
      }
    }

    &__radio {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
</style>
