<template>
  <form class="rpl-form" @submit="onSubmit" :class="{ 'rpl-form--full-width': fullWidth }">
    <h3 class="rpl-form__title" v-if="title">{{title}}</h3>
    <rpl-form-alert v-if="formData.formState.response && formData.formState.response.message" :variant="formData.formState.response.status">
      <span v-html="formData.formState.response.message"></span>
    </rpl-form-alert>
    <vue-form-generator
      :schema="formData.schema"
      :model="formData.model"
      :options="formData.formOptions"
      ref="vfg"
      :tag="formData.tag"
      v-show="hideForm()"
    />
  </form>
</template>

<script>
import Vue from 'vue'
import RplFormAlert from './formAlert'
import RplFieldset from './Fieldset'
import VueFormGenerator from 'vue-form-generator'
import fieldRplselect from './fields/fieldRplselect.vue'
import fieldRplslider from './fields/fieldRplslider.vue'
import fieldRplcheckbox from './fields/fieldRplcheckbox.vue'
import fieldRplchecklist from './fields/fieldRplchecklist.vue'
import fieldRpldatepicker from './fields/fieldRpldatepicker.vue'
import fieldRplsubmitloader from './fields/fieldRplsubmitloader.vue'
import fieldRploptionbutton from './fields/fieldRploptionbutton.vue'
import fieldRplclearform from './fields/fieldRplclearform.vue'
import fieldRpldivider from './fields/fieldRpldivider.vue'
import fieldRplmarkup from './fields/fieldRplmarkup.vue'
import VueScrollTo from 'vue-scrollto'
import { RplFormEventBus } from './index.js'

Vue.component('fieldRplselect', fieldRplselect)
Vue.component('fieldRplslider', fieldRplslider)
Vue.component('fieldRplcheckbox', fieldRplcheckbox)
Vue.component('fieldRplchecklist', fieldRplchecklist)
Vue.component('fieldRpldatepicker', fieldRpldatepicker)
Vue.component('fieldRplsubmitloader', fieldRplsubmitloader)
Vue.component('fieldRploptionbutton', fieldRploptionbutton)
Vue.component('fieldRplclearform', fieldRplclearform)
Vue.component('fieldRpldivider', fieldRpldivider)
Vue.component('fieldRplmarkup', fieldRplmarkup)
Vue.component('RplFieldset', RplFieldset)

export default {
  name: 'RplForm',
  components: {
    'vue-form-generator': VueFormGenerator.component,
    fieldRplselect,
    fieldRplslider,
    fieldRplchecklist,
    fieldRpldatepicker,
    fieldRplsubmitloader,
    fieldRploptionbutton,
    fieldRplclearform,
    RplFormAlert,
    RplFieldset
  },
  props: {
    title: String,
    formData: Object,
    submitHandler: Function,
    hideAfterSuccess: Boolean,
    clearFormOnSuccess: { type: Boolean, default: false },
    submitFormOnClear: { type: Boolean, default: false },
    scrollToMessage: { type: Boolean, default: true },
    validateOnSubmit: { type: Boolean, default: true },
    fullWidth: { type: Boolean, default: true }
  },
  mounted () {
    RplFormEventBus.$on('clearform', this.clearForm)

    // TODO: We should abstract all future custom validators to a separate file and import them here.
    VueFormGenerator.validators.rplWordCount = function (value, field) {
      let wordCount = value ? value.trim().split(/\s+/).length : 0

      if (wordCount > field.rplWordCountMax) {
        return ['You have too many words. Maximum is ' + field.rplWordCountMax + ', you have ' + wordCount + ' words.']
      }
      if (wordCount < field.rplWordCountMin) {
        return ['You have too few words. Minimum is ' + field.rplWordCountMin + ', you have ' + wordCount + ' words.']
      }
      return []
    }
    // Validate if multiple select is a required field, then atleast one value should be selected.
    VueFormGenerator.validators.rplSelectMultipleRequired = function (value, field) {
      if (value && value.length >= field.min) {
        return []
      }
      return ['Add a selection']
    }
    // Validate if multiple select has a max limiit of selection.
    VueFormGenerator.validators.rplSelectMaxLimit = function (value, field) {
      if (value && value.length <= field.max) {
        return []
      }
      return ['More than ' + field.max + ' selections are not allowed']
    }
  },
  methods: {

    hideForm () {
      if (this.formData.formState.response) {
        return !(this.hideAfterSuccess && this.formData.formState.response.status === 'success')
      } else {
        return true
      }
    },
    clearForm () {
      for (let key in this.formData.model) {
        const model = this.formData.model[key]
        if (typeof model === 'object' && !Array.isArray(model) && model !== null) {
          // nested objects need to be initalized back to an empty object to work
          this.formData.model[key] = {}
        } else {
          this.formData.model[key] = null
        }
      }
      if (this.$refs.vfg && this.$refs.vfg.errors && this.$refs.vfg.errors.length > 0) {
        this.$refs.vfg.clearValidationErrors()
      }
      if (this.submitFormOnClear) {
        this.onSubmit()
      }
    },
    async onSubmit (event) {
      if (event) event.preventDefault()
      // call validation manually
      if (this.validateOnSubmit) {
        this.$refs.vfg.validate()
      }

      // Run custom submit callback if no error in validation
      if (this.$refs.vfg.errors.length === 0) {
        RplFormEventBus.$emit('loading', true)
        await this.submitHandler()
        if (this.scrollToMessage) {
          VueScrollTo.scrollTo(this.$el, 500, { offset: -150 })
        }
        if (this.clearFormOnSuccess) {
          this.clearForm()
        }
      } else {
        // scroll into view first element with error
        const firstError = this.$refs.vfg.$children.find(child => child.field.model === this.$refs.vfg.errors[0].field.model)
        if (firstError) {
          VueScrollTo.scrollTo(firstError.$el, 500, { offset: -100 })
        }
      }
      RplFormEventBus.$emit('loading', false)
    }
  }
}
</script>

