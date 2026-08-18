import { test, expect } from '@playwright/experimental-ct-vue'
import RplMediaEmbed from '../../../ripple-ui-core/src/components/media-embed/RplMediaEmbed.vue'

const props = {
  title: 'Media title',
  variant: 'complex',
  type: 'image',
  src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  dataContent: 'Content',
  allowFullscreen: true
} as any

test.describe(() => {
  test('mounts', async ({ mount }) => {
    const component = await mount(RplMediaEmbed, { props })
    await expect(component).toBeAttached()
  })

  test('toggles the display of more information', async ({ mount }) => {
    const component = await mount(RplMediaEmbed, { props })

    const toggle = component.locator('.rpl-media-embed__view-data-toggle')
    const content = component.locator(
      '.rpl-media-embed__view-data-content.rpl-expandable'
    )

    await expect(toggle).toContainText("View 'Media title' data")
    await expect(content).toBeHidden()

    await toggle.click()

    await expect(toggle).toContainText("Close 'Media title' data")
    await expect(content).toBeVisible()
  })

  test('display an image fullscreen', async ({ mount, page }) => {
    const component = await mount(RplMediaEmbed, { props })

    await component.locator('.rpl-media-embed__fullscreen-button').click()
    await expect(page.locator('.rpl-media-embed__modal')).toBeVisible()
    await page.locator('.rpl-media-embed__modal button').click()
    await expect(page.locator('.rpl-media-embed__modal')).not.toBeAttached()
  })
})
