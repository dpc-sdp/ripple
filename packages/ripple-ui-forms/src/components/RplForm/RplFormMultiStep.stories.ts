import type { Meta, StoryObj } from '@storybook/vue3'
import RplForm from './RplForm.vue'
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
        id: 'details',
        key: 'details',
        name: 'details',
        title: 'Details',
        nextButton: 'Next',
        schema: [
          {
            $formkit: 'RplFormText',
            id: 'first_name',
            name: 'first_name',
            label: 'First name',
            validation: [['required']]
          },
          {
            $formkit: 'RplFormText',
            id: 'last_name',
            name: 'last_name',
            label: 'Last name'
          },
          {
            $formkit: 'RplFormRadioGroup',
            id: 'location',
            name: 'location',
            label: 'Location',
            options: [
              {
                id: 'australia',
                value: 'australia',
                label: 'Australia'
              },
              {
                id: 'overseas',
                value: 'overseas',
                label: 'Overseas'
              }
            ]
          }
        ]
      },
      {
        $step: true,
        id: 'address',
        key: 'address',
        name: 'address',
        title: 'Australian address',
        nextButton: 'Next',
        prevButton: 'Back',
        conditionals: {
          type: 'any',
          conditions: [
            {
              type: 'isEqual',
              field: 'location',
              value: 'australia'
            }
          ]
        },
        schema: [
          {
            $formkit: 'RplFormText',
            id: 'street',
            name: 'street',
            label: 'Street'
          },
          {
            $formkit: 'RplFormText',
            id: 'postcode',
            name: 'postcode',
            validation: [['required']],
            label: 'Post code'
          }
        ]
      },
      {
        $step: true,
        id: 'overseas',
        key: 'overseas',
        name: 'overseas',
        title: 'Overseas location',
        conditionals: {
          type: 'any',
          conditions: [
            {
              type: 'isEqual',
              field: 'location',
              value: 'overseas'
            }
          ]
        },
        nextButton: 'Next',
        prevButton: 'Back',
        schema: [
          {
            $formkit: 'RplFormText',
            id: 'country',
            name: 'country',
            label: 'Country'
          },
          {
            $formkit: 'RplFormText',
            id: 'areacode',
            name: 'areacode',
            label: 'Area code'
          }
        ]
      },
      {
        $step: true,
        id: 'extra',
        key: 'extra',
        name: 'extra',
        title: 'Extra step',
        conditionals: {
          type: 'all',
          conditions: [
            {
              type: 'isEqual',
              field: 'location',
              value: 'australia'
            },
            {
              type: 'isEqual',
              field: 'postcode',
              value: '3000'
            }
          ]
        },
        nextButton: 'Next',
        prevButton: 'Back',
        schema: [
          {
            $formkit: 'RplFormContent',
            id: 'extra-content',
            html: 'This is an extra step for Australians in 3000'
          }
        ]
      },
      {
        $step: true,
        id: 'bonus',
        key: 'bonus',
        name: 'bonus',
        title: 'Bonus step',
        visible: (values: any) => values.first_name === 'Dan',
        nextButton: 'Next',
        prevButton: 'Back',
        schema: [
          {
            $formkit: 'RplFormText',
            id: 'mood',
            name: 'mood',
            label: 'How are you today Dan?'
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
        prevButton: 'Back',
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
