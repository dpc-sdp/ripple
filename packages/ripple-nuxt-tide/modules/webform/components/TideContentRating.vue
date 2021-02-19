<template>
  <div class="app-content-rating tide-content-rating">
    <rpl-form
    name="content-rating-form"
    :formData="formData"
    :submitHandler="submitForm"
    :hideAfterSuccess=true
    >
    </rpl-form>
  </div>
</template>

<script>
import RplForm from '@dpc-sdp/ripple-form'
import webform from '@dpc-sdp/ripple-nuxt-tide/modules/webform/mixins'

// We hardcoded this form fields here because it's too complicate to generate dynamically
// based on Drupal webform configuration.
// Need to make sure the field name is match the Tide `tide_webform_content_rating` form
// fields.
export default {
  name: 'TideContentRating',
  components: {
    RplForm
  },
  props: {
    siteSectionName: String
  },
  mixins: [webform],
  data () {
    return {
      messages: {
        success: 'Thank you! Your response has been submitted.',
        error: 'We are experiencing a server error. Please try again, otherwise contact us.'
      },

      formData: {
        tideId: 'tide_webform_content_rating',

        model: {
          url: '',
          site_section_name: '',
          was_this_page_helpful: null,
          comments: '',
          honeypot: ''
        },
        schema: {
          groups: [
            {
              legend: 'Was this page helpful?',
              fields: [
                {
                  type: 'input',
                  inputType: 'hidden',
                  model: 'url'
                },
                {
                  type: 'input',
                  inputType: 'hidden',
                  model: 'site_section_name'
                },
                {
                  type: 'radios',
                  model: 'was_this_page_helpful',
                  values: [
                    'Yes',
                    'No'
                  ]
                }
              ]
            },
            {
              fields: [
                {
                  type: 'input',
                  inputType: 'text',
                  label: 'Tell me your email',
                  model: 'honeypot',
                  styleClasses: 'tide-tell-me-your-email',
                  autocomplete: 'off'
                },
                {
                  type: 'textArea',
                  label: 'Please add your comments:',
                  model: 'comments',
                  placeholder: 'Start typing...',
                  rows: 4,
                  required: false,
                  max: 5000,
                  visible (model) {
                    return model && model.was_this_page_helpful !== null
                  }
                },
                {
                  type: 'submit',
                  buttonText: 'Submit',
                  visible (model) {
                    return model && model.was_this_page_helpful !== null
                  },

                  buttons: [
                    {
                      label: 'Cancel',
                      classes: ['app-button--cancel'],
                      onclick: function (model) {
                        model.reset = true
                        model.was_this_page_helpful = null
                        model.comments = ''
                      }
                    }
                  ]
                }
              ]
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
    async submitForm () {
      // If it's triggered by reset button, we do nothing.
      if (this.formData.model.reset) {
        delete this.formData.model.reset
        return
      }

      // Give the full url because it is multiple sites system
      this.formData.model.url = window.location.href

      // Pass the site section name to the hidden field.
      this.formData.model.site_section_name = this.siteSectionName
      const formData = this.formData.model
      const formId = this.formData.tideId

      if (formData.honeypot) {
        this.formData.formState = {
          response: {
            status: 'success',
            message: this.messages.success
          }
        }
      } else {
        const res = await this.postForm(formId, formData)

        if (res) {
          this.formData.formState = {
            response: {
              status: 'success',
              message: this.messages.success
            }
          }
        } else {
          this.formData.formState = {
            response: {
              status: 'danger',
              message: this.messages.error
            }
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

$app-content-rating-label-ruleset: ('xs', 1.75em, 'bold') !default;
$app-content-rating-radio-label-ruleset: ('xs', 1em, 'regular') !default;
$app-content-text-color: rpl-color('dark_neutral') !default;

.app-content-rating {
  margin: $rpl-space-4 * 2 0 0 0;
  @include rpl_print_hidden;

  legend {
    @include rpl_typography_ruleset($app-content-rating-label-ruleset);
    color: rpl-color('extra_dark_neutral');

    @include rpl-breakpoint(s) {
      float: left;
    }
  }

  .field-input {
    @include rpl_visually_hidden;
  }

  .rpl-form-alert {
    border: 0;
    background: none;
    color: $app-content-text-color;
    padding: 0;
  }

  .rpl-form {
    color: $app-content-text-color;

    label {
      @include rpl_typography_ruleset($app-content-rating-label-ruleset);
    }
  }
  .field-radios {
    @include rpl-breakpoint(s) {
      &.form-group {
        flex-direction: row;
      }
      label,
      .field-wrap,
      .radio-list {
         @include rpl_typography_ruleset($app-content-rating-radio-label-ruleset);
        display: inline-flex;
      }

      .field-wrap {
        padding-left: $rpl-space * 5;
      }
    }
  }

  .field-submit {
    .field-wrap {
      display: flex;
      justify-content: space-between;

      @include rpl-breakpoint(s) {
        justify-content: flex-start;
      }

      input[type="submit"] {
        order: 2;
        max-width: rem(145px);
        border-radius: rem(4px);

        @include rpl-breakpoint(s) {
          max-width: rem(180px);
        }
      }

      button {
        order: 1;
        max-width: rem(145px);
        border-radius: rem(4px);

        @include rpl-breakpoint(s) {
          max-width: rem(180px);
          margin-right: $rpl-space-2;
        }
      }
    }
  }

  .app-button--cancel {
    background-color: $rpl-button-danger-background-color;
  }

  .app-button--cancel:hover {
    background-color: $rpl-button-danger-hover-background-color;
  }

  .tide-tell-me-your-email {
    display: none !important;
  }
}

</style>
