import { test, expect } from '@playwright/experimental-ct-vue'
import RplMapLayerList from '../../../ripple-ui-maps/src/components/layer-list/RplMapLayerList.vue'

const baseProps = {
  title: 'Test title',
  layers: [
    { id: 'testLayer1', label: 'Test layer One', image: '/test/img/one' },
    { id: 'testLayer2', label: 'Test layer Two', image: '/test/img/two' }
  ]
}

test.describe(() => {
  test('title can be customised', async ({ mount }) => {
    const component = await mount(RplMapLayerList, {
      props: { ...baseProps }
    })
    await expect(component.locator('.rpl-map-layer-list__trigger')).toHaveText(
      'Test title'
    )
  })

  test('can open the list to view layers', async ({ mount }) => {
    const component = await mount(RplMapLayerList, {
      props: { ...baseProps }
    })

    await expect(component.locator('.rpl-map-layer-list')).not.toBeVisible()
    await component.locator('.rpl-map-layer-list__trigger').click()
    await expect(component.locator('.rpl-map-layer-list')).toBeVisible()

    const items = component.locator('.rpl-map-layer-list-item')
    await expect(items.nth(0)).toHaveText('Test layer One')
    await expect(items.nth(1)).toHaveText('Test layer Two')
  })
})
