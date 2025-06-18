import type { Meta, StoryObj } from '@storybook/vue3'
import RplBreadcrumbs from './RplBreadcrumbs.vue'

export default {
  title: 'Core/Navigation/Breadcrumbs',
  component: RplBreadcrumbs
} satisfies Meta<typeof RplBreadcrumbs>

type Story = StoryObj<typeof RplBreadcrumbs>

export const DefaultStory: Story = {
  name: 'Default',
  args: {
    items: [
      { text: 'Home', url: '/' },
      { text: 'About the VIC Government', url: '#' },
      { text: "Using Victoria's data", url: '#' }
    ]
  }
}

export const ExampleLongTitle: Story = {
  name: 'Example/Long title',
  args: {
    items: [
      { text: 'Home is the traditional entry point to any website', url: '/' },
      {
        text: 'An extraordinarily long title that really should not be allowed but will be useful to test mobile width',
        url: '#'
      }
    ]
  }
}

export const ExampleManyLinks: Story = {
  name: 'Example/Many links',
  args: {
    items: [
      { text: 'Home', url: '/' },
      { text: 'About the VIC Government', url: '#' },
      { text: 'The state government', url: '#' },
      { text: 'Victoria is the state', url: '#' },
      { text: 'VIC government data', url: '#' },
      { text: "Using Victoria's data", url: '#' }
    ]
  }
}

export const ExampleCollapseInnerLinks: Story = {
  name: 'Example/Collapse inner links',
  args: {
    items: [
      { text: 'Home', url: '/' },
      { text: 'About the VIC Government', url: '#' },
      { text: 'The state government', url: '#' },
      { text: 'Victoria is the state', url: '#' },
      { text: 'VIC government data', url: '#' },
      { text: "Using Victoria's data", url: '#' }
    ],
    collapse: true
  }
}
