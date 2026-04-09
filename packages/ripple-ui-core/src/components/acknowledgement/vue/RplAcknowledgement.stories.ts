import type { Meta, StoryObj } from '@storybook/vue3'
import RplAcknowledgement from './RplAcknowledgement.vue'

export default {
  title: 'Core/Containers/Acknowledgement',
  component: RplAcknowledgement
} satisfies Meta<typeof RplAcknowledgement>

type Story = StoryObj<typeof RplAcknowledgement>

export const Acknowledgement: Story = {}

export const CustomText: Story = {
  args: {
    message:
      'We acknowledge Aboriginal and Torres Strait Islander people as the Traditional Custodians of the land.'
  }
}
