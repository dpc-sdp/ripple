import { test, expect } from '@playwright/experimental-ct-vue'
import RplBreadcrumbs from '../../ripple-ui-core/src/components/breadcrumbs/RplBreadcrumbs.vue'
import { bpMin } from '../../ripple-ui-core/src/lib/breakpoints'

const items = [
  { text: 'Home', url: '/' },
  { text: 'About the VIC Government', url: '#' },
  { text: 'The state government', url: '#' },
  { text: 'Victoria is the state', url: '#' },
  { text: 'VIC government data', url: '#' }
]

test.use({ viewport: { width: bpMin.xl, height: 1000 } })

test.describe(() => {
  test('mounts', async ({ mount }) => {
    const component = await mount(RplBreadcrumbs, { props: { items } })
    await expect(component).toBeAttached()
  })

  test('displays all breadcrumbs', async ({ mount }) => {
    const component = await mount(RplBreadcrumbs, { props: { items } })
    await expect(
      component.locator(
        '.rpl-breadcrumbs__item:not(.rpl-breadcrumbs__item--collapsed)'
      )
    ).toHaveCount(5)
  })

  test('collapsed breadcrumbs can be toggled', async ({ mount }) => {
    const component = await mount(RplBreadcrumbs, {
      props: { items, collapse: true }
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
    mount
  }) => {
    const component = await mount(RplBreadcrumbs, {
      props: { items, collapse: true, displayBeforeCollapse: 4 }
    })

    await expect(
      component.locator(
        '.rpl-breadcrumbs__item:not(.rpl-breadcrumbs__item--collapsed)'
      )
    ).toHaveCount(4)

    expect(
      component.locator('.rpl-breadcrumbs__collapse-link-trigger')
    ).not.toBeAttached()
  })

  test(`a custom number can be set to manage collapsed breadcrumbs (will collapse)`, async ({
    mount
  }) => {
    const component = await mount(RplBreadcrumbs, {
      props: {
        items: [...items, { text: 'Another item', url: '#' }],
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
    ).toBeAttached()

    await component.locator('.rpl-breadcrumbs__collapse-link-trigger').click()

    await expect(
      component.locator(
        '.rpl-breadcrumbs__item:not(.rpl-breadcrumbs__item--collapsed)'
      )
    ).toHaveCount(5)
  })
})
