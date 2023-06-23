import RplTabs from './RplTabs.vue'

const baseProps = {
  tabs: [
    {
      title: 'One',
      key: 'one'
    },
    {
      title: 'Two',
      key: 'two'
    }
  ]
}

describe('RplTabs', () => {
  it('mounts', () => {
    cy.mount(RplTabs, { props: baseProps })
  })

  it('switches tabs when clicked', () => {
    cy.mount(RplTabs, { props: baseProps })

    cy.get('.rpl-tab--active').should('contain', 'One')
    cy.get('.rpl-tab button').contains('Two').click()
    cy.get('.rpl-tab--active').should('contain', 'Two')
  })

  it('sets the correct default tab', () => {
    cy.mount(RplTabs, { props: { ...baseProps, activeTab: 'two' } })

    cy.get('.rpl-tab--active').should('contain', 'Two')
  })
})
