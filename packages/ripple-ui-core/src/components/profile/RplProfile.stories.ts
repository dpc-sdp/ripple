import type { Meta, StoryObj } from '@storybook/vue3'
import { svgPlaceholder } from 'ripple-storybook/utils'
import RplProfile from './RplProfile.vue'

export default {
  title: 'Core/Containers/Profile',
  component: RplProfile,
  args: {
    image: {
      src: svgPlaceholder({ width: 400, height: 600 }),
      alt: ''
    }
  }
} satisfies Meta<typeof RplProfile>

type Story = StoryObj<typeof RplProfile>

export const Default: Story = {
  args: {
    items: [
      { term: 'Name:', description: 'Professor Jan Kowalski' },
      {
        term: 'Field of expertise:',
        description: 'Design, architecture and planning'
      }
    ]
  }
}

export const LongTitle: Story = {
  args: {
    items: [
      {
        term: 'Name:',
        description: 'Adjunct Associate Professor Emeritus Jan Kowalski'
      },
      {
        term: 'Field of expertise:',
        description:
          'Design, architecture and planning and Design, architecture and planning and Design, architecture and planning and Design, architecture and planning and Design, architecture and planning and Design, architecture and planning and Design, architecture and planning'
      }
    ]
  }
}
