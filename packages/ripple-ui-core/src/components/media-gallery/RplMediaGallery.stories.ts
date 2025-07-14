import type { Meta, StoryObj } from '@storybook/vue3'
import { svgPlaceholder } from 'ripple-storybook/utils'
import RplMediaGallery from './RplMediaGallery.vue'

export default {
  title: 'Core/Containers/Media gallery',
  component: RplMediaGallery
} satisfies Meta<typeof RplMediaGallery>

type Story = StoryObj<typeof RplMediaGallery>

export const DefaultStory: Story = {
  name: 'Default',
  args: {
    id: 'media-gallery-1',
    items: [
      {
        alt: 'Alt text',
        title: 'Media title',
        caption: 'Optional media caption content section',
        thumbnail: svgPlaceholder({
          width: 1200,
          height: 800,
          bgColor: '#ccc',
          fgColor: '#444'
        }),
        image: svgPlaceholder({
          width: 2400,
          height: 1440,
          bgColor: '#ccc',
          fgColor: '#444'
        })
      },
      {
        alt: 'Alt text',
        title: 'Another media',
        caption:
          'Another optional media caption content section, et another optional media caption content section',
        thumbnail: svgPlaceholder({
          width: 1200,
          height: 800,
          bgColor: '#a0e6fb',
          fgColor: '#283437'
        }),
        image: svgPlaceholder({
          width: 1440,
          height: 2400,
          bgColor: '#a0e6fb',
          fgColor: '#283437'
        })
      },
      {
        alt: 'Alt text',
        title: 'And another title',
        caption: 'Yet another optional media caption content section',
        thumbnail: svgPlaceholder({
          width: 1200,
          height: 800,
          bgColor: '#ecd9ff',
          fgColor: '#2e2537'
        }),
        image: svgPlaceholder({
          width: 2400,
          height: 1440,
          bgColor: '#ecd9ff',
          fgColor: '#2e2537'
        })
      }
    ]
  }
}

export const SingleItem: Story = {
  args: {
    id: 'media-gallery-2',
    items: [
      {
        alt: 'Alt text',
        title: 'Media title',
        caption: 'Optional media caption content section',
        thumbnail: svgPlaceholder({
          width: 1200,
          height: 800,
          bgColor: '#ccc',
          fgColor: '#444'
        }),
        image: svgPlaceholder({
          width: 2400,
          height: 1440,
          bgColor: '#ccc',
          fgColor: '#444'
        })
      }
    ]
  }
}

export const NoBackgroundGallery: Story = {
  name: 'No background / Gallery',
  args: {
    id: 'media-gallery-3',
    background: false,
    items: [
      {
        alt: 'Alt text',
        title: 'Media title',
        caption: 'Optional media caption content section',
        thumbnail: svgPlaceholder({
          width: 1200,
          height: 800,
          bgColor: '#ccc',
          fgColor: '#444'
        }),
        image: svgPlaceholder({
          width: 2400,
          height: 1440,
          bgColor: '#ccc',
          fgColor: '#444'
        })
      },
      {
        alt: 'Alt text',
        title: 'Media title',
        caption: 'Some more text...',
        thumbnail: svgPlaceholder({
          width: 1200,
          height: 800,
          bgColor: '#aaa',
          fgColor: '#666'
        }),
        image: svgPlaceholder({
          width: 2400,
          height: 1440,
          bgColor: '#aaa',
          fgColor: '#666'
        })
      }
    ]
  }
}

export const NoBackgroundSingleItem: Story = {
  name: 'No Background / Single item',
  args: {
    id: 'media-gallery-4',
    background: false,
    items: [
      {
        alt: 'Alt text',
        title: 'Media title',
        caption: 'Optional media caption content section',
        thumbnail: svgPlaceholder({
          width: 1200,
          height: 800,
          bgColor: '#ccc',
          fgColor: '#444'
        }),
        image: svgPlaceholder({
          width: 2400,
          height: 1440,
          bgColor: '#ccc',
          fgColor: '#444'
        })
      }
    ]
  }
}
