import RplImage from './RplImage.vue'
import { RplImageFit, RplImagePriority } from './constants'
import type { Meta, StoryObj } from '@storybook/vue3'

type ExtendedImageProps = Partial<typeof RplImage> & {
  srcSet: string
}

export default {
  title: 'Core/Containers/Image',
  component: RplImage,
  argTypes: {
    aspect: {
      control: {
        type: 'select',
        options: ['', 'square', 'full', 'wide', 'ultrawide', 'panorama']
      }
    },
    fit: { control: { type: 'select' }, options: RplImageFit },
    priority: { control: { type: 'select' }, options: RplImagePriority }
  }
} satisfies Meta<ExtendedImageProps>

type Story = StoryObj<ExtendedImageProps>

export const Image: Story = {
  args: { src: 'img/image-landscape-m.jpg' }
}

export const Circle: Story = {
  args: {
    src: 'img/image-landscape-s.jpg',
    height: 200,
    width: 200,
    circle: true
  }
}

export const Square: Story = {
  name: 'Square 1/1',
  args: {
    src: 'img/image-landscape-m.jpg',
    height: 500,
    width: 600,
    aspect: 'square'
  }
}

export const Full: Story = {
  name: 'Full 4/3',
  args: {
    src: 'img/image-landscape-m.jpg',
    height: 500,
    width: 600,
    aspect: 'full'
  }
}

export const Wide: Story = {
  name: 'Wide 16/9',
  args: {
    src: 'img/image-landscape-m.jpg',
    height: 500,
    width: 600,
    aspect: 'wide'
  }
}

export const Ultrawide: Story = {
  name: 'Ultrawide 21/9',
  args: {
    src: 'img/image-landscape-m.jpg',
    height: 500,
    width: 600,
    aspect: 'ultrawide'
  }
}

export const Panorama: Story = {
  name: 'Panorama 3/1',
  args: {
    src: 'img/image-landscape-m.jpg',
    height: 500,
    width: 600,
    aspect: 'panorama'
  }
}

export const LazyLoading: Story = {
  args: {
    src: 'img/image-landscape-m.jpg',
    height: 500,
    width: 600,
    priority: 'low'
  }
}

export const ResponsiveRatios: Story = {
  args: {
    src: 'img/image-landscape-m.jpg',
    height: 500,
    width: 600,
    aspect: {
      xs: 'square',
      s: 'full',
      m: 'wide',
      l: 'ultrawide',
      xl: 'panorama'
    },
    priority: 'high'
  }
}

export const FocalPosition: Story = {
  args: {
    src: 'img/image-landscape-l.jpg',
    height: 1920,
    width: 2880,
    focalPoint: { x: 2620, y: 620 },
    aspect: {
      xs: 'square',
      s: 'full',
      m: 'wide',
      l: 'ultrawide',
      xl: 'panorama'
    },
    priority: 'high'
  }
}

export const ImageFit: Story = {
  args: {
    src: 'img/image-landscape-m.jpg',
    height: 800,
    width: 800,
    fit: 'contain'
  }
}

export const SourceSets: Story = {
  args: {
    src: 'img/image-landscape-s.jpg',
    srcSet:
      'img/image-landscape-s.jpg 640w, img/image-landscape-m.jpg 960w , img/image-landscape-l.jpg 1240w',
    sizes:
      '(min-width: 640px) 640px, (min-width: 960px) 960px, (min-width: 1240px) 1240px'
  }
}
