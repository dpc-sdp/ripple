import type { Meta, StoryObj } from '@storybook/vue3'
import RplRelatedLinks from './RplRelatedLinks.vue'

export default {
  title: 'Core/Navigation/Related links',
  component: RplRelatedLinks,
  decorators: [
    () => ({
      template:
        '<div class="rpl-storybook__page rpl-grid"><div class="rpl-col-12 rpl-col-4-m"><story /></div></div>'
    })
  ]
} satisfies Meta<typeof RplRelatedLinks>

type Story = StoryObj<typeof RplRelatedLinks>

export const RelatedLinks: Story = {
  args: {
    title: 'Related Links',
    items: [
      { text: 'Link title on default that travels over two lines', url: '#' },
      { text: 'Link title on default', url: '#' },
      { text: 'Link title on default', url: '#' },
      { text: 'Link title on default', url: '#' },
      { text: 'Link title on default', url: '#' }
    ]
  }
}
