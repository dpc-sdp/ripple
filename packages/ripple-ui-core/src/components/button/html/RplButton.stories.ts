import type { Meta, StoryObj } from '@storybook/html'
import { renderTwig } from '../../../utils/twig-renderer'
import RplButtonTwig from './RplButton.twig'
import {
  RplButtonIconPositions,
  RplButtonThemes,
  RplButtonVariants,
  RplButtonElements
} from '../constants'

export default {
  title: 'HTML Components/Navigation/Button',
  argTypes: {
    el: {
      control: { type: 'select' },
      options: RplButtonElements
    },
    variant: {
      control: { type: 'select' },
      options: RplButtonVariants
    },
    theme: {
      control: { type: 'select' },
      options: RplButtonThemes
    },
    icon_name: {
      control: { type: 'select' },
      options: [
        'icon-chevron-left',
        'icon-chevron-right',
        'icon-cancel',
        'icon-download',
        'icon-link-external-square-filled'
      ]
    },
    icon_position: {
      control: { type: 'select' },
      options: RplButtonIconPositions
    }
  },
  args: {
    label: 'Button text',
    busy: false,
    disabled: false
  },
  render: (args) => {
    return renderTwig(RplButtonTwig, args)
  }
} satisfies Meta

type Story = StoryObj

export const DefaultFilled: Story = {
  name: 'Default/Filled',
  args: {
    variant: 'filled',
    label: 'Filled button'
  }
}

export const DefaultOutlined: Story = {
  name: 'Default/Outlined',
  args: {
    variant: 'outlined',
    label: 'Outlined button'
  }
}

export const DefaultWhite: Story = {
  name: 'Default/White',
  args: {
    variant: 'white',
    label: 'White button'
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#1B2950' }]
    }
  }
}

export const DefaultElevated: Story = {
  name: 'Default/Elevated',
  args: {
    variant: 'elevated',
    icon_name: 'icon-arrow-right',
    label: 'Elevated button'
  }
}

export const DefaultDestructive: Story = {
  name: 'Default/Destructive',
  args: {
    variant: 'destructive',
    label: 'Destructive button'
  }
}

export const NeutralOutlined: Story = {
  name: 'Neutral/Outlined',
  args: {
    variant: 'outlined',
    theme: 'neutral',
    label: 'Neutral outlined'
  }
}

export const NeutralWhite: Story = {
  name: 'Neutral/White',
  args: {
    variant: 'white',
    theme: 'neutral',
    label: 'Neutral white'
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#1B2950' }]
    }
  }
}

export const NeutralElevated: Story = {
  name: 'Neutral/Elevated',
  args: {
    variant: 'elevated',
    theme: 'neutral',
    icon_name: 'icon-arrow-right',
    label: 'Neutral elevated'
  }
}

export const WithIconRight: Story = {
  name: 'With Icon/Right',
  args: {
    variant: 'filled',
    icon_name: 'icon-arrow-right',
    icon_position: 'right',
    label: 'Next'
  }
}

export const WithIconLeft: Story = {
  name: 'With Icon/Left',
  args: {
    variant: 'filled',
    icon_name: 'icon-arrow-right',
    icon_position: 'left',
    label: 'Previous'
  }
}

export const AsLink: Story = {
  name: 'As Link',
  args: {
    el: 'a',
    url: '#',
    variant: 'filled',
    label: 'Link button'
  }
}

export const Disabled: Story = {
  name: 'States/Disabled',
  args: {
    variant: 'filled',
    disabled: true,
    label: 'Disabled button'
  }
}

export const Busy: Story = {
  name: 'States/Busy',
  args: {
    variant: 'filled',
    busy: true,
    label: 'Loading...'
  }
}
