import { expect, test } from '@playwright/experimental-ct-vue'
import RplAccordion from './RplAccordion.vue'
import defaultItemsFixture from './fixtures/default'

const baseProps = {
  title: 'Title',
  items: defaultItemsFixture,
  id: '1234'
}

test.describe('RplAccordion', () => {
  test('mounts', async ({ mount }) => {
    const component = await mount(RplAccordion, { props: baseProps })
    await expect(component.locator('.rpl-accordion__toggle-all')).toContainText(
      'Open all'
    )
  })

  test('allows individual accordion items to be toggled', async ({ mount }) => {
    const component = await mount(RplAccordion, { props: baseProps })

    const firstItem = component.locator('.rpl-accordion__item').first()

    await firstItem.locator('.rpl-accordion__item-toggle').click()
    await expect(
      firstItem.locator('.rpl-accordion__item-toggle')
    ).toHaveAttribute('aria-expanded', 'true')
    await expect(
      firstItem.locator('.rpl-accordion__item-content-inner')
    ).toBeVisible()
  })

  test('toggles all accordions when open/close all button is clicked', async ({
                                                                                mount
                                                                              }) => {
    const component = await mount(RplAccordion, { props: baseProps })

    await component.locator('.rpl-accordion__toggle-all').click()
    await expect(
      component.locator('.rpl-accordion__item-toggle[aria-expanded="true"]')
    ).toHaveCount(3)

    await component.locator('.rpl-accordion__toggle-all').click()
    await expect(
      component.locator('.rpl-accordion__item-toggle[aria-expanded="true"]')
    ).toHaveCount(0)
  })

  test('toggles the open/close all text when all items have been individually toggled', async ({
                                                                                                 mount
                                                                                               }) => {
    const component = await mount(RplAccordion, { props: baseProps })

    const toggles = await component.locator('.rpl-accordion__item-toggle').all()

    for (const toggle of toggles) {
      await toggle.click()
    }
    await expect(component.locator('.rpl-accordion__toggle-all')).toContainText(
      'Close all'
    )

    for (const toggle of toggles) {
      await toggle.click()
    }
    await expect(component.locator('.rpl-accordion__toggle-all')).toContainText(
      'Open all'
    )
  })

  test('shows numbered accordions', async ({ mount }) => {
    const component = await mount(RplAccordion, {
      props: { ...baseProps, numbered: true }
    })

    await expect(
      component.locator('.rpl-accordion__item-number').nth(0)
    ).toContainText('1')
    await expect(
      component.locator('.rpl-accordion__item-number').nth(1)
    ).toContainText('2')
    await expect(
      component.locator('.rpl-accordion__item-number').nth(2)
    ).toContainText('3')
  })
})
