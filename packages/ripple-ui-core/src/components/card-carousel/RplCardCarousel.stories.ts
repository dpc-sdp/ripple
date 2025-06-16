import type { Meta, StoryObj } from '@storybook/vue3'
import RplCardCarousel from './RplCardCarousel.vue'
import { exampleKeyDatesCard, exampleCards } from './fixtures/sample'
import { IRplCardCarouselItem } from './constants'

export default {
  title: 'Core/Containers/Card carousel',
  component: RplCardCarousel
} satisfies Meta<typeof RplCardCarousel>

type Story = StoryObj<typeof RplCardCarousel>

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
