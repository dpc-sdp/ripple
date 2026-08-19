import { test, expect } from '@playwright/experimental-ct-vue'
import RplLinkList from '../../../ripple-ui-core/src/components/link-list/RplLinkList.vue'
import RplLinkListItem from '../../../ripple-ui-core/src/components/link-list/RplLinkListItem.vue'

test.describe(() => {
  test('mounts when empty', async ({ mount }) => {
    const component = await mount(RplLinkList)
    await expect(component).toBeAttached()
  })

  test('mounts with slot contents', async ({ mount }) => {
    const component = await mount(RplLinkList, {
      slots: { default: 'testSlotContents' }
    })

    await expect(component.locator('.rpl-link-list')).toContainText(
      'testSlotContents'
    )
  })
})

test('RplLinkListItem mounts', async ({ mount }) => {
  const component = await mount(RplLinkListItem, {
    props: { url: '/test/url' },
    slots: { default: 'testSlotContents' }
  })

  await expect(component.locator('.rpl-link-list-item__link')).toContainText(
    'testSlotContents'
  )
  await expect(component.locator('.rpl-link-list-item__link')).toHaveAttribute(
    'href',
    '/test/url'
  )
})
