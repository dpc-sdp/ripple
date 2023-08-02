// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/vue'
import { h } from 'vue'
import { RplIconSprite } from '@dpc-sdp/ripple-ui-core/vue'
// Ensure global styles are loaded
import '@dpc-sdp/ripple-ui-core/style'

const RplAppWrapper = {
  components: { RplIconSprite },
  template: `<div style="margin: 1rem;">
    <RplIconSprite style="display: none;" />
    <slot></slot>
  </div>`
}

Cypress.Commands.add('mount', (component: any, options = {}) => {
  return mount(() => {
    return h(RplAppWrapper, null, () =>
      h(component, { ...options.props }, { ...options.slots })
    )
  })
})

// Example use:
// cy.mount(MyComponent)
