import type { Meta, StoryObj } from '@storybook/vue3'
import RplFormAlert from './RplFormAlert.vue'
import '@dpc-sdp/ripple-ui-core/style/components'
import '../RplForm/RplForm.css'

export default {
  title: 'Forms/Form alert',
  component: RplFormAlert
} satisfies Meta<typeof RplFormAlert>

type Story = StoryObj<typeof RplFormAlert>

export const Success: Story = {
  args: {
    title: 'Form submitted',
    status: 'success',
    default: 'Custom message'
  }
}

export const Error: Story = {
  args: {
    title: 'Form not submitted',
    status: 'error',
    fields: [
      {
        fieldId: '123',
        text: 'Field 1'
      },
      {
        fieldId: '456',
        text: 'Field 2'
      }
    ],
    default: 'Custom message'
  }
}
