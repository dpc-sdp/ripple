<template>
  <form class="rpl-form" @submit="onSubmit">
    <rpl-form-alert v-if="formData.formState.response" :variant="formData.formState.response.status">
      {{ formData.formState.response.message }}
    </rpl-form-alert>
    <vue-form-generator
      :schema="formData.schema"
      :model="formData.model"
      :options="formData.formOptions"
      ref="vfg"
      v-show="hideForm()"
    />
  </form>
</template>

<script>
import Vue from 'vue'
import RplFormAlert from './formAlert'
import VueFormGenerator from 'vue-form-generator'
import Multiselect from 'vue-multiselect'
Vue.component('multiselect', Multiselect)

export { VueFormGenerator }

export default {
  name: 'RplForm',
  components: {
    'vue-form-generator': VueFormGenerator.component,
    Multiselect,
    RplFormAlert
  },
  props: {
    formData: Object,
    submitHandler: Function,
    hideAfterSuccess: Boolean
  },
  methods: {
    hideForm () {
      if (this.formData.formState.response) {
        return !(this.hideAfterSuccess && this.formData.formState.response.status === 'success')
      } else {
        return true
      }
    },
    onSubmit (event) {
      event.preventDefault()
      // Run custom submit callback if no error in validation
      if (this.$refs.vfg.errors.length === 0) {
        this.submitHandler()
      }
    },
    onValidated (isValid, errors) {
      // console.log('Validation result: ', isValid, ', Errors:', errors)
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/style";

$rpl-form-label-ruleset: ('l', 1.2em, 'medium') !default;
$rpl-form-text-ruleset: ('xs', 1.3em, 'regular') !default;
$rpl-form-help-ruleset: ('xs', 1em, 'medium') !default;
$rpl-form-element-bg-color: rpl-color('light_neutral') !default;
$rpl-form-element-border-color: rpl-color('mid_neutral_1') !default;
$rpl-form-element-border-color-focus: rpl-color('primary') !default;
$rpl-form-element-border-radius: rem(4px) !default;
$rpl-form-element-text-color: rpl-color('extra_dark_neutral') !default;
$rpl-form-element-text-highlighted: rpl-color('secondary') !default;
$rpl-form-element-padding-s: $rpl-space-4!default;
$rpl-form-element-padding-m: $rpl-space * 5 !default;
$rpl-form-element-margin-bottom-s: $rpl-space-4 !default;
$rpl-form-element-margin-bottom-m: $rpl-space * 7 !default;
$rpl-form-textarea-height-s: rem(180px) !default;
$rpl-form-textarea-height-m: rem(75px) !default;

@mixin rpl_form_text_element {
  background-color: $rpl-form-element-bg-color;
  border: 1px solid $rpl-form-element-border-color;
  border-radius: $rpl-form-element-border-radius;
  box-sizing: border-box;
  color: $rpl-form-element-text-color;
  height: auto;
  width: 100%;
  padding: $rpl-form-element-padding-s;
  margin: 0;

  @include rpl_breakpoint(m) {
    padding: $rpl-form-element-padding-m;
  }

  &:focus {
    border-color: $rpl-form-element-border-color-focus;
  }
}

@mixin rpl_from_element_error {
  border-color: rpl-color('danger');
  background-color: $rpl-danger-bg-color;
}

.rpl-form {
  @include rpl_typography_ruleset($rpl-form-text-ruleset);
  padding-left: $rpl-component-padding-xs;
  padding-right: $rpl-component-padding-xs;

  @include rpl_breakpoint(s) {
    padding-left: $rpl-component-padding-s;
    padding-right: $rpl-component-padding-s;
  }

  @include rpl_breakpoint(m) {
    padding-left: 0;
    padding-right: 0;
  }

  label {
    @include rpl_typography_ruleset($rpl-form-label-ruleset);
    display: block;
    margin-bottom: $rpl-space-3;
  }

  input {
    &[type='text'],
    &[type='password'],
    &[type='datetime'],
    &[type='datetime-local'],
    &[type='date'],
    &[type='month'],
    &[type='time'],
    &[type='week'],
    &[type='number'],
    &[type='email'],
    &[type='url'],
    &[type='search'],
    &[type='tel'],
    &[type='color'],
    &:not([type]) {
      @include rpl_form_text_element;
    }

    &[type='radio'],
    &[type='checkbox'] {
      &+ label {
        display: inline-block;
        margin: 0;
      }
    }
  }

  textarea {
    @include rpl_form_text_element;
    height: $rpl-form-textarea-height-s;

    @include rpl_breakpoint(m) {
      height: $rpl-form-textarea-height-m;
    }
  }

  .radio-list {
    label {
      @include rpl_typography_ruleset($rpl-form-text-ruleset);
      display: inline;
      margin-right: $rpl-space-4;
    }

    input[type="radio"] {
      margin-right: $rpl-space-2;
    }
  }

  [type='submit'] {
    @include rpl_button;
    @include rpl_button_primary;
  }

  .buttons {
    button {
      @include rpl_button;
    }
  }

  .error {
    input,
    textarea {
      @include rpl_from_element_error;
    }
  }

  .help-block {
    @include rpl_typography_ruleset($rpl-form-help-ruleset);
    margin-top: $rpl-space-3;

    &.errors {
      color: rpl-color('danger');
    }
  }
}

.vue-form-generator {
  > fieldset {
    padding: 0;
    border-width: 0;
  }

  .form-group {
    margin-bottom: $rpl-form-element-margin-bottom-s;
    @include rpl_breakpoint(m) {
      margin-bottom: $rpl-form-element-margin-bottom-m;
    }
  }
}

.multiselect {
  &__tags {
    @include rpl_form_text_element;
    padding-right: rem(40px);
  }

  &__single {
    background: none;
    margin-bottom: 0;
  }

  &__element {
    &:nth-child(even) {
      background-color: $rpl-form-element-bg-color;
    }
    &:nth-child(odd) {
      background-color: rpl-color('white');
    }
  }

  &__option {
    &--selected {
      color: $rpl-form-element-text-highlighted;
    }

    &--highlight {
      color: rpl-color('white');
      background: $rpl-form-element-text-highlighted;

      &.multiselect__option--selected {
        background-color: rpl-color('danger');
      }
    }
  }
}
</style>
