import type { Meta, StoryObj } from '@storybook/vue3'
import { svgPlaceholder } from 'ripple-storybook/utils'
import RplPromoCard from './RplPromoCard.vue'
import RplIcon from '../icon/RplIcon.vue'
import RplTag from '../tag/RplTag.vue'

type ExtendedPromoCardProps = Partial<typeof RplPromoCard> & {
  number: 1 | 2 | 4 | 8
}

const Template = (args: any) => ({
  components: { RplPromoCard, RplIcon, RplTag },
  setup() {
    const src = svgPlaceholder({
      width: 400,
      height: 300,
      bgColor: '#ad9',
      fgColor: '#efc'
    })
    const img =
      args.graphicElement === 'Image' ? { src, alt: 'Alt text' } : null
    const content = (i) => {
      if (!Array.isArray(args.default)) {
        return args.default
      }
      return args.default[i] || args.default[0]
    }

    return { args, img, content }
  },
  template: `
    <ul class="rpl-storybook__page rpl-grid">
      <RplPromoCard
        v-for="index of args.number"
        :key="index"
        el="li"
        v-bind="args"
        class="rpl-col-12 rpl-col-6-m rpl-col-4-l"
        :image="args.graphicElement === 'Image' ? img : null"
        :heading-highlight="args.headingStyle !== 'Normal'"
        :highlight="args.graphicElement === 'Highlight'"
      >
        <template #meta>
          ${args.meta}
        </template>
        <p>{{content(index)}}</p>
        <template v-if="args.lower" #lower>
          ${args.lower}
        </template>
      </RplPromoCard>
    </ul>
  `
})

export default {
  title: 'Core/Navigation/Card',
  component: RplPromoCard,
  render: Template,
  argTypes: {
    number: {
      control: { type: 'select' },
      options: [1, 2, 4, 8]
    },
    graphicElement: {
      control: 'radio',
      options: ['Image', 'Highlight', 'None']
    }
  }
} satisfies Meta<ExtendedPromoCardProps>

type Story = StoryObj<ExtendedPromoCardProps>

export const Promo: Story = {
  args: {
    number: 1,
    graphicElement: 'Image',
    meta: '<span class="rpl-card__topic">ENVIRONMENT</span>',
    url: 'https://www.vic.gov.au',
    title: 'Protected grasslands under threat',
    default:
      'The natural temperate grassland and the grassy eucalypt woodlands of the Victorian volcanic plain are two of Australia’s most endangered ecosystems.'
  }
}

export const PromoWithLower: Story = {
  name: 'Promo/With lower',
  args: {
    number: 2,
    meta: '<span class="rpl-card__topic">ENVIRONMENT</span>',
    default: [
      'The natural temperate grassland and the grassy eucalypt woodlands of the Victorian volcanic plain are two of Australia’s most endangered ecosystems.',
      'The natural temperate grassland and the grassy eucalypt woodlands'
    ],
    lower:
      '<span class="rpl-card__icon-text"><RplIcon name="icon-pin" colour="default" /> Melbourne</span>'
  }
}
