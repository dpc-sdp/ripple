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
  ],
  mode: 'horizontal'
}

describe('RplTabs', () => {
  it('mounts', () => {
    cy.mount(RplTabs, { props: baseProps })
  })

  it.only('switches tabs when clicked', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy')

    cy.mount(RplTabs, {
      props: { ...baseProps, activeTab: 'one', [`onToggleTab`]: onChangeSpy }
    })

    cy.get('.rpl-tab').contains('Two').click()

    cy.get('@onChangeSpy').should('have.been.calledWith', {
      action: 'select',
      id: 'two',
      key: 'two',
      text: 'Two'
    })
  })

  it('sets the correct default tab', () => {
    cy.mount(RplTabs, { props: { ...baseProps, activeTab: 'two' } })

    cy.get('.rpl-tab--active').should('contain', 'Two')
  })
})
