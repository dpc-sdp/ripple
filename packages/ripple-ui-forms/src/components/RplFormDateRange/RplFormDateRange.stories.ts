import type { Meta, StoryObj } from '@storybook/vue3'
import RplFormDateRange from './RplFormDateRange.vue'
import StorybookInputFixture from './../StorybookInputFixture/StorybookInputFixture.vue'
import '@dpc-sdp/ripple-ui-core/style/components'
import '../RplForm/RplForm.css'

const Template = (args) => ({
  components: { RplFormDateRange, StorybookInputFixture },
  setup() {
    return { args }
  },
  data: () => ({ currentValue: {} }),
  methods: {
    onChange: function (val) {
      this.currentValue = val
    }
  },
  template: `
    <StorybookInputFixture :invalid="args.invalid" :useFieldset="true">
      <RplFormDateRange v-bind="args" :value="currentValue" @onChange="onChange" />
    </StorybookInputFixture>
    <p :style="{marginTop: '60px'}" class="rpl-type-p"><strong>Output value (not part of component)</strong></p>
    <pre>{{ currentValue }}</pre>
  `
})

export default {
  title: 'Forms/Date range',
  component: RplFormDateRange,
  render: Template,
  args: {
    id: 'date-range-field',
    name: 'date-range-field'
  }
} satisfies Meta<typeof RplFormDateRange>

type Story = StoryObj<typeof RplFormDateRange>

export const DefaultStory: Story = {
  name: 'Default',
  args: {
    variant: 'default'
  }
}

export const Reverse: Story = {
  args: {
    variant: 'reverse'
  },
  parameters: {
    background: 'gray'
  }
}

export const Inactive: Story = {
  args: {
    variant: 'default',
    disabled: true
  }
}

export const Invalid: Story = {
  args: {
    variant: 'default',
    invalid: true
  }
}

export const CustomDateFormat: Story = {
  args: {
    variant: 'default',
    dateFormat: 'yyyy/mm/dd'
  }
}

export const BlockDisplay: Story = {
  args: {
    display: 'block'
  }
}
