import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import RplForm from './index.vue'
import readme from './README.md'

// TODO: uncompleted, will do in theme task.
storiesOf('Molecules/Form', module)
  .addDecorator(VueInfoAddon)
  .add('Form', withReadme(readme, () => ({
    components: { RplForm },
    template: `<rpl-form :formData="formData"></rpl-form>`,
    data () {
      return {
        formData: {

          model: {
            hidden: '',
            text: '',
            email: '',
            tel: '',
            radio: null,
            textArea: ''
          },

          schema: {
            fields: [
              {
                type: 'input',
                inputType: 'hidden',
                model: 'hidden'
              },

              {
                type: 'input',
                inputType: 'text',
                label: 'Text',
                required: true,
                placeholder: 'Enter some text...',
                model: 'text'
              },

              {
                type: 'input',
                inputType: 'email',
                label: 'Email',
                model: 'email'
              },

              {
                type: 'input',
                inputType: 'tel',
                label: 'Tel',
                model: 'tel'
              },

              {
                type: 'vueMultiSelect',
                model: 'select',
                label: 'Select',
                values: [
                  'option A',
                  'option B'
                ]
              },

              {
                type: 'radios',
                label: 'Radio',
                model: 'radio',
                values: [
                  'Yes',
                  'No'
                ]
              },

              {
                type: 'textArea',
                label: 'text area',
                model: 'textArea',
                placeholder: 'Start typing...',
                rows: 4,
                required: true,

                visible (model) {
                  return model && model.was_this_page_helpful !== null
                }
              },

              {
                type: 'submit',
                buttonText: 'Submit'
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
    }
  })))
