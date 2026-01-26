import type { Meta, StoryObj } from '@storybook/vue3'
import RplCardCarousel from './RplCardCarousel.vue'
import RplPromoCard from '../card/RplPromoCard.vue'
import { exampleKeyDatesCard, exampleCards } from './fixtures/sample'
import { IRplCardCarouselItem } from './constants'

type ExtendedCardCarousel = Partial<typeof RplCardCarousel> & {
  _items: any
}

export default {
  title: 'Core/Containers/Card carousel',
  component: RplCardCarousel
} satisfies Meta<ExtendedCardCarousel>

type Story = StoryObj<ExtendedCardCarousel>

export const Default: Story = {
  args: {
    perView: 1,
    items: exampleCards as IRplCardCarouselItem[]
  }
}

export const Breakpoints: Story = {
  args: {
    perView: { xs: 1, m: 2, l: 3 },
    items: [
      ...exampleCards,
      exampleKeyDatesCard,
      ...exampleCards
    ] as IRplCardCarouselItem[]
  }
}

export const ScrollOnMobile: Story = {
  args: {
    perView: { xs: 1, m: 2 },
    items: exampleCards.slice(0, 2) as IRplCardCarouselItem[]
  }
}

export const SingleCard: Story = {
  args: {
    items: [exampleCards[0] as IRplCardCarouselItem]
  }
}

export const WithSlots: Story = {
  args: {
    perView: { xs: 1, m: 2, l: 3 },
    _items: [...exampleCards, ...exampleCards] as IRplCardCarouselItem[]
  },
  render: (args) => ({
    components: { RplCardCarousel, RplPromoCard },
    setup() {
      return { args }
    },
    template: `
      <RplCardCarousel :per-view="args.perView">
        <RplPromoCard v-for="(item, i) in args._items" :key="i" v-bind="item">
          {{ item.summary }}
        </RplPromoCard>
      </RplCardCarousel>
    `
  })
}
