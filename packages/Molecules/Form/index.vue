<template>
  <form class="rpl-form" @submit="onSubmit">
    <rpl-form-alert ref="alert" v-if="formData.formState.response" :variant="formData.formState.response.status" v-html="formData.formState.response.message">
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
import Multiselect from 'vue-multiselect'
import VueFormGenerator from 'vue-form-generator'
import fieldRplselect from './fields/fieldRplselect.vue'
import fieldRplslider from './fields/fieldRplslider.vue'
import fieldRplcheckbox from './fields/fieldRplcheckbox.vue'
import fieldRplchecklist from './fields/fieldRplchecklist.vue'
import fieldRpldatepicker from './fields/fieldRpldatepicker.vue'
import fieldRplsubmitloader from './fields/fieldRplsubmitloader.vue'
import fieldRpldivider from './fields/fieldRpldivider.vue'
import fieldRplmarkup from './fields/fieldRplmarkup.vue'
import VueScrollTo from 'vue-scrollto'

Vue.component('Multiselect', Multiselect)
Vue.component('fieldRplselect', fieldRplselect)
Vue.component('fieldRplslider', fieldRplslider)
Vue.component('fieldRplcheckbox', fieldRplcheckbox)
Vue.component('fieldRplchecklist', fieldRplchecklist)
Vue.component('fieldRpldatepicker', fieldRpldatepicker)
Vue.component('fieldRplsubmitloader', fieldRplsubmitloader)
Vue.component('fieldRpldivider', fieldRpldivider)
Vue.component('fieldRplmarkup', fieldRplmarkup)

export { VueFormGenerator }

export default {
  name: 'RplForm',
  components: {
    'vue-form-generator': VueFormGenerator.component,
    fieldRplselect,
    fieldRplslider,
    fieldRplchecklist,
    fieldRpldatepicker,
    fieldRplsubmitloader,
    RplFormAlert
  },
  props: {
    formData: Object,
    submitHandler: Function,
    hideAfterSuccess: Boolean,
    scrollTo: {type: Boolean, default: true}
  },
  methods: {
    hideForm () {
      if (this.formData.formState.response) {
        return !(this.hideAfterSuccess && this.formData.formState.response.status === 'success')
      } else {
        return true
      }
    },
    scrollToMessage () {
      if (this.scrollTo) {
        this.$nextTick(function () {
          if (this.$refs.alert) {
            VueScrollTo.scrollTo(this.$refs.alert, 500, { offset: -150 })
          }
        })
      }
    },
    onSubmit (event) {
      event.preventDefault()
      // Run custom submit callback if no error in validation
      if (this.$refs.vfg.errors.length === 0) {
        this.submitHandler()
        this.scrollToMessage()
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
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";
@import "~@dpc-sdp/ripple-global/scss/components/button";
@import "scss/form";

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

  .hint {
    margin-bottom: $rpl-space-2;
  }

  .error {
    input,
    textarea,
    .multiselect__tags,
    .form-control
    {
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
      > label {
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
  }

  &__single {
    background: none;
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
