import type { Meta, StoryObj } from '@storybook/vue3'
import RplFormDate from './RplFormDate.vue'
import StorybookInputFixture from './../StorybookInputFixture/StorybookInputFixture.vue'
import '@dpc-sdp/ripple-ui-core/style/components'
import '../RplForm/RplForm.css'

const Template = (args: any) => {
  return {
    components: { RplFormDate, StorybookInputFixture },
    data: () => ({ currentValue: null }),
    methods: {
      onChange(val: any) {
        this.currentValue = val
      }
    },

    setup() {
      return { args }
    },
    template: `
      <StorybookInputFixture :invalid="args.invalid" :useFieldset="true">
        <RplFormDate v-bind="args" :value="currentValue" @onChange="onChange"/>
      </StorybookInputFixture>
      <p :style="{marginTop: '60px'}" class="rpl-type-p">
        <strong>Output value (not part of component): "{{ currentValue }}"</strong>
      </p>
    `
  }
}

const meta = {
  title: 'Forms/Date input',
  component: RplFormDate,
  render: Template
} satisfies Meta<typeof RplFormDate>

export default meta

type Story = StoryObj<typeof RplFormDate>

export const Default: Story = {
  args: {
    id: 'date-default',
    variant: 'default'
  }
}

export const Reverse: Story = {
  args: {
    id: 'date-reverse',
    variant: 'reverse'
  },
  parameters: {
    background: 'gray'
  }
}

export const Inactive: Story = {
  args: {
    id: 'date-inactive',
    variant: 'default',
    disabled: true
  }
}

export const Invalid: Story = {
  args: {
    id: 'date-invalid',
    variant: 'default',
    invalid: true
  }
}

export const CustomDateFormat: Story = {
  args: {
    id: 'date-format',
    variant: 'default',
    dateFormat: 'dd/MM/yyyy'
  }
}
