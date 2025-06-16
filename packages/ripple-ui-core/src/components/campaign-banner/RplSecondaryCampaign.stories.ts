import type { Meta, StoryObj } from '@storybook/vue3'
import RplSecondaryCampaign from './RplSecondaryCampaign.vue'
import RplContent from '../content/RplContent.vue'
import { bpMin } from '../../lib/breakpoints'

const Template = (args) => ({
  components: { RplSecondaryCampaign, RplContent },
  setup() {
    return { args }
  },
  template: `
    <RplSecondaryCampaign v-bind="args">
      <RplContent html="${args.default}" />
    </RplSecondaryCampaign>
  `
})

export default {
  title: 'Core/Navigation/Campaign banner',
  component: RplSecondaryCampaign,
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
} satisfies Meta<typeof RplSecondaryCampaign>

type Story = StoryObj<typeof RplSecondaryCampaign>

export const Secondary: Story = {}

export const SecondaryWithImage: Story = {
  name: 'Secondary/Image',
  args: {
    image: {
      src: 'img/image-landscape-m.jpg'
    }
  }
}
