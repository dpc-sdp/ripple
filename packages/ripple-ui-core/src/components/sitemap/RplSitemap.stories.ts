import type { Meta, StoryObj } from '@storybook/vue3'
import RplSitemap from './RplSitemap.vue'

export default {
  title: 'Core/Navigation/Sitemap',
  component: RplSitemap
} satisfies Meta<typeof RplSitemap>

type Story = StoryObj<typeof RplSitemap>

export const Sitemap: Story = {
  args: {
    items: [
      {
        text: 'Your services',
        url: '#',
        items: [
          { text: 'Sub child A', url: '#' },
          {
            text: 'Sub child B',
            url: '#',
            items: [
              { text: 'Sub child I', url: '#' },
              { text: 'Sub child II', url: '#' },
              { text: 'Sub child III', url: '#' }
            ]
          },
          {
            text: 'Test Path 2',
            url: '#',
            items: [
              { text: 'Sub child IV', url: '#' },
              {
                text: 'Test Path 3',
                url: '#',
                items: [
                  { text: 'Sub child X', url: '#' },
                  {
                    text: 'Sub child Y',
                    url: '#',
                    items: [
                      {
                        text: 'Sub child YY',
                        url: '#',
                        items: [
                          { text: 'Sub child YY', url: '#' },
                          { text: 'Sub child YZ', url: '#' }
                        ]
                      }
                    ]
                  },
                  { text: 'Sub child Z', url: '#' }
                ]
              },
              { text: 'Sub child VI', url: '#' },
              { text: 'Sub child VII', url: '#' },
              { text: 'Sub child VIII', url: '#' },
              { text: 'Sub child IX', url: '#' },
              { text: 'Sub child X', url: '#' },
              { text: 'Sub child XI', url: '#' },
              { text: 'Sub child XII', url: '#' },
              { text: 'Sub child XIII', url: '#' },
              { text: 'Sub child IV', url: '#' },
              { text: 'Sub child V', url: '#' },
              { text: 'Sub child VI', url: '#' },
              { text: 'Sub child VII', url: '#' },
              { text: 'Sub child VIII', url: '#' },
              { text: 'Sub child IX', url: '#' },
              { text: 'Sub child X', url: '#' },
              { text: 'Sub child XI', url: '#' },
              { text: 'Sub child XII', url: '#' },
              { text: 'Sub child XIII', url: '#' },
              { text: 'Sub child IV', url: '#' },
              { text: 'Sub child V', url: '#' },
              { text: 'Sub child VI', url: '#' },
              { text: 'Sub child VII', url: '#' },
              { text: 'Sub child VIII', url: '#' },
              { text: 'Sub child IX', url: '#' },
              { text: 'Sub child X', url: '#' },
              { text: 'Sub child XI', url: '#' },
              { text: 'Sub child XII', url: '#' },
              { text: 'Sub child Last', url: '#' }
            ]
          }
        ]
      },
      { text: 'About VIC Government', url: '#' },
      {
        text: 'News',
        url: '#',
        items: [
          {
            text: 'Sub child 2',
            url: '#',
            items: [
              { text: 'Sub child 3', url: '#' },
              { text: 'Sub child 4', url: '#' },
              { text: 'Sub child 5', url: '#' }
            ]
          }
        ]
      },
      {
        text: 'Events',
        url: '#',
        items: [
          { text: 'Sub child 3', url: '#' },
          { text: 'Sub child 4', url: '#' },
          { text: 'Sub child 5', url: '#' }
        ]
      },
      { text: 'Connect with us', url: '#' }
    ]
  }
}

export const NoSubItems: Story = {
  args: {
    items: [
      {
        text: 'Your services',
        url: '#'
      },
      { text: 'About VIC Government', url: '#' },
      {
        text: 'News',
        url: '#'
      },
      {
        text: 'Events',
        url: '#'
      },
      { text: 'Connect with us', url: '#' }
    ]
  }
}
