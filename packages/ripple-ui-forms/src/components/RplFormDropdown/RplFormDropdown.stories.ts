import type { Meta, StoryObj } from '@storybook/vue3'
import RplFormDropdown from './RplFormDropdown.vue'
import { RplButton } from '@dpc-sdp/ripple-ui-core/vue'
import StorybookInputFixture from './../StorybookInputFixture/StorybookInputFixture.vue'
import { RplFormDropdownOptions } from './fixtures/sample'
import '@dpc-sdp/ripple-ui-core/style/components'
import '../RplForm/RplForm.css'

const Template = (args: any) => ({
  components: { RplFormDropdown, RplButton, StorybookInputFixture },
  setup() {
    return { args }
  },
  data: () => ({ currentValue: null }),
  methods: {
    onChange(val: any) {
      this.currentValue = val
    }
  },
  template: `
      <RplButton class="rpl-u-margin-b-6">Button above to test keyboard behaviour (not part of dropdown)</RplButton>
      <StorybookInputFixture :invalid="args.invalid" :labelId="args.labelId" :fieldId="args.id" :label="args.label">
        <RplFormDropdown v-bind="args" :value="currentValue" @onChange="onChange"/>
      </StorybookInputFixture>
      <RplButton class="rpl-u-margin-t-6">Button below to test keyboard behaviour (not part of dropdown)</RplButton>
    `
})

export default {
  title: 'Forms/Dropdown',
  component: RplFormDropdown,
  render: Template,
  args: {
    placeholder: 'Select',
    labelId: 'example-label-id',
    options: [
      { id: 'item-1', value: 'item-1', label: 'Value 1' },
      { id: 'item-2', value: 'item-2', label: 'Value 2' },
      { id: 'item-3', value: 'item-3', label: 'Value 3' }
    ]
  }
} satisfies Meta<typeof RplFormDropdown>

type Story = StoryObj<typeof RplFormDropdown>

export const SingleSelectFewItems: Story = {
  name: 'Single select - few items',
  args: {
    id: 'dropdown-single',
    multiple: false
  }
}

export const SingleSelectManyItems: Story = {
  name: 'Single select - many items',
  args: {
    id: 'dropdown-single',
    multiple: false,
    options: RplFormDropdownOptions
  }
}

export const SingleSelectPreventDeselect: Story = {
  name: 'Single select - prevent deselect',
  args: {
    id: 'dropdown-single',
    multiple: false,
    preventDeselect: true
  }
}

export const MultiSelectFewItems: Story = {
  name: 'Multi select - few items',
  args: {
    id: 'dropdown-multi',
    multiple: true
  }
}

export const MultiSelectManyItems: Story = {
  name: 'Multi select - many items',
  args: {
    id: 'dropdown-multi',
    multiple: true,
    options: RplFormDropdownOptions
  }
}

export const ReverseVariant: Story = {
  name: 'Reverse variant',
  parameters: { background: 'gray' },
  args: {
    id: 'dropdown-reverse',
    variant: 'reverse'
  }
}

export const LongLabels: Story = {
  name: 'Long labels',
  args: {
    id: 'dropdown-long-labels',
    options: [
      { id: 'item-1', value: 'item-1', label: 'Value 1' },
      {
        id: 'item-2',
        value: 'item-2',
        label:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      { id: 'item-3', value: 'item-3', label: 'Value 3' }
    ]
  }
}

export const Inactive: Story = {
  args: {
    id: 'dropdown-inactive',
    disabled: true
  }
}

export const Error: Story = {
  args: {
    id: 'dropdown-error',
    invalid: true
  }
}

export const EmptyDefaultOption: Story = {
  name: 'Empty default option',
  args: {
    id: 'dropdown-empty-option',
    options: [
      { id: 'item-1', value: '', label: 'Value 1' },
      {
        id: 'item-2',
        value: 'item-2',
        label:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      { id: 'item-3', value: 'item-3', label: 'Value 3' }
    ]
  }
}

export const SingleSelectSearch: Story = {
  name: 'Single select - search',
  args: {
    id: 'dropdown-search-single',
    multiple: false,
    searchable: true,
    labelId: 'dropdown-search-single',
    options: [
      { id: 'red', value: 'red', label: 'Red' },
      { id: 'blue', value: 'blue', label: 'Blue' },
      {
        id: 'rebecca-purple',
        value: 'rebecca-purple',
        label: 'Rebecca Purple'
      },
      { id: 'blue-violet', value: 'blue-violet', label: 'Blue Violet' },
      { id: 'black-velvet', value: 'black-velvet', label: 'Black Velvet' },
      { id: 'royal-blue', value: 'royal-blue', label: 'Royal Blue' },
      { id: 'pink', value: 'pink', label: 'Pink' },
      { id: 'rosy-brown', value: 'rosy-brown', label: 'Rosy Brown' },
      { id: 'green-yellow', value: 'green-yellow', label: 'Green Yellow' },
      {
        id: 'green-yellow-and-more',
        value: 'green-yellow-and-more',
        label:
          'Green Yellow Red Blue Red Green Yellow Yellow Red Blue Red Green Yellow'
      }
    ]
  }
}

export const MultiSelectSearch: Story = {
  name: 'Multi select - search',
  args: {
    id: 'dropdown-search-multi',
    multiple: true,
    searchable: true,
    labelId: 'dropdown-search-multi',
    options: [
      { id: 'red', value: 'red', label: 'Red' },
      { id: 'blue', value: 'blue', label: 'Blue' },
      {
        id: 'rebecca-purple',
        value: 'rebecca-purple',
        label: 'Rebecca Purple'
      },
      { id: 'blue-violet', value: 'blue-violet', label: 'Blue Violet' },
      { id: 'black-velvet', value: 'black-velvet', label: 'Black Velvet' },
      { id: 'royal-blue', value: 'royal-blue', label: 'Royal Blue' },
      { id: 'pink', value: 'pink', label: 'Pink' },
      { id: 'rosy-brown', value: 'rosy-brown', label: 'Rosy Brown' },
      { id: 'green-yellow', value: 'green-yellow', label: 'Green Yellow' },
      {
        id: 'green-yellow-and-more',
        value: 'green-yellow-and-more',
        label:
          'Green Yellow Red Blue Red Green Yellow Yellow Red Blue Red Green Yellow'
      }
    ]
  }
}
