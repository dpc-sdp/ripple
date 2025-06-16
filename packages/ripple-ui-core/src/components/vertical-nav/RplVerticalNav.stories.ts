import type { Meta, StoryObj } from '@storybook/vue3'
import RplVerticalNav from './RplVerticalNav.vue'
import { RplVerticalNavItems } from './fixtures/sample'

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
        '<div class="rpl-grid"><div class="rpl-col-12 rpl-col-4-m"><story /></div></div>'
    })
  ]
} satisfies Meta<typeof RplVerticalNav>

type Story = StoryObj<typeof RplVerticalNav>

export const VerticalNavigation: Story = {
  args: {
    title: 'Section name',
    items: RplVerticalNavItems
  }
}
