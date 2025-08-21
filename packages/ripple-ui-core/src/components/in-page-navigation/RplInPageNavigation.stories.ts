import type { Meta, StoryObj } from '@storybook/vue3'
import RplInPageNavigation from './RplInPageNavigation.vue'

export default {
  title: 'Core/Navigation/In-page navigation',
  component: RplInPageNavigation
} satisfies Meta<typeof RplInPageNavigation>

type Story = StoryObj<typeof RplInPageNavigation>

export const InPageNavigation: Story = {
  name: 'In-page navigation',
  args: {
    title: 'On this page',
    items: [
      {
        text: 'This is the first anchor link',
        url: '#',
        items: [
          { text: 'This is sub heading following first anchor link', url: '#' }
        ]
      },
      { text: 'Second link to extra content', url: '#' },
      { text: 'Third link goes here', url: '#' },
      { text: 'Link to additional content', url: '#' },
      {
        text: 'Another link to extra content',
        url: '#',
        items: [
          { text: 'This is another sub heading', url: '#' },
          {
            text: 'And another sub heading',
            url: '#',
            items: [
              {
                text: 'Theoretical 3rd level with an extra long title',
                url: '#',
                items: [{ text: 'Theoretical 4th level', url: '#' }]
              }
            ]
          }
        ]
      },
      { text: 'This is another link', url: '#' }
    ]
  }
}

export const ManyLevels: Story = {
  args: {
    items: [
      {
        text: 'Link to content',
        url: '#',
        items: [
          {
            text: 'Theoretical 2rd level',
            url: '#',
            items: [
              {
                text: 'Theoretical 3rd level',
                url: '#',
                items: [
                  {
                    text: 'Theoretical 4th level',
                    url: '#',
                    items: [
                      {
                        text: 'Theoretical 5th level',
                        url: '#',
                        items: [{ text: 'Theoretical 6th level', url: '#' }]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
