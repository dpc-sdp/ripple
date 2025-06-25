import type { Meta, StoryObj } from '@storybook/vue3'
import { svgPlaceholder } from 'ripple-storybook/utils'
import RplMapLayerList from './RplMapLayerList.vue'
import '@dpc-sdp/ripple-ui-core/style/components'

export default {
  title: 'Maps/Layer list',
  component: RplMapLayerList
} satisfies Meta<typeof RplMapLayerList>

type Story = StoryObj<typeof RplMapLayerList>

export const DefaultStory: Story = {
  name: 'Default',
  args: {
    selectedLayers: ['red', 'green'],
    layers: [
      {
        id: 'red',
        label: 'Red layer',
        image: svgPlaceholder({
          width: 44,
          height: 44,
          fgColor: '#fff',
          bgColor: '#ffb2b2'
        })
      },
      {
        id: 'green',
        label: 'Green layer',
        image: svgPlaceholder({
          width: 44,
          height: 44,
          fgColor: '#fff',
          bgColor: '#caffae'
        })
      },
      {
        id: 'blue',
        label: 'Blue layer',
        image: svgPlaceholder({
          width: 44,
          height: 44,
          fgColor: '#fff',
          bgColor: '#aee9ff'
        })
      }
    ]
  },
  render: (args) => ({
    components: { RplMapLayerList },
    setup() {
      return { args }
    },
    data: () => ({ selectedLayers: args.selectedLayers }),
    template: `
      <RplMapLayerList v-bind="args" @update="onUpdate" :selectedLayers="selectedLayers"></RplMapLayerList>`,
    methods: {
      onUpdate(val) {
        this.selectedLayers = val
      }
    }
  })
}
