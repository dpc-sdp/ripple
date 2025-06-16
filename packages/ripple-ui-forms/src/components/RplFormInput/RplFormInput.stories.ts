import type { Meta, StoryObj } from '@storybook/vue3'
import RplFormInput from './RplFormInput.vue'
import StorybookInputFixture from './../StorybookInputFixture/StorybookInputFixture.vue'
import '@dpc-sdp/ripple-ui-core/style/components'
import '../RplForm/RplForm.css'

const Template = (args: any) => ({
  components: { RplFormInput, StorybookInputFixture },
  setup() {
    return { args }
  },
  template: `
    <StorybookInputFixture :invalid="args.invalid">
      <RplFormInput v-bind="args" />
    </StorybookInputFixture>`
})

type ExtendedFormInputProps = Partial<typeof RplFormInput> & {
  placeholder?: string
}

export default {
  title: 'Forms/Input',
  component: RplFormInput,
  render: Template
} satisfies Meta<ExtendedFormInputProps>

type Story = StoryObj<ExtendedFormInputProps>

export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter some text'
  }
}

export const Reverse: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter some text',
    variant: 'reverse'
  },
  parameters: {
    background: 'gray'
  }
}

export const WithIcons: Story = {
  args: {
    prefixIcon: 'icon-arrow-left',
    suffixIcon: 'icon-arrow-right'
  }
}

export const Inactive: Story = {
  args: {
    disabled: true,
    prefixIcon: 'icon-arrow-left',
    suffixIcon: 'icon-arrow-right',
    value: 'Some value'
  }
}
