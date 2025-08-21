import type { Meta, StoryObj } from '@storybook/vue3'
import RplFormOptionButtons from './RplFormOptionButtons.vue'
import StorybookInputFixture from './../StorybookInputFixture/StorybookInputFixture.vue'
import '@dpc-sdp/ripple-ui-core/style/components'
import '../RplForm/RplForm.css'

const Template = (args: any) => ({
  components: { RplFormOptionButtons, StorybookInputFixture },
  setup() {
    return { args }
  },
  template: `
      <StorybookInputFixture :invalid="args.invalid" :useFieldset="true">
        <RplFormOptionButtons v-bind="args"/>
      </StorybookInputFixture>`
})

export default {
  title: 'Forms/Option buttons',
  component: RplFormOptionButtons,
  render: Template,
  args: {
    id: 'ob-default',
    name: 'ob-default',
    value: ''
  }
} satisfies Meta<typeof RplFormOptionButtons>

type Story = StoryObj<typeof RplFormOptionButtons>

export const Squares: Story = {
  args: {
    id: 'squares',
    options: Array(26)
      .fill(0)
      .map((_, i) => String.fromCharCode(97 + i))
      .map((char) => ({
        id: char,
        label: char.toUpperCase()
      })),
    value: 'd',
    perfectSquares: true
  }
}

export const FluidWidths: Story = {
  render: Template,
  args: {
    id: 'fluid',
    options: [
      { id: 'item-1', label: 'Apple' },
      { id: 'item-2', label: 'Oranges' },
      { id: 'item-3', label: 'Pear' },
      { id: 'item-4', label: 'Strawberries' },
      { id: 'item-5', label: 'Watermelon' }
    ]
  }
}

export const VeryLongLabel: Story = {
  args: {
    id: 'long-label',
    options: [
      { id: 'item-1', label: 'Apple' },
      { id: 'item-2', label: 'Oranges' },
      {
        id: 'item-3',
        label:
          'Here is an option with a very long label, it should still be readable. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      { id: 'item-4', label: 'Strawberries' },
      { id: 'item-5', label: 'Watermelon' }
    ]
  }
}

export const Inactive: Story = {
  args: {
    id: 'inactive',
    disabled: true,
    options: Array(26)
      .fill(0)
      .map((_, i) => String.fromCharCode(97 + i))
      .map((char) => ({
        id: char,
        label: char.toUpperCase()
      })),
    value: 'd',
    perfectSquares: true
  }
}
