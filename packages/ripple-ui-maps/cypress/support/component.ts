// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import { h } from 'vue'
import { mount } from 'cypress/vue'
import { RplIconSprite } from '@dpc-sdp/ripple-ui-core/vue'
// Ensure global styles are loaded
import '@dpc-sdp/ripple-ui-core/style'
import '@dpc-sdp/ripple-ui-core/style/components'
import registerRplMapsPlugin from '@dpc-sdp/ripple-ui-maps/plugin'
import RplFauxMap from './components/RplFauxMap.vue'

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to mount a Vue component.
       * @example cy.mount(MyComponent)
       */
      mount: typeof mount
      mountMap: (options?: any) => Chainable<any>
    }
  }
}

const RplAppWrapper = {
  components: { RplIconSprite },
  template: `<div style="margin: 1rem;">
    <RplIconSprite style="display: none;" />
    <slot></slot>
  </div>`
}

Cypress.Commands.add('mount', ((component: any, options: any = {}) => {
  return mount(() => {
    return h(RplAppWrapper, null, () =>
      h(component, { ...options.props }, { ...options.slots })
    )
  })
}) as typeof mount)

Cypress.Commands.add('mountMap', (options: any = {}) => {
  return mount(
    () => {
      return h(RplFauxMap, { componentProps: options.props })
    },
    {
      global: {
        plugins: [
          {
            install: (app) => registerRplMapsPlugin(app, {})
          }
        ]
      }
    }
  )
})

// Example use:
// cy.mount(MyComponent)
// cy.mountMap(props)
