import type { Meta, StoryObj } from '@storybook/vue3'
import { action } from 'storybook/actions'
import RplSearchBar from './RplSearchBar.vue'
import { mockSuggestions } from './fixtures'

const Template = (args: any) => ({
  components: { RplSearchBar },
  setup() {
    return {
      args
    }
  },
  data: () => ({ inputValue: null }),
  computed: {
    suggestions() {
      if (this.args.variant === 'menu' || this.inputValue?.length < 3) {
        return []
      }
      return mockSuggestions.filter((val: string) =>
        val.startsWith(this.inputValue)
      )
    }
  },
  methods: {
    submitAction: action('submit'),
    onUpdate: function (val) {
      this.inputValue = val
      action('onUpdate')(val)
    }
  },
  template: `
      <RplSearchBar
          v-bind="args"
          @submit="submitAction"
          @update:input-value="onUpdate"
          :input-value="inputValue"
          :suggestions="suggestions"
      />`
})

export default {
  title: 'Core/Navigation/Search bar',
  component: RplSearchBar,
  render: Template,
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['default', 'reverse', 'menu']
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['right', 'left', 'none']
    }
  },
  args: {
    variant: 'default',
    placeholder: 'Placeholder text'
  }
} satisfies Meta<typeof RplSearchBar>

type Story = StoryObj<typeof RplSearchBar>

export const DefaultStory: Story = {
  name: 'Default',
  args: { id: 'default' }
}

export const Reverse: Story = {
  args: {
    id: 'reverse',
    variant: 'reverse'
  },
  parameters: { background: 'gray' }
}

export const Menu: Story = {
  args: {
    id: 'menu',
    variant: 'menu'
  },
  parameters: { background: 'reverse' }
}

export const Input: Story = {
  args: {
    id: 'menu',
    iconPosition: 'left',
    showSubmitButton: false,
    submitOnSuggestionOnly: true
  }
}
