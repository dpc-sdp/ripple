import type { Meta, StoryObj } from '@storybook/vue3'
import RplIcon from './RplIcon.vue'
import { RplIconNames, RplIconSizes } from './constants'
import { RplColorThemes } from '../../lib/constants'

export default {
  title: 'Base styles/Icons',
  component: RplIcon,
  argTypes: {
    colour: {
      control: { type: 'select' },
      options: RplColorThemes
    },
    name: {
      control: { type: 'select' },
      options: RplIconNames
    },
    size: {
      control: { type: 'select' },
      options: RplIconSizes
    }
  }
} satisfies Meta<typeof RplIcon>

type Story = StoryObj<typeof RplIcon>

export const IconPlayground: Story = {
  name: 'Icon playground',
  args: {
    colour: RplColorThemes[0],
    name: RplIconNames[0],
    size: 'l',
    padded: false
  }
}
