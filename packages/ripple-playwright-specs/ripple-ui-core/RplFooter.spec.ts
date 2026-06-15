import { test, expect } from '@playwright/experimental-ct-vue'
import RplFooter from '../../ripple-ui-core/src/components/footer/RplFooter.vue'
import { RplFooterLinks } from './fixtures/footer'
import { bpMin } from '@dpc-sdp/ripple-ui-core'

const props = {
  nav: RplFooterLinks
}

test.describe(() => {
  test('mounts', async ({ mount }) => {
    const component = await mount(RplFooter, { props })
    await expect(component).toBeAttached()
  })

  test.describe('using s breakpoint', () => {
    test.use({ viewport: { width: bpMin.s, height: 1000 } })

    test('allows menus to be toggled on small screens', async ({ mount }) => {
      const component = await mount(RplFooter, { props })

      const button = component
        .locator('.rpl-footer-nav-section__header-inner-button')
        .first()

      const menu = component.locator(
        `#${await button.getAttribute('aria-controls')}.rpl-expandable`
      )

      await button.click()
      await expect(menu).toBeVisible()

      await button.click()
      await expect(menu).toBeHidden()
    })
  })
})
