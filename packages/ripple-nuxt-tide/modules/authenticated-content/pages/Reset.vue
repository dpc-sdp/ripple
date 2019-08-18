<template>
  <rpl-page-layout class="app-main">
    <rpl-row row-gutter class="app-content">
      <rpl-col cols="full">
        <div class="tide-reset">
          <div class="tide-reset__form">
            <div class="tide-reset__header">
              <h2>{{ forms.reset.title }}</h2>
            </div>
            <rpl-form
              :formData="forms.reset"
              :submitHandler="submitForm"
              :hideAfterSuccess=true
            >
            </rpl-form>
          </div>
        </div>
        </rpl-col>
    </rpl-row>
  </rpl-page-layout>
</template>

<script>
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import { RplPageLayout } from '@dpc-sdp/ripple-layout'
import RplForm from '@dpc-sdp/ripple-form'

const FIELDS = {
  password: {
    type: 'input',
    inputType: 'password',
    model: 'pass',
    label: 'New Password',
    required: true
  },
  submit: {
    type: 'submit',
    buttonText: 'Submit'
  }
}

const FORM_ENDPOINTS = {
  reset: '/api/v1/user/reset'
}

export default {
  components: {
    RplCol,
    RplRow,
    RplForm,
    RplPageLayout
  },
  props: {
    page: Object
  },
  data () {
    return {
      messages: {
        success: 'Your password has been reset.',
        error: 'We are experiencing a server error. Please try again, otherwise contact us.'
      },
      forms: {
        reset: {
          title: 'Reset',
          endpoint: FORM_ENDPOINTS.reset,
          model: {
            pass: ''
          },
          schema: {
            fields: [
              { ...FIELDS.password },
              { ...FIELDS.submit }
            ]
          },
          formOptions: {
            validateAfterLoad: true,
            validateAfterChanged: true
          },
          formState: {}
        }
      },
      params: {}
    }
  },
  validate ({ params }) {
    this.params = params
    // Must be a number
    return /^\d+$/.test(params.id) &&
      /^\d+$/.test(params.time) &&
      /^.+$/.test(params.hash)
  },
  methods: {
    async submitForm () {
      // @TODO handle each form endpoint submission response - error, redirect, success
      const { model: data } = this.forms.reset

      data.id = this.$route.params.id
      data.time = this.$route.params.time
      data.hash = this.$route.params.hash
      data.pass = this.forms.reset.model.pass
      this.$tide.post('user/reset_password', data)
        .then(r => {
          this.forms.reset.formState = { response: { status: 'success', message: this.messages.success } }
        })
        .catch(e => {
          this.forms.reset.formState = { response: { status: 'failed', message: this.messages.error } }
        })
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

.tide-reset {
  &__header {
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
  }
}
</style>
