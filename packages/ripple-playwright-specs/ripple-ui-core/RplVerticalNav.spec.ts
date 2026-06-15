import { test, expect } from '@playwright/experimental-ct-vue'
import RplVerticalNav from '../../ripple-ui-core/src/components/vertical-nav/RplVerticalNav.vue'
import {
  verticalNavExample1,
  verticalNavExample2,
  verticalNavExample3
} from './fixtures/vertical-nav'

const props = {
  title: 'Vertical Nav',
  items: verticalNavExample1
}

test.describe(() => {
  test('mounts', async ({ mount }) => {
    const component = await mount(RplVerticalNav, { props })
    await expect(component).toBeAttached()
  })

  test('top level items are highlighted when active and child items are displayed', async ({
    mount
  }) => {
    const component = await mount(RplVerticalNav, { props })

    const item = component.locator('.rpl-vertical-nav__list-item').first()
    const toggle = item.locator('.rpl-vertical-nav__toggle')
    const link = item.locator('.rpl-vertical-nav__item').first()

    await expect(link).toContainClass('rpl-vertical-nav__item--active')
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')

    await expect(
      item
        .locator(
          '.rpl-vertical-nav__list--level-2, .rpl-vertical-nav__list--level-3, .rpl-vertical-nav__list--level-4, .rpl-vertical-nav__list--level-5'
        )
        .first()
    ).toBeVisible()
  })

  test('deeply nested item is highlighted when active, and the parent items are expanded (toggleLevels: 3)', async ({
    mount
  }) => {
    const component = await mount(RplVerticalNav, {
      props: { ...props, items: verticalNavExample3, toggleLevels: 3 }
    })

    const link = component.getByRole('link', { name: 'NESTED_ACTIVE_TEST' })
    const toggle = component.getByLabel('Toggle NESTED_ACTIVE_TEST menu')
    await expect(link).toBeVisible()

    await expect(link).toContainClass('rpl-vertical-nav__item--active')
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(
      component.locator('.rpl-vertical-nav__list--level-5')
    ).toBeVisible()
  })

  test('deeply nested item is highlighted when active, and the parent items are expanded (toggleLevels: 2)', async ({
    mount
  }) => {
    const component = await mount(RplVerticalNav, {
      props: { ...props, items: verticalNavExample3, toggleLevels: 2 }
    })

    const link = component.getByRole('link', { name: 'NESTED_ACTIVE_TEST' })
    const item = link.locator('..')
    await expect(item).toBeVisible()
    const toggle = item.locator(
      '.rpl-vertical-nav__header > .rpl-vertical-nav__toggle'
    )

    await expect(link).toContainClass('rpl-vertical-nav__item--active')
    await expect(toggle).not.toBeAttached()
    await expect(
      component.locator('.rpl-vertical-nav__list--level-5')
    ).toBeVisible()
  })

  test('a deeply nested item is highlighted when active, and the parent items are expanded (toggleLevels: 1)', async ({
    mount
  }) => {
    const component = await mount(RplVerticalNav, {
      props: { ...props, items: verticalNavExample3, toggleLevels: 1 }
    })

    const link = component.getByRole('link', { name: 'NESTED_ACTIVE_TEST' })
    const item = link.locator('..')
    await expect(item).toBeVisible()
    const toggle = item.locator(
      '.rpl-vertical-nav__header > .rpl-vertical-nav__toggle'
    )

    await expect(link).toContainClass('rpl-vertical-nav__item--active')
    await expect(toggle).not.toBeAttached()
    await expect(
      component.locator('.rpl-vertical-nav__list--level-5')
    ).toBeVisible()
  })

  test('a deeply nested item is highlighted when active, and the parent items are expanded (toggleLevels: 0)', async ({
    mount
  }) => {
    const component = await mount(RplVerticalNav, {
      props: { ...props, items: verticalNavExample3, toggleLevels: 0 }
    })

    const link = component.getByRole('link', { name: 'NESTED_ACTIVE_TEST' })
    const item = link.locator('..')
    const toggle = item.locator(
      '.rpl-vertical-nav__header > .rpl-vertical-nav__toggle'
    )

    await expect(toggle).not.toBeAttached()
    await expect(link).toContainClass('rpl-vertical-nav__item--active')
  })

  test('toggles the display of top level nav items', async ({ mount }) => {
    const component = await mount(RplVerticalNav, {
      props: { ...props, items: verticalNavExample2 }
    })

    const item = component.locator('.rpl-vertical-nav__list-item').first()

    await expect(item.locator('.rpl-expandable')).toBeHidden()

    await item.locator('.rpl-vertical-nav__toggle').click()
    await expect(item.locator('.rpl-expandable')).toBeVisible()

    await expect(item.locator('.rpl-vertical-nav__list--level-5')).toBeVisible()
  })

  test('toggles the display of nav items to 3 levels', async ({ mount }) => {
    const component = await mount(RplVerticalNav, {
      props: { ...props, items: verticalNavExample2, toggleLevels: 3 }
    })

    const item = component.locator('.rpl-vertical-nav__list-item').first()

    await expect(item.getByLabel('Toggle Second level menu')).toBeHidden()

    await item.getByLabel('Toggle First level menu').click()
    await expect(item.getByLabel('Toggle Second level menu')).toBeVisible()

    await expect(
      item.getByLabel(
        'Toggle Third level link with some text that will need to wrap menu'
      )
    ).toBeHidden()

    await item.getByLabel('Toggle Second level menu').click()
    await expect(
      item.getByLabel(
        'Toggle Third level link with some text that will need to wrap menu'
      )
    ).toBeVisible()

    await item
      .getByLabel(
        'Toggle Third level link with some text that will need to wrap menu'
      )
      .click()
    await expect(
      item
        .locator(
          '.rpl-vertical-nav__list--level-4, .rpl-vertical-nav__list--level-5'
        )
        .first()
    ).toBeVisible()

    await item.getByLabel('Toggle First level menu').click()
    await expect(item.locator('.rpl-expandable').first()).toBeHidden()
  })
})
