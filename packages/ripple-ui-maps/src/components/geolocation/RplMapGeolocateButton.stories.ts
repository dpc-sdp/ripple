import type { Meta, StoryObj } from '@storybook/vue3'
import { action } from 'storybook/actions'
import RplMapGeolocateButton from './RplMapGeolocateButton.vue'
import '@dpc-sdp/ripple-ui-core/style/components'

export default {
  title: 'Maps/Geolocate Button',
  component: RplMapGeolocateButton
} satisfies Meta<typeof RplMapGeolocateButton>

type Story = StoryObj<typeof RplMapGeolocateButton>

export const DefaultStory: Story = {
  name: 'Default',
  args: {
    error: null
  },
  render: (args) => ({
    components: { RplMapGeolocateButton },
    setup() {
      return { args }
    },
    methods: {
      geolocateAction: action('onGeolocate')
    },
    template: `
      <RplMapGeolocateButton @onGeolocate="geolocateAction" v-bind="args" />
    `
  })
}
