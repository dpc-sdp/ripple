import type { Meta, StoryObj } from '@storybook/vue3'
import { svgPlaceholder } from 'ripple-storybook/utils'
import RplNavCard from './RplNavCard.vue'
import RplIcon from '../icon/RplIcon.vue'
import RplTag from '../tag/RplTag.vue'

type ExtendedNavCard = Partial<typeof RplNavCard> & {
  number: 1 | 2 | 4 | 8
}

export default {
  title: 'Core/Navigation/Card',
  component: RplNavCard,
  argTypes: {
    number: {
      control: { type: 'select' },
      options: [1, 2, 4, 8]
    },
    graphicElement: {
      control: 'radio',
      options: ['Image inset', 'Heading highlighted', 'None']
    },
    meta: {
      control: 'select',
      options: [
        '',
        '<span class="rpl-card__topic">BUSINESS</span>',
        '<span class="rpl-card__topic">BUSINESS</span><span>10 Aug 2022</span>',
        '<span>10 Aug 2022</span>',
        '<RplTag variant="neutral" label="Event"></RplTag><span>10 Aug 2022</span>',
        '<RplTag variant="neutral" label="Grant"></RplTag>',
        '<RplTag variant="neutral" label="Grant"></RplTag><span class="rpl-card__status"><RplIcon class="rpl-icon--colour-success" name="icon-check-circle-filled"></RplIcon><span>Open</span></span>',
        '<RplTag variant="neutral" label="Grant"></RplTag><span class="rpl-card__status"><RplIcon class="rpl-icon--colour-error" name="icon-cancel-circle-filled"></RplIcon><span>Closed</span></span>'
      ]
    }
  }
} satisfies Meta<ExtendedNavCard>

type Story = StoryObj<ExtendedNavCard>

export const Nav: Story = {
  args: {
    number: 1,
    graphicElement: 'Image inset',
    meta: '<RplTag variant="neutral" label="Grant"></RplTag><span class="rpl-card__status"><RplIcon class="rpl-icon--colour-success" name="icon-check-circle-filled"></RplIcon><span>Open</span></span>',
    url: 'https://www.vic.gov.au',
    title: 'Small Business Ventilation Program',
    default:
      '<p>Funding for public-facing small businesses to purchase equipment and upgrades to improve ventilation and reduce the spread of COVID-19 and boost customer confidence.</p>'
  },
  render: (args) => ({
    components: { RplNavCard, RplIcon, RplTag },
    setup() {
      const src = svgPlaceholder({
        width: 1200,
        height: 800,
        bgColor: '#e76',
        fgColor: '#a31'
      })
      const img =
        args.graphicElement === 'Image inset' ||
        args.graphicElement === 'Heading highlighted'
          ? { src, alt: 'Alt text' }
          : null
      return { args, img }
    },
    template: `
      <ul class="rpl-storybook__page rpl-grid">
        <RplNavCard
          v-for="index of args.number"
          :key="index"
          el="li"
          v-bind="args"
          class="rpl-col-12"
          :image="img"
          :highlight="args.graphicElement === 'Heading highlighted'"
          :inset="args.graphicElement === 'Image inset'"
        >
          <template #meta>
            ${args.meta}
          </template>
          ${args.default}
        </RplNavCard>
      </ul>
    `
  })
}
