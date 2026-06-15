import { test, expect } from '@playwright/experimental-ct-vue'
import RplAccordion from '../../ripple-ui-core/src/components/accordion/RplAccordion.vue'
import defaultItemsFixture from './fixtures/accordion'

const props = {
  title: 'Title',
  items: defaultItemsFixture,
  id: '1234'
}

test.describe(() => {
  test('mounts', async ({ mount }) => {
    const component = await mount(RplAccordion, { props })
    await expect(component.locator('.rpl-accordion__toggle-all')).toContainText(
      'Open all'
    )
  })

  test('allows individual accordion items to be toggled', async ({ mount }) => {
    const component = await mount(RplAccordion, { props })
    const item = component.locator('.rpl-accordion__item').first()
    const toggle = item.locator('.rpl-accordion__item-toggle')
    await toggle.click()
    await expect(item.getByRole('region')).toBeVisible()
  })

  test('toggles all accordions when open/close all button is clicked', async ({
    mount
  }) => {
    const component = await mount(RplAccordion, { props })
    const toggleAll = component.locator('.rpl-accordion__toggle-all')
    expect(await component.getByRole('region').all()).toHaveLength(0)
    await toggleAll.click()
    expect(await component.getByRole('region').all()).toHaveLength(3)
    await toggleAll.click()
    expect(await component.getByRole('region').all()).toHaveLength(0)
  })

  test('toggles the open/close all text when all items have been individually toggled', async ({
    mount
  }) => {
    const component = await mount(RplAccordion, { props })
    const toggleAll = component.locator('.rpl-accordion__toggle-all')
    await toggleAll.click()
    expect(toggleAll).toContainText('Close all')
    await toggleAll.click()
    expect(toggleAll).toContainText('Open all')
  })

  test('shows numbered accordions', async ({ mount }) => {
    const component = await mount(RplAccordion, {
      props: { ...props, numbered: true }
    })
    const itemNumbers = component.locator('.rpl-accordion__item-number')
    for (let i = 0; i <= 2; i++) {
      expect(itemNumbers.nth(i)).toHaveText((i + 1).toString())
    }
  })
})
