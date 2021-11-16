/* global cy */

import { Then } from 'cypress-cucumber-preprocessor/steps'

Then(`the site header has custom background color`, () => {
  cy.get('.rpl-site-header__inner').should('have.css', 'background-color', 'rgb(78, 192, 141)')
})

Then(`the hero banner has text attached after`, () => {
  // Cypress doesn't support pseudo selectors
  // This is a workaround https://stackoverflow.com/a/55517628/1212791
  cy.get('.rpl-hero-banner').then($els => {
    // get Window reference from element
    const win = $els[0].ownerDocument.defaultView
    // use getComputedStyle to read the pseudo selector
    const before = win.getComputedStyle($els[0], 'after')
    // read the value of the `content` CSS property
    const contentValue = before.getPropertyValue('content')
    // the returned value will have double quotes around it, but this is correct
    expect(contentValue).to.eq('"Text from custom css"') // eslint-disable-line
  })
})
