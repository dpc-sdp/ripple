<template>
  <!-- This form can be embed by a iframe with width 100% and height 300px -->
  <div class="sdp-app-url-shorten">
    <rpl-form
    :formData="formData"
    :submitHandler="submitForm"
    class="sdp-app-url-shorten__form"
    >
    </rpl-form>
    <div v-if="shortUrl" class="sdp-app-url-shorten__result">
      <div class="sdp-app-url-shorten__result-content">
        <label>Short URL:</label>
        <input type="text" :value="shortUrl" id="sdp-app-shorten-url">
      </div>
      <rpl-button class="sdp-app-url-shorten__result-copy" theme="secondary" @click.native="copyUrl">Copy url</rpl-button>
    </div>
  </div>
</template>

<script>
import RplForm from '@dpc-sdp/ripple-form'
import rplButton from '@dpc-sdp/ripple-button'

// Our url shorten service server
const server = 'https://go.vic.gov.au/'

export default {
  layout: 'minimal',
  components: {
    RplForm,
    rplButton
  },
  data () {
    return {
      shortUrl: null,
      formData: {
        model: {
          url: ''
        },

        schema: {
          fields: [
            {
              type: 'input',
              inputType: 'text',
              model: 'url',
              label: 'Shorten URL',
              hint: 'Please enter the URL that you\'d like to shorten or click',
              required: true
            },

            {
              type: 'rplsubmitloader',
              buttonText: 'Shorten it',
              loading: false,
              autoUpdate: true
            }
          ]
        },

        formOptions: {
          validateAfterLoad: true,
          validateAfterChanged: true
        },

        formState: {}
      }
    }
  },
  methods: {
    copyUrl () {
      document.getElementById('sdp-app-shorten-url').select()
      document.execCommand('copy')
    },
    async submitForm () {
      const url = this.formData.model.url
      const serviceUrl = '/external-api-url-shorten'
      const requestUrl = `${serviceUrl}?c=generate&source_url=${url}`
      try {
        const res = await this.$axios.$get(requestUrl)
        if (res.ok === true) {
          this.shortUrl = server + res.short_code
          this.formData.formState.response = null
        } else {
          this.formData.formState = {
            response: {
              status: 'danger',
              message: res.msg
            }
          }
        }
      } catch (error) {
        this.formData.formState = {
          response: {
            status: 'danger',
            message: 'We are experiencing a server error. Please try again, otherwise contact us.'
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

$app-content-rating-label-ruleset: ('xs', 1em, 'bold') !default;
$app-content-text-color: rpl-color('dark_neutral') !default;

.sdp-app-url-shorten {
  .rpl-form {
    color: $app-content-text-color;
    padding-left: 0;
    padding-right: 0;
  }

  &__result-content {
    display: flex;
    margin-bottom: $rpl-space-2;

    label {
      padding-right: $rpl-space-2;
    }

    input {
      border: 0;
      flex-grow: 1;
    }
  }
}
</style>
