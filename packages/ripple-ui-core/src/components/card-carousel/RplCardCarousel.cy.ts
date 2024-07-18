import RplCardCarousel from './RplCardCarousel.vue'

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

  it('navigates to through cards with pagination', () => {
    cy.mount(RplCardCarousel, { props })

    cy.get('[aria-label="Go to next item"]').click()
    cy.contains('.swiper-slide-active', items[1].title)

    cy.get('[aria-label="Go to previous item"]').click()
    cy.contains('.swiper-slide-active', items[0].title)
  })
})
