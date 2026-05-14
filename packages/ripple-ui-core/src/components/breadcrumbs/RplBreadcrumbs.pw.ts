import { test, expect } from '@playwright/experimental-ct-vue'
import RplBreadcrumbs from './RplBreadcrumbs.vue'
import { bpMin } from '../../lib/breakpoints'

const props = {
  items: [
    { text: 'Home', url: '/' },
    { text: 'About the VIC Government', url: '#' },
    { text: 'The state government', url: '#' },
    { text: 'Victoria is the state', url: '#' },
    { text: 'VIC government data', url: '#' }
  ]
}

test.describe('RplBreadcrumbs', () => {
  test('mounts', async ({ mount }) => {
    const component = await mount(RplBreadcrumbs, { props })

    await expect(component).toContainText('Home')
  })

  test('displays all breadcrumbs', async ({ mount, page }) => {
    await page.setViewportSize({ width: bpMin.xl, height: 1000 })
    const component = await mount(RplBreadcrumbs, { props })

    await expect(
      component.locator(
        '.rpl-breadcrumbs__item:not(.rpl-breadcrumbs__item--collapsed)'
      )
    ).toHaveCount(5)
  })

  test('collapsed breadcrumbs can be toggled', async ({ mount, page }) => {
    await page.setViewportSize({ width: bpMin.xl, height: 1000 })
    const component = await mount(RplBreadcrumbs, {
      props: { ...props, collapse: true }
    })

    await expect(
      component.locator(
        '.rpl-breadcrumbs__item:not(.rpl-breadcrumbs__item--collapsed)'
      )
    ).toHaveCount(2)

    await component.locator('.rpl-breadcrumbs__collapse-link-trigger').click()

    await expect(
      component.locator(
        '.rpl-breadcrumbs__item:not(.rpl-breadcrumbs__item--collapsed)'
      )
    ).toHaveCount(4)
  })

  test(`a custom number can be set to manage collapsed breadcrumbs (won't collapse)`, async ({
    mount,
    page
  }) => {
    await page.setViewportSize({ width: bpMin.xl, height: 1000 })
    const component = await mount(RplBreadcrumbs, {
      props: { ...props, collapse: true, displayBeforeCollapse: 4 }
    })

    await expect(
      component.locator(
        '.rpl-breadcrumbs__item:not(.rpl-breadcrumbs__item--collapsed)'
      )
    ).toHaveCount(4)

    await expect(
      component.locator('.rpl-breadcrumbs__collapse-link-trigger')
    ).toBeHidden()
  })

  test(`a custom number can be set to manage collapsed breadcrumbs (will collapse)`, async ({
    mount,
    page
  }) => {
    await page.setViewportSize({ width: bpMin.xl, height: 1000 })
    const component = await mount(RplBreadcrumbs, {
      props: {
        ...props,
        items: [...props.items, { text: 'Another item', url: '#' }],
        collapse: true,
        displayBeforeCollapse: 4
      }
    })

    await expect(
      component.locator(
        '.rpl-breadcrumbs__item:not(.rpl-breadcrumbs__item--collapsed)'
      )
    ).toHaveCount(2)

    await expect(
      component.locator('.rpl-breadcrumbs__collapse-link-trigger')
    ).toBeVisible()

    await component.locator('.rpl-breadcrumbs__collapse-link-trigger').click()

    await expect(
      component.locator(
        '.rpl-breadcrumbs__item:not(.rpl-breadcrumbs__item--collapsed)'
      )
    ).toHaveCount(5)
  })
})
