import type { Meta, StoryObj } from '@storybook/vue3'
import RplForm from './RplForm.vue'
import { handleEligibilityStepChange } from './fixtures/before-step-change'
import '@dpc-sdp/ripple-ui-core/style/components'

export default {
  title: 'Forms/Multi step form',
  component: RplForm
} satisfies Meta<typeof RplForm>

type Story = StoryObj<typeof RplForm>

export const DefaultStory: Story = {
  name: 'Default',
  render: (args) => ({
    components: { RplForm },
    setup() {
      return { args }
    },
    template: `
      <RplForm
        v-bind="args"
        :style="{
        '--local-max-width': '695px'
      }"
      >
        <template #belowForm="{ value }">
          <div class="rpl-storybook-form-values rpl-u-margin-t-6">
            <h2 class="rpl-type-h4">Internal form values</h2>
            <pre wrap>{{ value }}</pre>
          </div>
        </template>
      </RplForm>
    `
  }),
  args: {
    id: 'multi-step-form',
    schema: [
      {
        $step: true,
        id: 'eligibility',
        key: 'eligibility',
        name: 'eligibility',
        title: 'Eligibility',
        nextButton: 'Next',
        beforeStepChange: handleEligibilityStepChange,
        schema: [
          {
            $formkit: 'RplFormFieldset',
            legend: 'Address',
            name: 'address',
            children: [
              {
                $formkit: 'RplFormText',
                id: 'forms_address_organization',
                name: 'organization',
                label: 'Organization',
                validation: [['required']],
                validationMessages: {
                  required: 'The message field is required',
                  matches: 'Please enter between 10 and 50 characters'
                },
                value: ''
              },
              {
                $formkit: 'RplFormText',
                id: 'forms_address_given_name',
                name: 'given_name',
                label: 'Given name',
                validation: [],
                value: ''
              },
              {
                $formkit: 'RplFormText',
                id: 'forms_address_family_name',
                name: 'family_name',
                label: 'Family name',
                validation: [],
                value: ''
              },
              {
                $formkit: 'RplFormText',
                id: 'forms_address_address_line1',
                name: 'address_line1',
                label: 'Street address',
                validation: [],
                value: ''
              },
              {
                $formkit: 'RplFormText',
                id: 'forms_address_address_line2',
                name: 'address_line2',
                label: 'Street address line 2',
                validation: [],
                value: ''
              },
              {
                $formkit: 'RplFormText',
                id: 'forms_address_locality',
                name: 'locality',
                label: 'Suburb',
                columnClasses: 'rpl-col-12 rpl-col-5-m',
                validation: [],
                value: ''
              },
              {
                $formkit: 'RplFormDropdown',
                id: 'forms_address_administrative_area',
                name: 'administrative_area',
                label: 'State',
                columnClasses: 'rpl-col-12 rpl-col-5-m',
                options: [
                  {
                    id: 'VIC',
                    value: 'VIC',
                    label: 'Victoria'
                  },
                  {
                    id: 'NSW',
                    value: 'NSW',
                    label: 'New South Wales'
                  },
                  {
                    id: 'WA',
                    value: 'WA',
                    label: 'Western Australia'
                  },
                  {
                    id: 'QLD',
                    value: 'QLD',
                    label: 'Queensland'
                  },
                  {
                    id: 'ACT',
                    value: 'ACT',
                    label: 'Australian Capital Territory'
                  },
                  {
                    id: 'NT',
                    value: 'NT',
                    label: 'Northern Territory'
                  },
                  {
                    id: 'SA',
                    value: 'SA',
                    label: 'South Australia'
                  },
                  {
                    id: 'TAS',
                    value: 'TAS',
                    label: 'Tasmania'
                  }
                ],
                validation: [],
                value: '',
                pii: false
              },
              {
                $formkit: 'RplFormText',
                id: 'forms_address_postal_code',
                name: 'postal_code',
                label: 'Postcode',
                columnClasses: 'rpl-col-6 rpl-col-3-m',
                validation: [],
                value: ''
              },
              {
                $formkit: 'hidden',
                id: 'forms_address_country_code',
                name: 'country_code',
                value: 'AU'
              }
            ]
          }
        ]
      },
      {
        $step: true,
        id: 'not-eligible',
        key: 'not-eligible',
        name: 'not-eligible',
        title: 'Not eligible',
        nextButton: false,
        prevButton: 'Go backwards',
        beforeStepChange: handleEligibilityStepChange,
        parentStep: 'eligibility',
        schema: [
          {
            $el: 'div',
            attrs: {
              class: 'rpl-content'
            },
            children: [
              {
                $el: 'p',
                children:
                  'Unfortunately, based on the information you have provided, you are not eligible to apply for this grant.'
              }
            ]
          }
        ]
      },
      {
        $step: true,
        id: 'eligible',
        key: 'eligible',
        name: 'eligible',
        title: 'You are eligible',
        nextButton: 'Go forwards',
        prevButton: 'Go backwards',
        beforeStepChange: handleEligibilityStepChange,
        parentStep: 'eligibility',
        schema: [
          {
            $el: 'div',
            attrs: {
              class: ['rpl-content', 'rpl-u-padding-b-4']
            },
            children: [
              {
                $el: 'p',
                children:
                  'Congratulations! Based on the information you have provided, you are eligible to apply for this grant.'
              }
            ]
          }
        ]
      },
      {
        $step: true,
        id: 'review',
        key: 'review',
        name: 'review',
        title: 'Review',
        nextButton: 'Submit',
        prevButton: 'Go backwards',
        beforeStepChange: handleEligibilityStepChange,
        schema: [
          {
            $formkit: 'RplFormReview',
            key: 'review_component'
          },
          {
            $formkit: 'RplFormCheckbox',
            id: 'terms',
            name: 'terms',
            label: 'Terms',
            checkboxLabel: 'I accept the terms',
            validation: [['required']]
          },
          {
            $formkit: 'RplFormActions',
            name: 'submit',
            variant: 'filled',
            label: 'Submit',
            id: 'actions',
            displayResetButton: true
          }
        ]
      }
    ]
  }
}
