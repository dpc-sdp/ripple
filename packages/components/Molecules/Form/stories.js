import { storiesOf } from '@storybook/vue'
import RplForm from './index.vue'
import RplSelect from './Select.vue'

storiesOf('Molecules/Form/Select', module)
  .add('Single', () => ({
    components: { RplSelect },
    template: `<rpl-select :values="values" :config="config"></rpl-select>`,
    data () {
      return {
        config: {
          multiselect: false,
          placeholder: 'Select',
          showitems: 4,
          fieldId: 'select',
          label: ''
        },
        values: [{ id: 'vic', name: 'Vic' }, { id: 'nsw', name: 'New South Wales' }, { id: 'wa', name: 'Western Australia' }, { id: 'ql', name: 'Queensland' }]
      }
    }
  }))
  .add('Multiselect', () => ({
    components: { RplSelect },
    template: `<rpl-select :values="values" :config="config"></rpl-select>`,
    data () {
      return {
        config: {
          multiselect: true,
          placeholder: 'Select',
          showitems: 4,
          fieldId: 'select',
          label: ''
        },
        values: [{ id: 'vic', name: 'Vic' }, { id: 'nsw', name: 'New South Wales' }, { id: 'wa', name: 'Western Australia' }, { id: 'ql', name: 'Queensland' }]
      }
    }
  }))

