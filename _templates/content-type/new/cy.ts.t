---
to: examples/nuxt-app/test/features/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.ts
---

import { Then, Before, After } from '@badeball/cypress-cucumber-preprocessor'

Before({ tags: '@mockserver' }, () => {
  cy.log('the mock server has started')
  cy.task('startMockServer')
})

After({ tags: '@mockserver' }, () => {
  cy.log('the mock server has stopped')
  cy.task('stopMockServer')
})

Then('the title should be {string}', (title: string) => {
  cy.get('[data-cy="hero-title"]').should('have.text', title)
})
