import type { Meta, StoryObj } from '@storybook/vue3'
import RplTag from './RplTag.vue'

export default {
  title: 'Core/Containers/Tag',
  component: RplTag,
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['default', 'neutral']
    }
  },
  args: {
    label: 'Tag'
  }
} satisfies Meta<typeof RplTag>

type Story = StoryObj<typeof RplTag>

export const Default: Story = {
  args: {
    variant: 'default'
  }
}

export const Neutral: Story = {
  args: {
    variant: 'neutral'
  }
}
