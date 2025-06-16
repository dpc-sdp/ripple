import type { Meta, StoryObj } from '@storybook/vue3'
import RplSearchBanner from './RplSearchBanner.vue'

export default {
  title: 'Core/Navigation/Search banner',
  component: RplSearchBanner,
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    title: 'Search banner',
    intro: 'A neat little search banner.',
    searchBar: {
      id: 'search-banner'
    }
  }
} satisfies Meta<typeof RplSearchBanner>

type Story = StoryObj<typeof RplSearchBanner>

export const Default: Story = {}

export const Image: Story = {
  args: {
    image: {
      src: '/img/image-landscape-m.jpg'
    }
  }
}
