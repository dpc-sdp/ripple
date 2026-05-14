import { test, expect } from '@playwright/experimental-ct-vue'
import RplMediaEmbed from './RplMediaEmbed.vue'

const props = {
  title: 'Media title',
  variant: 'complex' as const,
  type: 'image' as const,
  src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  dataContent: 'Content',
  allowFullscreen: true
}

test.describe('RplMediaEmbed', () => {
  test('mounts', async ({ mount }) => {
    const component = await mount(RplMediaEmbed, { props })

    await expect(component).toContainText(props.title)
  })

  test('toggles the display of more information', async ({ mount, page }) => {
    page.setViewportSize({ width: 480, height: 720 })
    const component = await mount(RplMediaEmbed, { props })

    const toggle = component.locator('.rpl-media-embed__view-data-toggle')
    const content = component.locator('.rpl-media-embed__view-data-content')

    await expect(toggle).toContainText("View 'Media title' data")
    await expect(content).toBeHidden()

    await toggle.click()

    await expect(toggle).toContainText("Close 'Media title' data")
    await expect(content).toBeVisible()

    await toggle.click()
    await expect(toggle).toContainText("View 'Media title' data")
    await expect(content).toBeHidden()
  })

  test('display an image fullscreen', async ({ mount, page }) => {
    await mount(RplMediaEmbed, { props })

    await page.locator('.rpl-media-embed__fullscreen-button').click()
    await expect(page.locator('.rpl-media-embed__modal')).toBeVisible()

    await page.locator('.rpl-media-embed__modal button').click()
    await expect(page.locator('.rpl-media-embed__modal')).toBeHidden()
  })
})
