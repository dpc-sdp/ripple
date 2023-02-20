import RplAlert from './RplAlert.vue'
import { rplEventBus } from './../../index.js'

const baseProps = {
  variant: 'information',
  iconName: 'icon-fire',
  message: 'This is a test alert, be alert but not alarmed',
  linkText: 'Find out more',
  linkUrl: '/',
  dismissed: false,
  alertId: '1234'
}

describe('RplAlert', () => {
  it('mounts', () => {
    cy.mount(RplAlert, {
      props: {
        ...baseProps
      }
    })
  })
  xit('calls dismiss when clicked', () => {
    let fired = false
    const handler = () => {
      fired = !fired
    }
    rplEventBus.on('rpl-alert/dismiss', handler)
    cy.mount(RplAlert, {
      props: {
        ...baseProps,
        dismissed: fired
      }
    })
    cy.get('[data-cy="dismiss"]')
    cy.wrap(fired).should('be.true')
    rplEventBus.off('rpl-alert/dismiss', handler)
  })
})
