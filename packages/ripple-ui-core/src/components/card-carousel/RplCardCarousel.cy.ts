import RplCardCarousel from './RplCardCarousel.vue'
import RplNavCard from '../card/RplNavCard.vue'
import { h } from 'vue'

const items = [
  {
    type: 'promo',
    title: 'First card',
    url: '#'
  },
  {
    type: 'promo',
    title: 'Second card',
    url: '#'
  }
]

const props = { items }

describe('RplMediaGallery', () => {
  it('mounts', () => {
    cy.mount(RplCardCarousel, { props })
  })

  it('navigates through cards with pagination', () => {
    cy.mount(RplCardCarousel, { props })

    cy.get('[aria-label="Go to next item"]').click()
    cy.contains('.swiper-slide-active', items[1].title)

    cy.get('[aria-label="Go to previous item"]').click()
    cy.contains('.swiper-slide-active', items[0].title)
  })

  it('navigates through slot provided cards', () => {
    cy.mount(RplCardCarousel, {
      props: {
        perView: 1
      },
      slots: {
        default: () =>
          items.map((item) =>
            h(RplNavCard, { ...item, title: `${item.title} slot` })
          )
      }
    })

    cy.get('[aria-label="Go to next item"]').click()
    cy.contains('.swiper-slide-active', `${items[1].title} slot`)

    cy.get('[aria-label="Go to previous item"]').click()
    cy.contains('.swiper-slide-active', `${items[0].title} slot`)
  })
})
