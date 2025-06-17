import type { Meta, StoryObj } from '@storybook/vue3'
import { svgPlaceholder } from 'ripple-storybook/utils'
import RplCategoryGridCard from './RplCategoryGridCard.vue'

type ExtendedCategoryGridCard = Partial<typeof RplCategoryGridCard> & {
  number: 1 | 2 | 4 | 8
}

export default {
  title: 'Core/Navigation/Card',
  component: RplCategoryGridCard,
  argTypes: {
    number: {
      control: { type: 'select' },
      options: [1, 2, 4, 8]
    }
  }
} satisfies Meta<ExtendedCategoryGridCard>

type Story = StoryObj<ExtendedCategoryGridCard>

export const CategoryGrid: Story = {
  args: {
    number: 1,
    heading: 'Species',
    url: 'https://www.vic.gov.au',
    image: { src: '' },
    title: 'Ash',
    default:
      '<p><em>Fraxinus</em>, commonly called ash, is a genus of flowering plants in the olive and lilac family, Oleaceae.</p>'
  },
  render: (args) => ({
    components: { RplCategoryGridCard },
    setup() {
      const img = {
        src: svgPlaceholder({
          width: 1200,
          height: 800,
          bgColor: '#e76',
          fgColor: '#a31'
        }),
        alt: 'Alt text'
      }
      return { args, img }
    },
    template: `
      <div class="rpl-storybook__page">
        <ul class="rpl-grid">
          <RplCategoryGridCard
            v-for="index of args.number"
            :key="index"
            el="li"
            v-bind="args"
            class="rpl-col-12 rpl-col-6-s rpl-col-4-l rpl-col-3-xl"
            :image="img"
            url="${args.url}"
            title="${args.title}"
          >
            ${args.default}
          </RplCategoryGridCard>
        </ul>
      </div>
    `
  })
}
