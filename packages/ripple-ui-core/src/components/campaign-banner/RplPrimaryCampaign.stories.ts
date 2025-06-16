import type { Meta, StoryObj } from '@storybook/vue3'
import RplPrimaryCampaign from './RplPrimaryCampaign.vue'
import RplContent from '../content/RplContent.vue'
import { bpMin } from '../../lib/breakpoints'

const Template = (args) => ({
  components: { RplPrimaryCampaign, RplContent },
  setup() {
    return { args }
  },
  template: `
    <RplPrimaryCampaign v-bind="args">
      <RplContent html="${args.default}" />
      <template v-if="args.meta" #meta>
        ${args.meta}
      </template>
    </RplPrimaryCampaign>
  `
})

export default {
  title: 'Core/Navigation/Campaign banner',
  component: RplPrimaryCampaign,
  render: Template,
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [bpMin.s, bpMin.l]
    }
  },
  args: {
    title: 'Example campaign banner title',
    default:
      '<p>In do dolore dolore sint ipsum est est, commodo ex laborum Lorem ut deserunt dolore ullamco.</p>',
    link: { text: 'Campaign link', url: '#' }
  }
} satisfies Meta<typeof RplPrimaryCampaign>

type Story = StoryObj<typeof RplPrimaryCampaign>

export const Primary: Story = {}

export const PrimaryWithImage: Story = {
  name: 'Primary/Image',
  args: {
    image: {
      src: 'img/image-landscape-m.jpg'
    },
    meta: '<span>Some metadata, probably about the image</span>'
  }
}
