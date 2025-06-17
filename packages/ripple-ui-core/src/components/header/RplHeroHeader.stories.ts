import type { Meta, StoryObj } from '@storybook/vue3'
import { svgPlaceholder } from 'ripple-storybook/utils'
import RplHeroHeader from './RplHeroHeader.vue'
import { RplHeaderThemes } from './constants'

export default {
  title: 'Core/Containers/Header',
  component: RplHeroHeader,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: RplHeaderThemes
    }
  },
  args: {
    title: 'Find, connect, shape your Victoria',
    default:
      "Access grants and services, find out what's on in Victoria and have your say on government decisions."
  }
} satisfies Meta<typeof RplHeroHeader>

type Story = StoryObj<typeof RplHeroHeader>

const backgroundSample = {
  alt: 'A description of the image',
  src: 'img/image-landscape-s.jpg',
  srcSet:
    '/img/image-landscape-s.jpg 640w, /img/image-landscape-m.jpg 960w , /img/image-landscape-l.jpg 1240w',
  sizes:
    '(min-width: 640px) 640px, (min-width: 960px) 960px, (min-width: 1240px) 1240px',
  height: 1920,
  width: 2880,
  focalPoint: { x: 2620, y: 620 }
}

export const Default: Story = {}

export const NoCornerGraphics: Story = {
  name: 'Default/No corner graphics',
  args: { cornerTop: false, cornerBottom: false }
}

export const CustomCornerGraphics: Story = {
  name: 'Default/Custom corner graphics',
  args: {
    cornerTop: '/img/hero-corner-top.png',
    cornerBottom: '/img/hero-corner-bottom.png'
  }
}

export const Logo: Story = {
  name: 'Default/Logo',
  args: {
    cornerTop: true,
    logo: {
      src: svgPlaceholder({ width: 300, height: 200 }),
      alt: 'A description of the logo'
    }
  }
}

export const Logos: Story = {
  name: 'Default/Logos',
  args: {
    cornerTop: true,
    logo: [
      {
        src: svgPlaceholder({ width: 150, height: 100 }),
        alt: 'A description of the logo'
      },
      {
        src: svgPlaceholder({ width: 200, height: 100 }),
        alt: 'Another description of the logo'
      }
    ]
  }
}

export const JourneyLinks: Story = {
  name: 'Default/Journey links',
  args: {
    links: {
      title: 'Popular searches',
      items: [
        { text: 'Jobs and careers', url: '#first' },
        { text: 'Working with Children Check', url: '#second' },
        { text: 'NDIS Worker Screening Check', url: '#third' },
        { text: 'Coronavirus: latest information', url: '#fourth' },
        { text: 'Contact the Victorian Government', url: '#fifth' }
      ]
    }
  }
}

export const CallToAction: Story = {
  name: 'Default/Call to action',
  args: {
    primaryAction: { text: 'Primary action', url: '#primary' },
    secondaryAction: {
      title: 'Want to know more',
      text: 'Secondary action',
      url: '#secondary'
    }
  }
}

export const Reverse: Story = {
  args: { theme: 'reverse' }
}

export const ReverseJourneyLinks: Story = {
  name: 'Reverse/Journey links',
  args: {
    theme: 'reverse',
    links: {
      title: 'Want to know more',
      items: [
        { text: 'First links', url: '#first' },
        { text: 'Second link', url: '#second' },
        { text: 'A third link', url: '#third' }
      ]
    }
  }
}

export const ReverseCallToAction: Story = {
  name: 'Reverse/Call to action',
  args: {
    theme: 'reverse',
    primaryAction: { text: 'Primary action', url: '#primary' },
    secondaryAction: {
      title: 'Want to know more',
      text: 'Secondary action',
      url: '#secondary'
    }
  }
}

export const ImageReverse: Story = {
  name: 'Image/Reverse',
  args: {
    theme: 'reverse',
    background: backgroundSample,
    cornerTop: false,
    cornerBottom: false
  }
}

export const ImageNeutral: Story = {
  name: 'Image/Neutral',
  args: {
    theme: 'neutral',
    background: backgroundSample,
    cornerTop: false,
    cornerBottom: false
  }
}

export const ImageCallToAction: Story = {
  name: 'Image/Call to action',
  args: {
    background: backgroundSample,
    cornerTop: false,
    cornerBottom: false,
    title: 'Find, connect and shape your Victoria',
    default:
      "Access services and find out what's on in your local area and have your say on government decisions.",
    primaryAction: { text: 'Primary action', url: '#primary' },
    secondaryAction: {
      title: 'Find out more',
      text: 'Secondary action',
      url: '#secondary'
    }
  }
}
