<template>
  <div class="tide-login" v-if="!isAuthed">
    <div class="tide-login__form">
      <div class="tide-login__wrapper">
        <h2>{{ formTitle }}</h2>
      </div>
      <rpl-form
        :formData="currentForm"
        :submitHandler="submitForm"
        :hideAfterSuccess=true
        >
      </rpl-form>
    </div>
    <div class="tide-login__wrapper">
      <ul class="tide-login__switch-list">
        <li
          class="tide-login__switch-list-item"
          :key="key"
          v-for="(form, key) in otherForms">
          <rpl-button theme="secondary" @click.native="switchForm(key)">{{ form.title }}</rpl-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import RplButton from '@dpc-sdp/ripple-button'
import RplForm from '@dpc-sdp/ripple-form'
import { clientSetToken, isAuthenticated } from '../lib/authenticate'

const FIELDS = {
  password: {
    type: 'input',
    inputType: 'password',
    label: 'Password',
    model: 'pass',
    required: true
  },
  username: {
    type: 'input',
    inputType: 'text',
    label: 'Username',
    model: 'name',
    placeholder: 'Username',
    required: true
  },
  email: {
    type: 'input',
    inputType: 'email',
    label: 'Email',
    model: 'mail',
    validator: 'email',
    placeholder: 'Email',
    required: true
  },
  submit: {
    type: 'submit',
    buttonText: 'Submit'
  }
}

const FORM_ENDPOINTS = {
  login: 'user/login?_format=json',
  register: 'user/register',
  forgot: 'user/request_reset'
}
const formOptions = {
  validateAfterLoad: false,
  validateAfterChanged: true
}

export default {
  name: 'TideLogin',
  components: {
    RplButton,
    RplForm
  },
  props: {
    'redirect': String
  },
  data () {
    return {
      isAuthed: isAuthenticated(this.$store),
      selectedForm: 'login',
      forms: {
        login: {
          title: 'Login',
          endpoint: FORM_ENDPOINTS.login,
          model: {
            name: '',
            pass: ''
          },
          schema: {
            fields: [
              { ...FIELDS.username },
              { ...FIELDS.password },
              { ...FIELDS.submit }
            ]
          },
          formOptions,
          messages: {
            success: 'Login Successful.',
            error: 'Login Failed. Please try again'
          },
          formState: {}
        },
        register: {
          title: 'Register',
          endpoint: FORM_ENDPOINTS.register,
          model: {
            name: '',
            mail: '',
            pass: ''
          },
          schema: {
            fields: [
              { ...FIELDS.username },
              { ...FIELDS.email },
              { ...FIELDS.submit }
            ]
          },
          formOptions,
          messages: {
            success: 'Thank you. Your registration request has been sent. It will be reviewed within 1 business day. You will receive an email when you get access.',
            error: "An error occurred and we're unable to create your account. If you already have an account, please use the reset password feature to update your password."
          },
          formState: {}
        },
        forgot: {
          title: 'Forgot password',
          endpoint: FORM_ENDPOINTS.forgot,
          model: {
            email: ''
          },
          schema: {
            fields: [
              { ...FIELDS.email },
              { ...FIELDS.submit }
            ]
          },
          formOptions,
          messages: {
            success: 'Thank you! Your request has been submitted.',
            error: 'We are experiencing a server error. Please try again, otherwise contact us.'
          },
          formState: {}
        }
      }
    }
  },
  created () {
    // If there's an existing token redirect to protected content
    if (this.isAuthed) {
      if (this.$route.query.destination !== undefined) {
        this.$router.push({ path: this.$route.query.destination })
      } else if (this.$props.redirect !== undefined) {
        this.$router.push({ path: this.$props.redirect })
      } else {
        this.$router.push({ path: '/' })
      }
    }
  },
  computed: {
    currentForm () {
      return this.forms[this.selectedForm]
    },
    otherForms () {
      const { [this.selectedForm]: f, ...forms } = this.forms
      return forms
    },
    formTitle () {
      return this.currentForm.title
    }
  },
  methods: {
    async submitForm () {
      const { model: data, endpoint } = this.currentForm
      try {
        const response = await this.$tide.post(endpoint, data)
        if (response.auth_token) {
          clientSetToken(response.auth_token, this.$store)
          if (this.$route.query.destination !== undefined) {
            this.$router.push({ path: this.$route.query.destination })
          } else if (this.$props.redirect !== undefined) {
            this.$router.push({ path: this.$props.redirect })
          } else {
            this.$router.push({ path: '/' })
          }
        }
        this.forms[this.selectedForm].formState = { response: { status: 'success', message: this.currentForm.messages.success } }
      } catch (e) {
        this.forms[this.selectedForm].formState = { response: { status: 'danger', message: this.currentForm.messages.error } }
      }
    },
    switchForm (formKey) {
      this.selectedForm = formKey
      this.forms[this.selectedForm].formState.response = null
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

.tide-login {
  &__wrapper {
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

  &__switch-list {
    list-style-type: none;
    padding: 0;
  }

  &__switch-list-item {
    margin-bottom: $rpl-space-2;

    @include rpl_breakpoint(m) {
      display: inline-block;
      margin-right: $rpl-space-2;
    }
  }
}
</style>
