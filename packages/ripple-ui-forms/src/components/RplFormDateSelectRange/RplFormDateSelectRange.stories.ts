import type { Meta, StoryObj } from '@storybook/vue3'
import RplForm from '../RplForm/RplForm.vue'
import RplFormDateSelectRange from './RplFormDateSelectRange.vue'
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
      <FormKit v-bind="args" form-class="rpl-form" type="RplFormDateSelectRange" />
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
  title: 'Forms/Date select range',
  component: RplFormDateSelectRange,
  render: FormElementTemplate
} satisfies Meta<typeof RplFormDateSelectRange>

type Story = StoryObj<typeof RplFormDateSelectRange>

export const DefaultStory: Story = {
  name: 'Default',
  args: {
    id: 'date-select-range-default',
    name: 'date-select-range-default',
    label: 'Date select range'
  }
}

export const Prefilled: Story = {
  args: {
    id: 'date-select-range-prefilled',
    name: 'date-select-range-prefilled',
    value: {
      from: new Date().toLocaleDateString(),
      to: new Date(Date.now() + 4 * 86400000).toLocaleDateString()
    },
    dateFormat: 'd/MM/yyyy',
    label: 'Prefilled',
    help: 'Date select range with prefilled values.'
  }
}

export const PrefilledFrom: Story = {
  name: 'Prefilled (from)',
  args: {
    id: 'date-select-range-prefilled-from',
    name: 'date-select-range-prefilled-from',
    value: {
      from: new Date(Date.now() - 4 * 86400000).toLocaleDateString()
    },
    dateFormat: 'd/MM/yyyy',
    label: 'Prefilled',
    help: 'Date select range with prefilled value (from only).'
  }
}

export const PrefilledTo: Story = {
  name: 'Prefilled (to)',
  args: {
    id: 'date-select-range-prefilled-to',
    name: 'date-select-range-prefilled-to',
    value: {
      to: new Date(Date.now() + 4 * 86400000).toLocaleDateString()
    },
    dateFormat: 'd/MM/yyyy',
    label: 'Prefilled',
    help: 'Date select range with prefilled value (to only).'
  }
}

export const Inactive: Story = {
  args: {
    id: 'date-select-range-inactive',
    name: 'date-select-range-inactive',
    disabled: true,
    label: 'Inactive',
    help: 'Date select range is disabled.'
  }
}

export const Invalid: Story = {
  args: {
    id: 'date-select-range-invalid',
    name: 'date-select-range-invalid',
    invalid: true,
    label: 'Invalid'
  }
}
