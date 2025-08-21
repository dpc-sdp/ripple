import type { Meta, StoryObj } from '@storybook/vue3'
import RplFormCheckboxGroup from './RplFormCheckboxGroup.vue'
import StorybookInputFixture from './../StorybookInputFixture/StorybookInputFixture.vue'
import '@dpc-sdp/ripple-ui-core/style/components'
import '../RplForm/RplForm.css'

const Template = (args: any) => ({
  components: { RplFormCheckboxGroup, StorybookInputFixture },
  setup() {
    return { args }
  },
  template: `
    <StorybookInputFixture :invalid="args.invalid" :useFieldset="true">
      <RplFormCheckboxGroup v-bind="args"/>
    </StorybookInputFixture>`
})

type ExtendedFormCheckboxGroupProps = Partial<typeof RplFormCheckboxGroup> & {
  invalid: boolean
}

export default {
  title: 'Forms/Checkbox group',
  component: RplFormCheckboxGroup,
  render: Template,
  args: {
    id: 'checkbox-default',
    options: [
      {
        id: 'checkbox-default-item-1',
        value: 'item-1',
        label: 'Here is a checkbox'
      },
      {
        id: 'checkbox-default-item-2',
        value: 'item-2',
        label:
          'Here is a checkbox with a very long label, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        id: 'checkbox-default-item-3',
        value: 'item-3',
        label: 'Here is another checkbox'
      }
    ],
    value: ['item-1', 'item-2']
  }
} satisfies Meta<ExtendedFormCheckboxGroupProps>

type Story = StoryObj<ExtendedFormCheckboxGroupProps>

export const DefaultVariant: Story = {
  args: { id: 'checkbox-default' }
}

export const ReverseVariant: Story = {
  args: { id: 'checkbox-reverse', variant: 'reverse' },
  parameters: { background: 'gray' }
}

export const Inactive: Story = {
  args: {
    id: 'checkbox-inactive',
    label: 'Here is a checkbox',
    disabled: true
  }
}

export const InactiveSingleItem: Story = {
  name: 'Inactive - single item',
  args: {
    id: 'checkbox-long-label',
    options: [
      {
        id: 'item-1',
        value: 'item-1',
        label: 'Here is a checkbox',
        disabled: true
      },
      {
        id: 'item-2',
        value: 'item-2',
        label:
          'Here is a checkbox with a very long label, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    ],
    value: ['item-1']
  }
}

export const Invalid: Story = {
  args: {
    id: 'checkbox-invalid',
    label: 'Here is a checkbox',
    invalid: true
  }
}

export const HorizontalLayout: Story = {
  args: {
    id: 'checkbox-inline',
    layout: 'inline',
    options: [
      {
        id: 'checkbox-inline-item-1',
        value: 'item-1',
        label: 'An inline checkbox'
      },
      {
        id: 'checkbox-inline-item-2',
        value: 'item-2',
        label: 'Another inline checkbox'
      }
    ]
  }
}
