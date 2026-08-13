import type { Meta, StoryObj } from '@storybook/vue3'
import RplVerticalNav from './RplVerticalNav.vue'
import {
  verticalNavExample1,
  verticalNavExample3,
  verticalNavExample4,
  verticalNavExample5
} from './fixtures/sample'

export default {
  title: 'Core/Navigation/Vertical navigation',
  component: RplVerticalNav,
  argTypes: {
    toggleLevels: {
      control: { type: 'select' },
      options: [1, 2, 3]
    }
  },
  decorators: [
    () => ({
      template:
        '<div class="rpl-storybook__page rpl-grid"><div class="rpl-col-12 rpl-col-4-m"><story /></div></div>'
    })
  ]
} satisfies Meta<typeof RplVerticalNav>

type Story = StoryObj<typeof RplVerticalNav>

export const VerticalNavigation: Story = {
  args: {
    title: 'Section name',
    items: verticalNavExample1
  }
}

export const VerticalNavigationWithToggleLevel1: Story = {
  args: {
    title: 'Section name',
    items: verticalNavExample3,
    toggleLevels: 1
  }
}

export const VerticalNavigationWithToggleLevel2: Story = {
  args: {
    title: 'Section name',
    items: verticalNavExample3,
    toggleLevels: 2
  }
}

export const VerticalNavigationWithToggleLevel3: Story = {
  args: {
    title: 'Section name',
    items: verticalNavExample3,
    toggleLevels: 3
  }
}

export const VerticalNavigationWithNoChildren: Story = {
  args: {
    title: 'Section name',
    items: verticalNavExample4
  }
}

export const VerticalNavigationMixedToggles: Story = {
  args: {
    title: 'Section name',
    items: verticalNavExample5,
    toggleLevels: 2
  }
}
