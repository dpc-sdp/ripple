import RplProgress from './RplProgress.vue'

const baseProps = {
  id: 'testId',
  title: 'Test title',
  steps: [
    {
      id: 'test1',
      label: 'Test item one'
    },
    {
      id: 'test2',
      label: 'Test item two'
    },
    {
      id: 'test3',
      label: 'Test item three'
    }
  ]
}

describe.only('RplProgress', () => {
  it('mounts', () => {
    cy.mount(RplProgress, { props: { ...baseProps } })

    cy.get('.rpl-progress__title').should('contains.text', 'Test title')
  })

  it('allows a step to be set as the current step', () => {
    cy.mount(RplProgress, { props: { ...baseProps, currentStepId: 'test2' } })

    cy.get('.rpl-progress-step').as('steps')

    cy.get('.rpl-progress__subtitle').should('contains.text', 'Step 2 of 3')

    cy.get('@steps').eq(0).should('contains.text', 'Test item one')
    cy.get('@steps').eq(0).should('have.class', 'rpl-progress-step--complete')
    cy.get('@steps').eq(0).should('not.have.class', 'rpl-progress-step--active')

    cy.get('@steps').eq(1).should('contain', 'Test item two')
    cy.get('@steps')
      .eq(1)
      .should('not.have.class', 'rpl-progress-step--complete')
    cy.get('@steps').eq(1).should('have.class', 'rpl-progress-step--active')

    cy.get('@steps').eq(2).should('contains.text', 'Test item three')
    cy.get('@steps')
      .eq(2)
      .should('not.have.class', 'rpl-progress-step--complete')
    cy.get('@steps').eq(2).should('not.have.class', 'rpl-progress-step--active')
  })

  it('can be exanded/collapsed', () => {
    cy.mount(RplProgress, {
      props: { ...baseProps, currentStepId: 'test1', expandable: true }
    })
    cy.get('.rpl-progress__header').as('toggle')
    cy.get('.rpl-progress__steps').as('panel')
    cy.get('.rpl-progress-step').as('steps')

    cy.get('@steps').should('not.be.visible')
    cy.get('@toggle').should('have.attr', 'id', 'testId_toggle')
    cy.get('@toggle').should('have.attr', 'aria-expanded', 'false')
    cy.get('@toggle').should('have.attr', 'aria-controls', 'testId_panel')
    cy.get('@panel').should('have.attr', 'id', 'testId_panel')
    cy.get('@panel').should('have.attr', 'aria-labelledBy', 'testId_toggle')

    cy.get('@toggle').click()
    cy.get('@toggle').should('have.attr', 'aria-expanded', 'true')

    cy.get('@steps').should('be.visible')

    cy.get('@toggle').click()
    cy.get('@toggle').should('have.attr', 'aria-expanded', 'false')
  })
})
