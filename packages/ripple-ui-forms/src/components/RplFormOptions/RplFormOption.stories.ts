import type { Meta, StoryObj } from '@storybook/vue3'
import RplFormOption from './RplFormOption.vue'
import StorybookInputFixture from './../StorybookInputFixture/StorybookInputFixture.vue'
import '@dpc-sdp/ripple-ui-core/style/components'
import '../RplForm/RplForm.css'

const Template = (args: any) => ({
  components: { RplFormOption, StorybookInputFixture },
  setup() {
    return { args }
  },
  template: `
    <StorybookInputFixture :invalid="args.invalid" :useFieldset="true">
      <RplFormOption v-bind="args" />
    </StorybookInputFixture>`
})

export default {
  title: 'Forms/Checkbox',
  component: RplFormOption,
  render: Template,
  args: {
    onValue: true
  }
} satisfies Meta<typeof RplFormOption>

type Story = StoryObj<typeof RplFormOption>

export const DefaultVariant: Story = {
  args: {
    id: 'checkbox-default',
    label: 'Here is a checkbox'
  }
}

export const ReverseVariant: Story = {
  parameters: {
    background: 'gray'
  },
  args: {
    id: 'checkbox-reverse',
    label: 'Here is a checkbox',
    variant: 'reverse'
  }
}

export const Inactive: Story = {
  args: {
    id: 'checkbox-inactive',
    label: 'Here is a checkbox',
    disabled: true
  }
}

export const LongLabel: Story = {
  args: {
    id: 'checkbox-long-label',
    label:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
  }
}

export const CustomOnOffValues: Story = {
  args: {
    id: 'checkbox-on-off',
    label: `I'm either 'yes' or 'no'. Check the actions tab`,
    onValue: 'yes',
    offValue: 'no'
  }
}
