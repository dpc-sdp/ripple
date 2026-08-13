import type { Meta, StoryObj } from '@storybook/vue3'
import RplForm from './RplForm.vue'
import RplFormElement from './../RplFormElement/RplFormElement.vue'
import '@dpc-sdp/ripple-ui-core/style/components'
import { schema } from './fixtures/full'

export default {
  title: 'Forms/Form',
  component: RplForm
} satisfies Meta<typeof RplForm>

type Story = StoryObj<typeof RplForm>

const Template = (args) => ({
  components: { RplForm },
  setup() {
    return { args }
  },
  data: () => ({ currentValue: args.value || {} }),
  template: `
      <RplForm
        v-bind="args"
        :style="{
        '--local-max-width': '595px'
      }"
      >
        <template #belowForm="{ value }">
          <div class="rpl-storybook-form-values rpl-u-margin-t-6">
            <h2 class="rpl-type-h4">Internal form values</h2>
            <pre wrap>{{ value }}</pre>
          </div>
        </template>
      </RplForm>
    `
})

export const DefaultStory: Story = {
  name: 'Default',
  render: Template,
  args: {
    id: 'test123form',
    schema
  }
}

export const CustomErrorText: Story = {
  name: 'Custom error text',
  render: Template,
  args: {
    id: 'test123form',
    errorSummaryTitle: 'Custom error summary title',
    errorSummaryIntro: 'Custom error summary intro, check the field below.',
    schema
  }
}

export const WithSlots: Story = {
  render: (args) => ({
    components: { RplForm, RplFormElement },
    setup() {
      return { args }
    },
    template: `
      <RplForm id="form">
        <RplFormElement
          type="RplFormText"
          label="test"
          :style="{
        '--local-max-width': '595px'
      }"
        />
        <template #belowForm="{ value }">
          <div v-if="Object.values(value).filter(Boolean).length" class="rpl-storybook-form-values rpl-u-margin-t-6">
            <h2 class="rpl-type-h4">Internal form values</h2>
            <pre wrap>{{ value }}</pre>
          </div>
        </template>
      </RplForm>
    `
  })
}
