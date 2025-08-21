import type { Meta, StoryObj } from '@storybook/vue3'
import RplForm from '../RplForm/RplForm.vue'
import RplFormDateSelect from './RplFormDateSelect.vue'
import '@dpc-sdp/ripple-ui-core/style/components'

const FormElementTemplate = (args: any) => ({
  components: { RplForm },
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
    <RplForm
      id="storybook-form-${args.id}"
      :data-invalid="args.invalid"
      :style="{
        '--local-max-width': '595px'
      }"
    >
      <FormKit v-bind="args" form-class="rpl-form" type="RplFormDateSelect" />
      <template #belowForm="{ value }">
        <div class="rpl-storybook-form-values">
          <h2 class="rpl-type-h4">Internal form values</h2>
          <pre wrap>{{ value }}</pre>
        </div>
      </template>
    </RplForm>
`
})

export default {
  title: 'Forms/Date select',
  component: RplFormDateSelect,
  render: FormElementTemplate
} satisfies Meta<typeof RplFormDateSelect>

type Story = StoryObj<typeof RplFormDateSelect>

export const DefaultStory: Story = {
  name: 'Default',
  args: {
    id: 'date-select-default',
    name: 'date-select-default',
    label: 'Date select'
  }
}

export const Prefilled: Story = {
  args: {
    id: 'date-select-prefilled',
    name: 'date-select-prefilled',
    value: new Date().toLocaleDateString(),
    dateFormat: 'd/MM/yyyy',
    label: 'Prefilled',
    help: 'Date select control with prefilled value.'
  }
}

export const Inactive: Story = {
  args: {
    id: 'date-select-inactive',
    name: 'date-select-inactive',
    disabled: true,
    label: 'Inactive',
    help: 'Date select control is disabled.'
  }
}

export const Invalid: Story = {
  args: {
    id: 'date-select-invalid',
    name: 'date-select-invalid',
    invalid: true,
    label: 'Invalid'
  }
}
