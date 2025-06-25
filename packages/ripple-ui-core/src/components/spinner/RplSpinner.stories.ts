import RplSpinner from './RplSpinner.vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { RplIconSizes } from '../icon/constants'

export default {
  title: 'Base styles/Icons/Spinner',
  component: RplSpinner,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: RplIconSizes
    }
  }
} satisfies Meta<typeof RplSpinner>

type Story = StoryObj<typeof RplSpinner>

export const Spinner: Story = {
  args: {
    size: 'm'
  }
}
