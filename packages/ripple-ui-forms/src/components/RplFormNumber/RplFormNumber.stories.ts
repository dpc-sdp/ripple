import type { Meta, StoryObj } from '@storybook/vue3'
import RplForm from '../RplForm/RplForm.vue'
import RplFormNumber from '../RplFormNumber/RplFormNumber.vue'
import RplFormElement from './../RplFormElement/RplFormElement.vue'
import '@dpc-sdp/ripple-ui-core/style/components'

const Template = (args: any) => ({
  components: { RplFormElement, RplForm },
  setup() {
    return { args }
  },
  template: `
    <RplForm
      id="storybook-form-number-sample"
      :style="{
        '--local-max-width': '595px'
      }"
    >
      <RplFormElement type="RplFormNumber" v-bind="args" />
      <template #belowForm="{ value }">
        <div class="rpl-storybook-form-values">
          <h2 class="rpl-type-h4">Internal form values</h2>
          <pre wrap>{{ value }}</pre>
        </div>
      </template>
    </RplForm>
  `
})

type ExtendedFormNumberProps = Partial<typeof RplFormNumber> & {
  help?: string
}

export default {
  title: 'Forms/Input',
  component: RplFormElement,
  render: Template,
  args: {
    label: 'Number'
  }
} satisfies Meta<ExtendedFormNumberProps>

type Story = StoryObj<ExtendedFormNumberProps>

export const Number: Story = {}

export const NumberWithButtons: Story = {
  args: {
    value: '1',
    min: 0,
    max: 10,
    step: 1,
    mode: 'alt',
    help: 'Enter a number between 0 and 10'
  }
}
