import type { Meta, StoryObj } from '@storybook/vue3'
import RplMapLegend from './RplMapLegend.vue'
import '@dpc-sdp/ripple-ui-core/style/components'

export default {
  title: 'Maps/Legend',
  component: RplMapLegend
} satisfies Meta<typeof RplMapLegend>

type Story = StoryObj<typeof RplMapLegend>

export const DefaultStory: Story = {
  name: 'Default',
  args: {
    title: 'Legend',
    defaultExpanded: true,
    items: [
      {
        text: 'Group 1',
        icon: 'icon-pin',
        iconColour: '#8A2A2B'
      },
      {
        text: 'Group 2 with longer label',
        icon: 'icon-pin',
        iconColour: '#E35205'
      },
      {
        text: 'Group 3 with even longer label',
        icon: 'icon-pin',
        iconColour: '#FF9E1B'
      },
      {
        text: 'Group 4 that is very long',
        icon: 'icon-pin',
        iconColour: '#87189D'
      },
      {
        text: 'Group 5 to test the wrapping',
        icon: 'icon-pin',
        iconColour: '#00B2A9'
      },
      {
        text: 'Group 6',
        icon: 'icon-pin',
        iconColour: '#71C5E8'
      }
    ]
  }
}
