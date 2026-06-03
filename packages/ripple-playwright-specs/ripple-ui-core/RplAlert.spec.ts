import { test, expect } from '@playwright/experimental-ct-vue'
import RplAlert from '../../ripple-ui-core/src/components/alert/RplAlert.vue'

const baseProps = {
  variant: 'information',
  iconName: 'icon-fire',
  message: 'This is a test alert, be alert but not alarmed',
  linkText: 'Find out more',
  linkUrl: '/',
  dismissed: false,
  alertId: '1234'
}

test.describe(() => {
  test('mounts', async ({ mount }) => {
    const component = await mount(RplAlert, {
      props: { ...baseProps }
    })
    await expect(component).toBeVisible()
  })

  // test('fires dismiss event when cleared', async ({ mount }) => {
  //   let dismissed = false
  //   const onDismiss = () => (dismissed = true)

  //   cy.mount(RplAlert as any, {
  //     props: {
  //       ...baseProps,
  //       onDismiss
  //     }
  //   })

  //   cy.get('.rpl-alert__btn-close').click()

  //   cy.wait(50).then(() => {
  //     cy.wrap(dismissed).should('be.true')
  //   })
  // })
})
