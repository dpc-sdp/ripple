import type { Meta, StoryObj } from '@storybook/vue3'
import { svgPlaceholder } from 'ripple-storybook/utils'
import RplCallToAction from './RplCallToActionCard.vue'

type ExtendedCallToActionCardProps = Partial<typeof RplCallToAction> & {
  number: 1 | 2 | 4 | 8
}

export default {
  title: 'Core/Navigation/Card',
  component: RplCallToAction,
  argTypes: {
    number: {
      control: { type: 'select' },
      options: [1, 2, 4, 8]
    }
  }
} satisfies Meta<ExtendedCallToActionCardProps>

type Story = StoryObj<ExtendedCallToActionCardProps>

export const CallToAction: Story = {
  args: {
    number: 1,
    url: 'https://www.vic.gov.au',
    title: 'Small Business Ventilation Program',
    default:
      '<p>Funding for public-facing small businesses to purchase equipment and upgrades to improve ventilation and reduce the spread of COVID-19 and boost customer confidence.</p>'
  },
  render: (args) => ({
    components: { RplCallToAction },
    setup() {
      const img = {
        src: svgPlaceholder({
          width: 1200,
          height: 800,
          bgColor: '#ccc',
          fgColor: '#444'
        })
      }
      return { args, img }
    },
    template: `
      <ul class="rpl-storybook__page rpl-grid">
        <RplCallToAction
          v-for="index of args.number"
          :key="index"
          el="li"
          v-bind="args"
          class="rpl-col-12"
          :image="img"
        >
          ${args.default}
        </RplCallToAction>
      </ul>
    `
  })
}