<style lang="scss">

@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";
@import "~@dpc-sdp/ripple-global/scss/components/button";
@import "scss/form";

$rpl-form-title-color: rpl-color('extra_dark_neutral') !default;
$rpl-form-label-color: rpl-color('extra_dark_neutral') !default;
$rpl-form-hint-color: rpl-color('extra_dark_neutral') !default;
$rpl-form-input-prepend-icon-color: rpl-color('dark_neutral') !default;
$rpl-form-input-search-icon: url("data:image/svg+xml,%3Csvg width='16' height='16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.99 9.243c1.597-2.45 1.224-5.82-1.133-7.833C7.59-.526 4.137-.46 1.94 1.557a6 6 0 00-.19 8.653c2.043 2.045 5.205 2.293 7.527.757.031-.02.102-.083.198-.173l4.343 4.195a.941.941 0 101.308-1.354l-4.324-4.176c.098-.106.166-.184.188-.216zm-8.023-.25a4.274 4.274 0 010-6.035 4.266 4.266 0 016.03 0 4.274 4.274 0 010 6.034 4.266 4.266 0 01-6.03 0z' fill='%23#{str-slice(quote($rpl-form-input-prepend-icon-color), 2)}'/%3E%3C/svg%3E");

.rpl-form {
  max-width: $rpl-content-max-width;
  @include rpl_typography_ruleset($rpl-form-text-ruleset);

  &__title {
    color: $rpl-form-title-color;
    margin-top: 0;
  }

  label:not(.rpl-option-button__label) {
    @include rpl_typography_ruleset(('s', 1em, 'bold'));
    color: $rpl-form-label-color;
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

    &[type='radio']:not(.rpl-option-button__radio),
    &[type='checkbox'] {
      &+ label {
        display: inline-block;
        margin: 0;
      }
    }
  }

  &__prepend-icon {
    .wrapper {
      position: relative;
      &:before {
        position: absolute;
        top: $rpl-space-4;
        left: $rpl-space-4;
        width: $rpl-space-4;
        height: $rpl-space-4;
        background-repeat: no-repeat;
        content: "";
      }
      input {
        padding-left: $rpl-space * 10;
      }
    }
    &--search {
      .wrapper {
        &:before {
          background-image: $rpl-form-input-search-icon;
        }
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
      display: inline-flex;
      align-items: center;
      margin-right: $rpl-space-4;
    }

    input[type="radio"]:not(.rpl-option-button__radio) {
      margin-right: $rpl-space-2;
    }
  }

  input[type="radio"]:not(.rpl-option-button__radio) {
    @include rpl_radio_button;
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

  .hint {
    color: $rpl-form-hint-color;
    margin-bottom: $rpl-space-2;
  }

  .error {
    input,
    textarea,
    .multiselect__tags,
    .form-control {
      @include rpl_from_element_error;
    }
  }

  .help-block {
    @include rpl_typography_ruleset($rpl-form-help-ruleset);
    margin-top: $rpl-space-3;

    &.errors {
      order: 2;
      margin-bottom: $rpl-space-2;
      color: rpl-color('danger');
    }
  }

  &--full-width {
    max-width: 100%;
  }
}

.vue-form-generator {
  > fieldset {
    padding: 0;
    border-width: 0;
  }

  .form-group {
    margin-bottom: $rpl-form-element-margin-bottom-s;
    display: flex;
    flex-direction: column;
    @include rpl_breakpoint(m) {
      margin-bottom: $rpl-form-element-margin-bottom-m;
    }

    &.required {
      > label,
      .field-wrap > label {
        &:after {
          margin-left: $rpl-space;
          @include rpl_typography_ruleset($rpl-form-required-ruleset);
          color: $rpl-form-required-color;
          content: $rpl-form-required-message;
        }
      }
    }

    label {
      order: 1;
    }

    .hint {
      order: 2;
    }

    .field-wrap {
      order: 3;
    }
  }
}

.multiselect {
  &__tags {
    @include rpl_form_text_element;
    padding-right: rem(40px);
  }

  &__placeholder {
    margin-bottom: 0;
    padding: 0;
    color: $rpl-form-element-placeholder-color;
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
