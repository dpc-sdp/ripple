import type { Meta, StoryObj } from '@storybook/vue3'
import RplButton from './RplButton.vue'
import {
  RplButtonIconPositions,
  RplButtonThemes,
  RplButtonVariants,
  RplButtonElements
} from './constants'
import { RplIconNames } from '../icon/constants'
import { buttonFocusState } from './RplButton.play'

export default {
  title: 'Core/Navigation/Button',
  component: RplButton,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: RplButtonVariants
    },
    theme: {
      control: { type: 'select' },
      options: RplButtonThemes
    },
    iconName: {
      control: { type: 'select' },
      options: [undefined, ...RplIconNames]
    },
    iconPosition: {
      control: { type: 'select' },
      options: RplButtonIconPositions
    },
    el: {
      control: { type: 'select' },
      options: RplButtonElements
    }
  },
  args: {
    label: 'Button text',
    busy: false
  }
} satisfies Meta<typeof RplButton>

type Story = StoryObj<typeof RplButton>

export const DefaultFilled: Story = {
  name: 'Default/Filled',
  args: {
    variant: 'filled'
  }
}

export const DefaultOutlined: Story = {
  name: 'Default/Outlined',
  args: {
    variant: 'outlined'
  }
}

export const DefaultWhite: Story = {
  name: 'Default/White',
  args: {
    variant: 'white'
  }
}

export const DefaultElevated: Story = {
  name: 'Default/Elevated',
  args: {
    variant: 'elevated',
    iconName: 'icon-arrow-up'
  }
}

export const DefaultDestructive: Story = {
  name: 'Default/Destructive',
  args: {
    variant: 'destructive'
  }
}

export const NeutralOutlined: Story = {
  name: 'Neutral/Outlined',
  args: {
    variant: 'outlined',
    theme: 'neutral'
  }
}

export const NeutralWhite: Story = {
  name: 'Neutral/White',
  args: {
    variant: 'white',
    theme: 'neutral'
  }
}

export const NeutralElevated: Story = {
  name: 'Neutral/Elevated',
  args: {
    variant: 'elevated',
    theme: 'neutral',
    iconName: 'icon-arrow-up'
  }
}

export const WithIconsFilled: Story = {
  name: 'With icons/Filled',
  args: {
    variant: 'filled',
    iconName: 'icon-arrow-right'
  }
}

export const WithIconsOutlined: Story = {
  name: 'With icons/Outlined',
  args: {
    variant: 'outlined',
    iconName: 'icon-arrow-up'
  }
}

export const WithIconsLeft: Story = {
  name: 'With icons/Left',
  args: {
    variant: 'filled',
    iconPosition: 'left',
    iconName: 'icon-arrow-left'
  }
}

export const WithIconsRight: Story = {
  name: 'With icons/Right',
  args: {
    variant: 'filled',
    iconPosition: 'right',
    iconName: 'icon-arrow-right'
  }
}

export const FocusState: Story = {
  args: {
    variant: 'filled',
    label: 'Focused',
    iconName: 'icon-exclamation-circle-filled'
  },
  play: buttonFocusState
}

export const BusyState: Story = {
  args: {
    variant: 'filled',
    label: 'Button text',
    iconName: 'icon-exclamation-circle-filled',
    busy: true
  }
}
