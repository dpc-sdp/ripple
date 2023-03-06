import { Then, When } from '@badeball/cypress-cucumber-preprocessor'

Then('the {string} modal should be {string}', (type: string, state: string) => {
  const check = state === 'visible' ? 'be.visible' : 'not.exist'

  cy.get(`.rpl-${type}__modal`).should(check)
})

When(
  'I click the {string} modal button {string}',
  (type: string, label: string) => {
    cy.get(`.rpl-${type}__modal`).as('modal')

    cy.get('@modal').within(() => {
      cy.get(`button`).contains(label).click()
    })
  }
)
