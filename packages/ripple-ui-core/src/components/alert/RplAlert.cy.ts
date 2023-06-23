import RplAlert from './RplAlert.vue'
import { rplEventBus as rplEvent } from './../../index.js'

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
      props: baseProps
    })
  })

  it('fires dismiss event when cleared', () => {
    let dismissed = false
    const onDismiss = () => (dismissed = true)

    cy.mount(RplAlert, {
      props: {
        ...baseProps,
        onDismiss
      }
    })

    rplEvent.on('rpl-alert/dismiss', onDismiss)

    cy.get('.rpl-alert__btn-close').click()

    cy.wait(50).then(() => {
      cy.wrap(dismissed).should('be.true')
    })

    rplEvent.off('rpl-alert/dismiss', onDismiss)
  })
})
