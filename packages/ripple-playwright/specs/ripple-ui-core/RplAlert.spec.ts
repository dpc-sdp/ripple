import { test, expect } from '@playwright/experimental-ct-vue'
import RplAlert from '../../../ripple-ui-core/src/components/alert/RplAlert.vue'

const props = {
  variant: 'information',
  iconName: 'icon-fire',
  message: 'This is a test alert, be alert but not alarmed',
  linkText: 'Find out more',
  linkUrl: '/',
  dismissed: false,
  alertId: '1234'
} as any

test.describe(() => {
  test('mounts', async ({ mount }) => {
    const component = await mount(RplAlert, {
      props
    })
    await expect(component).toBeVisible()
  })

  test('fires dismiss event when cleared', async ({ mount }) => {
    let dismissed = false
    const onDismiss = () => (dismissed = true)

    const component = await mount(RplAlert, {
      props: { ...props, onDismiss } as any
    })

    await component.locator('.rpl-alert__btn-close').click()
    expect(dismissed).toBeTruthy()
  })
})
