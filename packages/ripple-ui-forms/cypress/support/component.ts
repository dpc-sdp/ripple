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

// Ensure global styles are loaded
import '@dpc-sdp/ripple-ui-core/style'
import '@dpc-sdp/ripple-ui-core/style/components'
import { plugin, defaultConfig } from '@formkit/vue'

import { mount } from 'cypress/vue'
import { h } from 'vue'
import RplFauxForm from './components/RplFauxForm.vue'

Cypress.Commands.add('mount', (component, options = {}) => {
  return mount(
    () => {
      return h(RplFauxForm, { component, componentProps: options.props })
    },
    {
      ...options,
      global: {
        plugins: [[plugin, defaultConfig]]
      }
    }
  )
})

// Example use:
// cy.mount(MyComponent)
