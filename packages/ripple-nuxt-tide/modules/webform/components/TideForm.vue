<template>
  <rpl-form
    v-if="formData"
    novalidate
    :name="`form-${formData.tideId}`"
    :formData="formData"
    :submitHandler="submitForm"
    :hideAfterSuccess="formData.settings.shouldHideFormAfterSuccess"
    :spamProtect="formData.settings.spamProtect"
    :title="title"
    :fullWidth="false"
  >
  </rpl-form>
</template>

<script>
import RplForm, { RplFormEventBus } from '@dpc-sdp/ripple-form'
import webform from '@dpc-sdp/ripple-nuxt-tide/modules/webform/mixins'
import conditionalLogic from '@dpc-sdp/ripple-nuxt-tide/modules/webform/conditional-logic'

export default {
  name: 'TideForm',
  components: {
    RplForm
  },
  props: {
    'formData': Object,
    'title': String
  },
  mixins: [webform],
  data () {
    return {
      messages: {
        success: 'Thank you! Your response has been submitted.',
        error: 'We are experiencing a server error. Please try again, otherwise contact us.'
      }
    }
  },
  computed: {
    fields () {
      const _fields = []
      if (this.formData) {
        if (this.formData.schema.groups) {
          this.formData.schema.groups.forEach(group => {
            _fields.push(...group.fields)
          })
        }
        if (this.formData.schema.fields) {
          _fields.push(...this.formData.schema.fields)
        }
      }

      return _fields
    },
    hasState () {
      const fieldLen = this.fields.length
      for (let i = 0; i < fieldLen; i++) {
        if (this.fields[i].states) {
          return true
        }
      }
      return false
    }
  },
  methods: {
    checkFieldStates (modelData, newVal, oldVal, field) {
      // If field exists, it means the field was changed by the user
      if (field) field.isDirty = true

      this.fields.forEach(field => {
        if (field.states) {
          conditionalLogic(field, this.formData)
        }
      })
    },
    async submitForm () {
      const formData = this.formData.model
      const formId = this.formData.tideId
      if (this.isHoneypotSet(`#${this.formData.tideId}-important-email`)) {
        this.formData.formState = {
          response: {
            status: 'success',
            message: this.formData.messages.success || this.messages.success
          }
        }
      } else {
        const resData = await this.postForm(formId, formData)
        if (resData) {
          let status = 'success'
          let message = this.formData.messages.success || this.messages.success
          if (resData.attributes?.notes) {
            [status, message] = this.getParsedStatus(resData.attributes.notes)
          }
          this.formData.formState = { response: { status, message } }
          if (status === 'success') {
            // TODO: vicpol support, need to be reviewed when we add this feature into SDP.
            this.vicPolRedirect()
          }
        } else {
          this.formData.formState = {
            response: {
              status: 'danger',
              message: this.formData.messages.error || this.messages.error
            }
          }
        }
      }
    },
    // TODO: vicpol support, need to be reviewed when we add this feature into SDP.
    vicPolRedirect: function () {
      const getBrowserInfo = function () {
        let isopera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0
        let ischrome = !!window.chrome && !isopera
        // let isexplorer = typeof document !== 'undefined' && !!document.documentMode && !isEdge
        let isfirefox = typeof window.InstallTrigger !== 'undefined'
        let issafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
        let isiOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
        return {
          isopera: isopera,
          ischrome: ischrome,
          isfirefox: isfirefox,
          issafari: issafari,
          isiOS: isiOS
        }
      }
      const openNewTab = function (redirectUrl) {
        let tab = window.open(redirectUrl, '_blank')
        tab.focus()
      }
      if (this.formData.category === 'form-redirect') {
        let redirectUrl = this.formData.redirect_url
        let browser = getBrowserInfo()
        if (browser.isiOS || browser.issafari) {
          if (confirm('A page will open in new tab, please allow this page to open a new tab on your browser settings!')) {
            openNewTab(redirectUrl)
          }
        } else {
          openNewTab(redirectUrl)
        }
      }
    },
    getParsedStatus (notes) {
      const [code, note] = notes.split('|')
      if (code && Number.isInteger(+code) && (+code <= 199 || +code >= 300)) {
        return ['danger', note || this.formData.messages.error || this.messages.error]
      }
      return ['success', note || this.formData.messages.success || this.messages.success]
    }
  },
  mounted () {
    if (this.hasState) {
      this.checkFieldStates()
      this.fields.forEach(field => {
        field.onChanged = this.checkFieldStates
      })
    }

    RplFormEventBus.$on('clearform', this.checkFieldStates)
  },
  destroyed () {
    RplFormEventBus.$off('clearform', this.checkFieldStates)
  }
}
</script>
