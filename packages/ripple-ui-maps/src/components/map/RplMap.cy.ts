import RplMap from './RplMap.vue'

const baseProps = {
  id: '1234'
}

describe('RplMap', () => {
  it('mounts', () => {
    cy.mount(RplMap, {
      props: {
        ...baseProps
      }
    })
    cy.get('.rpl-map').should('exist')
  })
})
