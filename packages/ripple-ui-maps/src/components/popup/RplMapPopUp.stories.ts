import type { Meta, StoryObj } from '@storybook/vue3'
import RplMapPopUp from './RplMapPopUp.vue'
import '@dpc-sdp/ripple-ui-core/style/components'

export default {
  title: 'Maps/Pop Up',
  component: RplMapPopUp
} satisfies Meta<typeof RplMapPopUp>

type Story = StoryObj<typeof RplMapPopUp>

export const DefaultStory: Story = {
  name: 'Default',
  args: {
    isOpen: true,
    header: 'Pop up header'
  }
}