storiesOf('Molecules/Form', module)
  .add('Default', () => ({
    components: { RplForm },
    template: `<rpl-form :formData="formData" :submitHandler="submitHandler" :title="title"></rpl-form>`,
    data () {
      return {
        submitHandler () {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              this.formData.formState = {
                response: {
                  status: 'success',
                  message: `<code>${JSON.stringify(this.formData.model)}</code>`
                }
              }
              resolve()
            }, 500)
          })
        },
        title: 'Example Form',
        isNewModel: true,
        options: {
          validateAfterChanged: true,
          validateAfterLoad: false
        },
        formData: {
          model: {
            hidden: '',
            text: null,
            email: '',
            tel: '',
            number: '',
            radio: null,
            textArea: null,
            dateRange: ['', ''],
            date: '',
            address: {
              state: 'vic'
            },
            checkbox: true,
            select: '',
            multiselect: ['topic_c'],
            checklistlistbox: ['topic_a'],
            rangeslider: [10000, 70000]
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
                hint: 'This is a hint text',
                required: true,
                validator (value) {
                  if (value === '') {
                    return ['This field is required']
                  }
                  return []
                },
                placeholder: 'Enter some text...',
                model: 'text'
              },

              {
                type: 'input',
                inputType: 'email',
                label: 'Email',
                hint: 'This is a hint text',
                model: 'email'
              },

              {
                type: 'input',
                inputType: 'tel',
                label: 'Tel',
                model: 'tel'
              },

              {
                type: 'input',
                inputType: 'number',
                label: 'Number',
                placeholder: 'x10',
                min: 0,
                step: 10,
                max: 100,
                model: 'number'
              },

              {
                type: 'radios',
                label: 'Radio',
                model: 'radio',
                hint: 'This is a hint text',
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
                hint: 'This is a hint text',
                rows: 4,
                required: true,
                validator (value) {
                  if (value === '') {
                    return ['This field is required']
                  }
                  return []
                },
                visible (model) {
                  return model && model.was_this_page_helpful !== null
                }
              },

              {
                type: 'rpldatepicker',
                range: true,
                label: 'Date Range',
                model: 'dateRange',
                startPlaceholder: 'Enter start date',
                endPlaceholder: 'Enter end date'
              },

              {
                type: 'rpldatepicker',
                ranged: false,
                label: 'Date',
                model: 'date',
                placeholder: 'Enter a date'
              },

              {
                type: 'rplslider',
                label: 'Set a funding range',
                hint: '$0 - $80,000',
                model: 'rangeslider',
                step: 5000,
                min: 0,
                max: 80000,
                prefix: '$',
                default: true
              },

              {
                type: 'rpldivider'
              },

              {
                type: 'rplmarkup',
                markup: '<h3>Markup field</h3> <article class="embedded-entity embedded-entity--media embedded-entity--media--document"><article class="media media--type-document media--view-mode-embedded"><div class="field field--name-field-media-file field--type-file field--label-hidden field__item"><span class="file file--mime-application-vnd-openxmlformats-officedocument-wordprocessingml-document file--x-office-document"><a href="https://nginx-php-content-vic-develop.lagoon.vicsdp.amazee.io/sites/default/files/2018-10/Detailed%20Guide%20on%20the%20mandatory%20IR%20management%20criteria.docx" aria-label=" Detailed Guide on the mandatory IR management criteria  File type: Word. Size: 75.22 KB." class="x-office-document tide-external-link" target="_blank"><span class="file--title"> Detailed Guide on the mandatory IR management criteria </span><span class="file--type">Word</span><span class="file--size">75.22 KB</span></a></span></div></article></article> <p>A paragraph of <strong>text</strong> with a <a href="https://vic.gov.au">link</a>.</p>'
              },

              {
                type: 'rplcheckbox',
                inlineLabel: 'Check box selected',
                model: 'checkbox',
                default: true
              },

              {
                type: 'rplchecklist',
                label: 'Multi-select list box',
                model: 'checklistlistbox',
                listBox: true,
                hint: 'Implemented using rplchecklist with listBox: true',
                placeholder: 'Select multiple topics',
                values: [{ value: 'topic_a', name: 'Topic A' }, { value: 'topic_b', name: 'Topic B' }, { value: 'topic_c', name: 'Topic C' }, { value: 'topic_d', name: 'Topic D' }]
              },

              {
                type: 'rplselect',
                model: 'select',
                required: true,
                validator: ['required'],
                label: 'Single-select drop down',
                hint: 'Implemented using rplSelect',
                placeholder: 'Select a single topic',
                values: [{ id: 'topic_a', name: 'Topic A' }, { id: 'topic_b', name: 'Topic B' }, { id: 'topic_c', name: 'Topic C' }, { id: 'topic_d', name: 'Topic D' }, { id: 'topic_e', name: 'Topic e' }, { id: 'topic_f', name: 'Topic f' }, { id: 'topic_g', name: 'Topic g' }, { id: 'topic_h', name: 'Topic h' }]
              },
              {
                type: 'rplselect',
                model: 'multiselect',
                required: true,
                validator (value, field) {
                  if (value && value.length >= field.min) {
                    return []
                  }
                  return ['Add a selection']
                },
                min: 1,
                label: 'Multi-select drop down',
                hint: 'Implemented using rplSelect',
                placeholder: 'Select several topics',
                multiselect: true,
                values: [{ id: 'topic_a', name: 'Topic A' }, { id: 'topic_$#%&!@~^&*', name: 'Topic with $#%&!@~^&*' }, { id: 'topic_c', name: 'Topic C' }, { id: 'topic_d', name: 'Topic D' }, { id: 'topic_e', name: 'Topic E' }, { id: 'topic_f', name: 'Topic F' }, { id: 'topic_g', name: 'Topic G' }, { id: 'topic_h', name: 'Topic H' }]
              }
            ],
            groups: [
              {
                legend: 'Event location (grouped fields)',
                styleClasses: ['rpl-fieldset--pad'],
                fields: [
                  {
                    type: 'input',
                    inputType: 'text',
                    label: 'Building name',
                    required: true,
                    validator: ['required'],
                    placeholder: 'Enter some text...',
                    model: 'address.address_line1',
                    styleClasses: ['form-group--col-two']
                  },
                  {
                    type: 'input',
                    inputType: 'text',
                    required: true,
                    validator: ['required'],
                    label: 'Street address',
                    placeholder: 'Enter some text...',
                    model: 'address.address_line2',
                    styleClasses: ['form-group--col-two']
                  },
                  {
                    type: 'input',
                    inputType: 'text',
                    label: 'Suburb',
                    required: true,
                    validator: ['required'],
                    placeholder: 'Enter some text...',
                    model: 'address.locality',
                    styleClasses: ['form-group--col-two']
                  },
                  {
                    type: 'rplselect',
                    label: 'State',
                    model: 'address.state',
                    required: true,
                    validator: ['required'],
                    selectOptions: {
                      trackBy: 'id',
                      label: 'name',
                      closeOnSelect: true,
                      searchable: false,
                      showLabels: false
                    },
                    values: [{ id: 'vic', name: 'Vic' }, { id: 'nsw', name: 'New South Wales' }, { id: 'wa', name: 'Western Australia' }, { id: 'ql', name: 'Queensland' }],
                    styleClasses: ['form-group--col-two']
                  },
                  {
                    type: 'input',
                    inputType: 'text',
                    label: 'Postcode',
                    placeholder: 'Enter some text...',
                    model: 'address.postcode',
                    styleClasses: ['form-group--col-two']
                  }
                ]
              },
              {
                fields: [
                  {
                    type: 'rplsubmitloader',
                    buttonText: 'Submit (with animation)',
                    loading: false,
                    autoUpdate: true,
                    styleClasses: ['form-group--inline']
                  },
                  {
                    type: 'rplclearform',
                    buttonText: 'Clear search filters',
                    styleClasses: ['form-group--inline']
                  }
                ]
              }
            ]
          },
          tag: 'rpl-fieldset',
          formOptions: {
            validateAfterLoad: false,
            validateAfterChanged: true
          },

          formState: {}
        }
      }
    }
  }))
  .add('Submission Alerts', () => ({
    components: { RplForm },
    template: `<rpl-form :formData="formData" :submitHandler="submitHandler" :title="title"></rpl-form>`,
    data () {
      return {
        title: 'Submission Alerts',
        isNewModel: true,
        options: {
          validateAfterChanged: true,
          validateAfterLoad: false
        },
        formData: {
          model: {
            submissionType: 'Success',
            message: 'Thank you! Your response has been submitted.'
          },
          schema: {
            fields: [
              {
                type: 'radios',
                label: 'Alert type',
                model: 'submissionType',
                values: [
                  'Success',
                  'Error',
                  'Other'
                ]
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Message',
                model: 'message'
              },
              {
                type: 'rplsubmitloader',
                buttonText: 'Submit',
                loading: false,
                autoUpdate: true
              }
            ]
          },
          formState: {}
        }
      }
    },
    methods: {
      submitHandler () {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const status = this.formData.model.submissionType.toLowerCase()
            const message = this.formData.model.message
            this.formData.formState = {
              response: { status, message }
            }
            resolve()
          }, 250)
        })
      }
    }
  }))
