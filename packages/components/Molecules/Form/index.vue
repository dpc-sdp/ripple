<template>
  <form class="rpl-form" @submit="onSubmit">
    <h3 class="rpl-form__title" v-if="title">{{title}}</h3>
    <rpl-form-alert v-if="formData.formState.response && formData.formState.response.message" :variant="formData.formState.response.status" v-html="formData.formState.response.message">
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
    validateOnSubmit: { type: Boolean, default: true }
  },
  mounted () {
    RplFormEventBus.$on('clearform', this.clearForm)
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
      event.preventDefault()
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

.rpl-form {
  @include rpl_typography_ruleset($rpl-form-text-ruleset);
  @include rpl_print_hidden;

  &__title {
    margin-top: 0;
  }

  label {
    @include rpl_typography_ruleset(('s', 1em, 'bold'));
    color: rpl-color('extra_dark_neutral');
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
      display: inline-flex;
      align-items: center;
      margin-right: $rpl-space-4;
    }

    input[type="radio"] {
      margin-right: $rpl-space-2;
    }
  }

  input[type="radio"] {
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
