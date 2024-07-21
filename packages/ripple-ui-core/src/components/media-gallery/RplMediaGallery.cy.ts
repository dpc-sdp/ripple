import RplMediaGallery from './RplMediaGallery.vue'

const items = [
  {
    title: 'One',
    alt: 'Alt text',
    thumbnail:
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA1',
    image:
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA1'
  },
  {
    title: 'Two',
    alt: 'Alt text',
    thumbnail:
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    image:
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  }
]

const props = { items }

describe('RplMediaGallery', () => {
  it('mounts', () => {
    cy.mount(RplMediaGallery, { props })
  })

  it('display a gallery fullscreen', () => {
    cy.mount(RplMediaGallery, { props })

    cy.get('.rpl-media-gallery__primary-content .rpl-slider__slide')
      .first()
      .find(' .rpl-media-gallery__button')
      .click()
    cy.document().get('.rpl-media-gallery__modal').should('be.visible')
  })

  it('navigates to through items with pagination', () => {
    cy.mount(RplMediaGallery, { props })

    cy.get('[aria-label="Go to next item"]').click()
    cy.get('.rpl-media-gallery__primary-content .swiper-slide-active').should(
      'contain',
      items[1].title
    )
    cy.get('.rpl-media-gallery__primary-images .swiper-slide-active .rpl-image')
      .should('have.attr', 'src')
      .and('equal', items[1].thumbnail)

    cy.get('[aria-label="Go to previous item"]').click()
    cy.get('.rpl-media-gallery__primary-content .swiper-slide-active').should(
      'contain',
      items[0].title
    )
    cy.get('.rpl-media-gallery__primary-images .swiper-slide-active .rpl-image')
      .should('have.attr', 'src')
      .and('equal', items[0].thumbnail)
  })

  it('displays the item navigated too fullscreen', () => {
    cy.mount(RplMediaGallery, { props })

    cy.get('[aria-label="Go to next item"]').click()

    cy.get('.rpl-media-gallery__primary-content .swiper-slide-active')
      .find(' .rpl-media-gallery__button')
      .click()

    cy.get('.rpl-media-gallery__modal').should('be.visible')

    cy.get('.rpl-media-gallery__modal-content .swiper-slide-active').should(
      'contain',
      items[1].title
    )
    cy.get('.rpl-media-gallery__modal-images .swiper-slide-active .rpl-image')
      .should('have.attr', 'src')
      .and('equal', items[1].thumbnail)
  })

  it('allows navigating through items in fullscreen gallery', () => {
    cy.mount(RplMediaGallery, { props })

    cy.get('.rpl-media-gallery__primary-content .rpl-media-gallery__button')
      .first()
      .click()

    cy.get('.rpl-media-gallery__modal').as('modal')

    cy.get('@modal').find('[aria-label="Go to next item"]').click()

    cy.get('@modal').contains(
      '.rpl-media-gallery__modal-content .swiper-slide-active',
      items[1].title
    )
    cy.get('@modal')
      .find('.swiper-slide-active .rpl-image')
      .should('have.attr', 'src')
      .and('equal', items[1].image)

    cy.get('@modal').find('[aria-label="Go to previous item"]').click()

    cy.get('@modal').contains(
      '.rpl-media-gallery__modal-content .swiper-slide-active',
      items[0].title
    )
    cy.get('@modal')
      .find('.swiper-slide-active .rpl-image')
      .should('have.attr', 'src')
      .and('equal', items[0].image)
  })
})
