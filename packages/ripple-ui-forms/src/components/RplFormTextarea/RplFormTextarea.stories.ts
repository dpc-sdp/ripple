import type { Meta, StoryObj } from '@storybook/vue3'
import RplFormTextarea from './RplFormTextarea.vue'
import StorybookInputFixture from './../StorybookInputFixture/StorybookInputFixture.vue'
import '@dpc-sdp/ripple-ui-core/style/components'
import '../RplForm/RplForm.css'

const Template = (args: any) => ({
  components: { RplFormTextarea, StorybookInputFixture },
  setup() {
    return { args }
  },
  template: `
      <StorybookInputFixture :invalid="args.invalid">
        <RplFormTextarea v-bind="args"/>
      </StorybookInputFixture>`
})

type ExtendedFormTextareaProps = Partial<typeof RplFormTextarea> & {
  placeholder?: string
}

export default {
  title: 'Forms/Textarea',
  component: RplFormTextarea,
  render: Template
} satisfies Meta<ExtendedFormTextareaProps>

type Story = StoryObj<ExtendedFormTextareaProps>

export const Default: Story = {}

export const Reverse: Story = {
  parameters: {
    background: 'gray'
  },
  args: {
    placeholder: 'Example placeholder',
    variant: 'reverse'
  }
}

export const Error: Story = {
  args: {
    invalid: true,
    value: 'Example content'
  }
}

export const Inactive: Story = {
  args: {
    disabled: true,
    value: 'Example content'
  }
}
