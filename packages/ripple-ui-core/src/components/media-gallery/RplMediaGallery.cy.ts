import RplMediaGallery from './RplMediaGallery.vue'

const props = {
  items: [
    {
      title: 'Media title',
      alt: 'Alt text',
      thumbnail:
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      image:
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    }
  ]
}

describe('RplMediaGallery', () => {
  it('mounts', () => {
    cy.mount(RplMediaGallery, { props })
  })

  it('display a gallery fullscreen', () => {
    cy.mount(RplMediaGallery, { props })

    cy.get('.rpl-media-gallery__button').click()
    cy.document().get('.rpl-media-gallery__modal').should('be.visible')
  })
})
