import type { Meta, StoryObj } from '@storybook/vue3'
import RplFormRadioGroup from './RplFormRadioGroup.vue'
import StorybookInputFixture from './../StorybookInputFixture/StorybookInputFixture.vue'
import '@dpc-sdp/ripple-ui-core/style/components'
import '../RplForm/RplForm.css'

const Template = (args: any) => ({
  components: { RplFormRadioGroup, StorybookInputFixture },
  setup() {
    return { args }
  },
  template: `
    <StorybookInputFixture :invalid="args.invalid" :useFieldset="true">
      <RplFormRadioGroup v-bind="args" />
    </StorybookInputFixture>`
})

export default {
  title: 'Forms/Radio group',
  component: RplFormRadioGroup,
  render: Template,
  args: {
    id: 'radio-default',
    name: 'radio-default',
    options: [
      {
        id: 'item-1',
        value: 'item-1',
        label: 'Here is a radio'
      },
      {
        id: 'item-2',
        value: 'item-2',
        label:
          'Here is a radio with a very long label, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        id: 'item-3',
        value: 'item-3',
        label: 'Here is another radio'
      }
    ]
  }
} satisfies Meta<typeof RplFormRadioGroup>

type Story = StoryObj<typeof RplFormRadioGroup>

export const DefaultVariant: Story = {
  args: {
    id: 'radio-default'
  }
}

export const ReverseVariant: Story = {
  args: {
    id: 'radio-reverse',
    variant: 'reverse'
  },
  parameters: {
    background: 'gray'
  }
}

export const Inactive: Story = {
  args: {
    id: 'radio-inactive',
    label: 'Here is a radio',
    disabled: true
  }
}

export const InactiveSingleItem: Story = {
  name: 'Inactive - single item',
  args: {
    id: 'radio-long-label',
    options: [
      {
        id: 'item-1',
        value: 'item-1',
        label: 'Here is a radio',
        disabled: true
      },
      {
        id: 'item-2',
        value: 'item-2',
        label:
          'Here is a radio with a very long label, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    ],
    value: 'item-2'
  }
}

export const HorizontalLayout: Story = {
  args: {
    id: 'radio-long-label',
    layout: 'inline',
    options: [
      {
        id: 'item-1',
        value: 'item-1',
        label: 'Here is a radio'
      },
      {
        id: 'item-2',
        value: 'item-2',
        label: 'And another'
      }
    ]
  }
}
