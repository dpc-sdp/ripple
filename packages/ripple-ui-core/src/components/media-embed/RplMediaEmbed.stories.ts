import type { Meta, StoryObj } from '@storybook/vue3'
import RplMediaEmbed from './RplMediaEmbed.vue'

export default {
  title: 'Core/Containers/Media embed',
  component: RplMediaEmbed,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'select' }
    }
  }
} as Meta<typeof RplMediaEmbed>

type Story = StoryObj<typeof RplMediaEmbed>

export const ImageLandscape: Story = {
  args: {
    type: 'image',
    variant: 'landscape',
    size: 'large',
    title: 'Media title',
    src: 'img/image-landscape-m.jpg',
    showTitle: false,
    allowFullscreen: false,
    caption: 'Optional media caption content section',
    sourceCaption: 'Optional media source information content section'
  }
}

export const ImagePortrait: Story = {
  args: {
    type: 'image',
    variant: 'portrait',
    size: 'large',
    title: 'Media title',
    src: 'img/image-landscape-m.jpg',
    showTitle: false,
    allowFullscreen: false,
    caption: 'Optional media caption content section',
    sourceCaption: 'Optional media source information content section'
  }
}

export const ImageSquare: Story = {
  args: {
    type: 'image',
    variant: 'square',
    size: 'large',
    title: 'Media title',
    src: 'img/image-landscape-m.jpg',
    caption: 'Optional media caption content section',
    sourceCaption: 'Optional media source information content section'
  }
}

export const ComplexImage: Story = {
  args: {
    type: 'image',
    variant: 'complex',
    title: 'Media title',
    src: 'img/image-landscape-l.jpg',
    showTitle: true,
    allowFullscreen: true,
    caption: 'Optional media caption content section',
    sourceCaption: 'Optional media source information content section',
    dataContent: `
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec commodo est eu
        venenatis tincidunt. Sed sit amet magna tortor. Nullam gravida, nibh a
        tincidunt tempor.
      </p>
      <p>
        Nulla mauris turpis, mollis et fermentum in, tincidunt vitae enim. Aenean
        gravida, mi a pharetra tempor.
      </p>
    `,
    downloadUrl: 'img/image-landscape-l.jpg'
  }
}

export const ComplexImageNoCaption: Story = {
  name: 'Complex / No Caption',
  args: {
    type: 'image',
    variant: 'complex',
    title: 'Media title',
    src: 'img/image-landscape-l.jpg',
    showTitle: true,
    allowFullscreen: true,
    dataContent: `Commodo qui exercitation sint.`,
    downloadUrl: 'img/image-landscape-l.jpg'
  }
}

export const Video: Story = {
  args: {
    type: 'video',
    title: 'Media title',
    src: 'https://www.youtube.com/embed/bSlnfyGTiss',
    transcriptUrl: '#',
    caption: 'Optional media caption content section'
  }
}

export const NoBackground: Story = {
  name: 'No background',
  args: {
    type: 'image',
    variant: 'landscape',
    size: 'large',
    background: false,
    src: 'img/image-landscape-m.jpg',
    caption: 'Optional media caption content section',
    sourceCaption: 'Optional media source information content section'
  }
}

export const NoBackgroundComplex: Story = {
  name: 'No background / Complex',
  args: {
    type: 'image',
    variant: 'complex',
    title: 'Media title',
    src: 'img/image-landscape-l.jpg',
    showTitle: true,
    allowFullscreen: true,
    background: false,
    caption: 'Caption section',
    sourceCaption: 'Some info about the image',
    downloadUrl: 'img/image-landscape-l.jpg',
    dataContent: 'Some more info...'
  }
}

export const NoBackgroundComplexNoCaption: Story = {
  name: 'No background / Complex no Caption',
  args: {
    type: 'image',
    variant: 'landscape',
    size: 'large',
    title: 'Media title',
    src: 'img/image-landscape-m.jpg',
    showTitle: true,
    allowFullscreen: true,
    background: false,
    downloadUrl: 'img/image-landscape-l.jpg',
    dataContent: 'Some more info...'
  }
}

export const NoBackgroundVideo: Story = {
  name: 'No background / Video',
  args: {
    type: 'video',
    background: false,
    title: 'Media title',
    src: 'https://www.youtube.com/embed/bSlnfyGTiss',
    transcriptUrl: '#',
    caption: 'Optional media caption content section'
  }
}
