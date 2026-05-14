import { test, expect } from '@playwright/experimental-ct-vue'
import RplLinkList from './RplLinkList.vue'
import RplLinkListItem from './RplLinkListItem.vue'

const testSlotContent = 'Test slot content'

test.describe('RplLinkList', () => {
  test('mounts when empty', async ({ mount }) => {
    await mount(RplLinkList)
  })

  test('mounts with slot contents', async ({ mount }) => {
    const component = await mount(RplLinkList, {
      slots: { default: testSlotContent }
    })

    await expect(component).toContainText(testSlotContent)
  })
})

test.describe('RplLinkListItem', () => {
  test('mounts', async ({ mount }) => {
    const component = await mount(RplLinkListItem, {
      props: { url: '/test/url' },
      slots: { default: testSlotContent }
    })

    await expect(component).toContainText(testSlotContent)
    await expect(
      component.locator('.rpl-link-list-item__link')
    ).toHaveAttribute('href', '/test/url')
  })
})
