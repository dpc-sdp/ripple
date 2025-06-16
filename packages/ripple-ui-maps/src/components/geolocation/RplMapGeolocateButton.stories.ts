import type { Meta, StoryObj } from '@storybook/vue3'
import RplMapGeolocateButton from './RplMapGeolocateButton.vue'
import '@dpc-sdp/ripple-ui-core/style/components'

export default {
  title: 'Maps/Geolocate Button',
  component: RplMapGeolocateButton
} satisfies Meta<typeof RplMapGeolocateButton>

type Story = StoryObj<typeof RplMapGeolocateButton>

export const Default: Story = {
  args: {
    title: 'Legend'
  }
}
