import type { Meta, StoryObj } from '@storybook/vue3'
import RplLinkList from './RplLinkList.vue'
import RplLinkListItem from './RplLinkListItem.vue'

const Template = (args: any) => ({
  components: { RplLinkList, RplLinkListItem },
  setup() {
    return { args }
  },
  template: `
      <RplLinkList v-bind="args">
        <RplLinkListItem v-for="link in args.items" :url="link.url">{{ link.text }}</RplLinkListItem>
      </RplLinkList>`
})

type ExtendedLinkListProps = Partial<typeof RplLinkList> & {
  items: { text: string; url: string }[]
}

export default {
  title: 'Core/Navigation/Link list',
  component: RplLinkList,
  render: Template,
  argTypes: {
    numColumns: {
      control: { type: 'select' },
      options: [1, 2, 3]
    }
  }
} satisfies Meta<ExtendedLinkListProps>

type Story = StoryObj<ExtendedLinkListProps>

export const LongLabels: Story = {
  name: 'Long labels',
  args: {
    items: [
      { text: 'Link label 1', url: '#' },
      { text: 'Link label 2', url: '#' },
      { text: 'Link label 3', url: '#' },
      {
        text: 'Link label 4 with very long text that wraps over multiple lines',
        url: '#'
      },
      { text: 'Link label 5', url: '#' },
      { text: 'Link label 6', url: '#' }
    ]
  }
}

export const OneItem: Story = {
  name: '1 item',
  args: {
    items: [{ text: 'Link label 1', url: '#' }]
  }
}

export const TwoItems: Story = {
  name: '2 items',
  args: {
    items: [
      { text: 'Link label 1', url: '#' },
      { text: 'Link label 2', url: '#' }
    ]
  }
}

export const ThreeItems: Story = {
  name: '3 items',
  args: {
    items: [
      { text: 'Link label 1', url: '#' },
      { text: 'Link label 2', url: '#' },
      { text: 'Link label 3', url: '#' }
    ]
  }
}

export const FourItems: Story = {
  name: '4 items',
  args: {
    items: [
      { text: 'Link label 1', url: '#' },
      { text: 'Link label 2', url: '#' },
      { text: 'Link label 3', url: '#' },
      { text: 'Link label 4', url: '#' }
    ]
  }
}

export const FiveItems: Story = {
  name: '5 items',
  args: {
    items: [
      { text: 'Link label 1', url: '#' },
      { text: 'Link label 2', url: '#' },
      { text: 'Link label 3', url: '#' },
      { text: 'Link label 4', url: '#' },
      { text: 'Link label 5', url: '#' }
    ]
  }
}

export const SixItems: Story = {
  name: '6 items',
  args: {
    items: [
      { text: 'Link label 1', url: '#' },
      { text: 'Link label 2', url: '#' },
      { text: 'Link label 3', url: '#' },
      { text: 'Link label 4', url: '#' },
      { text: 'Link label 5', url: '#' },
      { text: 'Link label 6', url: '#' }
    ]
  }
}

export const WithSidebar1Column: Story = {
  name: 'With sidebar (1 column)',
  args: {
    items: [
      { text: 'Link label 1', url: '#' },
      { text: 'Link label 2', url: '#' },
      { text: 'Link label 3', url: '#' },
      { text: 'Link label 4', url: '#' },
      { text: 'Link label 5', url: '#' },
      { text: 'Link label 6', url: '#' }
    ],
    numColumns: 1
  }
}
