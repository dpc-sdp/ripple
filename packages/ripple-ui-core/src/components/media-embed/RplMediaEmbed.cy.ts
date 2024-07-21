import RplMediaEmbed from './RplMediaEmbed.vue'

const props = {
  title: 'Media title',
  variant: 'complex',
  type: 'image',
  src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  dataContent: 'Content',
  allowFullscreen: true
}

describe('RplMediaEmbed', () => {
  it('mounts', () => {
    cy.mount(RplMediaEmbed, { props })
  })

  it('toggles the display of more information', () => {
    cy.mount(RplMediaEmbed, { props })

    cy.get('.rpl-media-embed__view-data-toggle').as('toggle')
    cy.get('.rpl-media-embed__view-data-content').as('content')

    cy.get('@toggle').should('contain.text', "View 'Media title' data")
    cy.get('@content').should('be.hidden')

    cy.get('@toggle').click()

    cy.get('@toggle').should('contain.text', "Close 'Media title' data")
    cy.get('@content').should('be.visible')
  })

  it('display an image fullscreen', () => {
    cy.mount(RplMediaEmbed, { props })

    cy.get('.rpl-media-embed__fullscreen-button').click()
    cy.get('.rpl-media-embed__modal').should('be.visible')

    cy.get('.rpl-media-embed__modal button').click()
    cy.get('.rpl-media-embed__modal').should('not.exist')
  })
})
