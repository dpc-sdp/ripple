import RplChip from './RplChip.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

export default {
  title: 'Core/Navigation/Chip',
  component: RplChip,
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['default', 'reverse']
    }
  },
  args: {
    label: 'Chip',
    variant: 'default',
    url: 'https://vic.gov.au'
  }
} satisfies Meta<typeof RplChip>

type Story = StoryObj<typeof RplChip>

const SingleTemplate = (args: any) => ({
  components: { RplChip },
  setup() {
    return { args }
  },
  template: '<div class="sb-container"><RplChip v-bind="args" /></div>'
})

const ManyTemplate = (args: any) => ({
  components: { RplChip },
  setup() {
    return { args }
  },
  template:
    '<div class="sb-container"><RplChip v-bind="args" /><RplChip v-bind="args" /></div>'
})

export const Default: Story = {
  render: SingleTemplate
}

export const TwoChips: Story = {
  render: ManyTemplate,
  name: 'Example/Two chips'
}

export const Reversed: Story = {
  render: SingleTemplate,
  parameters: { background: 'reverse' },
  args: { variant: 'reverse' }
}
