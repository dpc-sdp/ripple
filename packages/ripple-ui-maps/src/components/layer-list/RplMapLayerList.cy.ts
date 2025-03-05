import RplMapLayerList from './RplMapLayerList.vue'

const baseProps = {
  title: 'Test title',
  layers: [
    { id: 'testLayer1', label: 'Test layer One', image: '/test/img/one' },
    { id: 'testLayer2', label: 'Test layer Two', image: '/test/img/two' }
  ]
}

describe('RplMapLayerList', () => {
  it('title can be customised', () => {
    cy.mount(RplMapLayerList, {
      props: {
        ...baseProps
      }
    })
    cy.get('.rpl-map-layer-list__trigger').should('have.text', 'Test title')
  })

  it('can open the list to view layers', () => {
    cy.mount(RplMapLayerList, {
      props: {
        ...baseProps
      }
    })

    cy.get('.rpl-map-layer-list').should('not.exist')
    cy.get('.rpl-map-layer-list__trigger').click()
    cy.get('.rpl-map-layer-list').should('exist')
    cy.get('.rpl-map-layer-list-item')
      .eq(0)
      .should('have.text', 'Test layer One')
    cy.get('.rpl-map-layer-list-item')
      .eq(1)
      .should('have.text', 'Test layer Two')
  })
})
