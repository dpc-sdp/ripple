import { test, expect } from '@playwright/experimental-ct-vue'
import RplFooter from './RplFooter.vue'
import { RplFooterLinks } from './fixtures/sample'
import { bpMin } from '../../lib/breakpoints'

const props = {
  nav: RplFooterLinks
}

test.describe('RplFooter', () => {
  test('mounts', async ({ mount }) => {
    const component = await mount(RplFooter, { props })

    expect(component).toContainText('State Government of Victoria')
  })

  test('allows menus to be toggled on small screens', async ({
    mount,
    page
  }) => {
    await page.setViewportSize({ width: bpMin.s, height: 1000 })
    const component = await mount(RplFooter, { props })

    const button = component
      .locator('.rpl-footer-nav-section__header-inner-button')
      .first()

    const id = await button.getAttribute('aria-controls')
    const menu = component.locator(`#${id}`)

    await button.click()
    await expect(menu).toBeVisible()

    await button.click()
    await expect(menu).toBeHidden()
  })
})
