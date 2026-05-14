import { expect, test } from '@playwright/experimental-ct-vue'
import RplAlert from './RplAlert.vue'

const baseProps = {
  variant: 'information' as const,
  iconName: 'icon-fire',
  message: 'This is a test alert, be alert but not alarmed',
  linkText: 'Find out more',
  linkUrl: '/',
  dismissed: false,
  alertId: '1234'
}

test.describe('RplAlert', () => {
  test('mounts', async ({ mount }) => {
    const component = await mount(RplAlert, { props: baseProps })

    await expect(component).toContainText(baseProps.message)
  })

  test('fires dismiss event when cleared', async ({ mount }) => {
    let dismissed = false

    const component = await mount(RplAlert, {
      props: {
        ...baseProps,
        onDismiss: () => {
          dismissed = true
        }
      }
    })

    await component.locator('.rpl-alert__btn-close').click()
    expect(dismissed).toBe(true)

    await component.update({ props: { ...baseProps, dismissed } })
    await expect(component.locator('rpl-alert')).toBeHidden()
  })
})
