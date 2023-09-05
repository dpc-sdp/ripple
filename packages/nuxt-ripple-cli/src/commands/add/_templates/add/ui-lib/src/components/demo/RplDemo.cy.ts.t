---
to: src/components/demo/RplDemo.cy.ts
---
import RplDemo from './RplDemo.vue'

const baseProps = {
  id: '1234'
}

describe('RplDemo', () => {
  it('mounts', () => {
    cy.mount(RplDemo, {
      props: {
        ...baseProps
      }
    })
    cy.get('.rpl-demo').should('exist')
  })
})
