import { test, expect } from '@playwright/experimental-ct-vue'
import { expectAll } from '../../../playwright/helpers'
import RplVerticalNav from './RplVerticalNav.vue'
import {
  verticalNavExample1,
  verticalNavExample2,
  verticalNavExample3
} from './fixtures/sample'

const props = {
  title: 'Vertical Nav',
  items: verticalNavExample1
}

const getActiveItem = (component: any) => {
  return component
    .locator('.rpl-vertical-nav__item')
    .filter({ hasText: 'NESTED_ACTIVE_TEST' })
    .locator('..')
}

test.describe('RplVerticalNav', () => {
  test('mounts', async ({ mount }) => {
    const component = await mount(RplVerticalNav, { props })

    expect(component).toContainText('Vertical Nav')
  })

  test('top level items are highlighted when active and child items are displayed', async ({
    mount
  }) => {
    const component = await mount(RplVerticalNav, { props })

    const item = component.locator('.rpl-vertical-nav__list-item').first()
    const toggle = item.locator('.rpl-vertical-nav__toggle').first()
    const link = item.locator('.rpl-vertical-nav__item').first()

    await expect(link).toContainClass('rpl-vertical-nav__item--active')
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expectAll(
      item.locator(
        '.rpl-vertical-nav__list--level-2, .rpl-vertical-nav__list--level-3, .rpl-vertical-nav__list--level-4, .rpl-vertical-nav__list--level-5'
      ),
      async (level) => expect(level).toBeVisible()
    )
  })

  test('deeply nested item is highlighted when active, and the parent items are expanded (toggleLevels: 3)', async ({
    mount
  }) => {
    const component = await mount(RplVerticalNav, {
      props: { ...props, items: verticalNavExample3, toggleLevels: 3 }
    })

    const activeLink = component
      .locator('.rpl-vertical-nav__item')
      .filter({ hasText: 'NESTED_ACTIVE_TEST' })

    await expect(activeLink).toBeVisible()
    await expect(activeLink).toContainClass('rpl-vertical-nav__item--active')

    const item = activeLink.locator('..')

    await expect(item).toBeVisible()
    await expect(item.locator('.rpl-vertical-nav__toggle')).toHaveAttribute(
      'aria-expanded',
      'true'
    )

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

    const item = getActiveItem(component)

    await expect(item).toBeVisible()
    await expect(item.locator('.rpl-vertical-nav__toggle')).toHaveCount(0)
    await expect(item.locator('> .rpl-vertical-nav__item')).toContainClass(
      'rpl-vertical-nav__item--active'
    )
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

    const item = getActiveItem(component)

    await expect(item).toBeVisible()
    await expect(item.locator('.rpl-vertical-nav__toggle')).toHaveCount(0)
    await expect(item.locator('> .rpl-vertical-nav__item')).toContainClass(
      'rpl-vertical-nav__item--active'
    )
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

    const item = getActiveItem(component)

    await expect(item.locator('.rpl-vertical-nav__toggle')).toHaveCount(0)
    await expect(item.locator('> .rpl-vertical-nav__item')).toContainClass(
      'rpl-vertical-nav__item--active'
    )
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

    await expect(
      item.locator('[aria-label="Toggle Second level menu"]')
    ).toBeHidden()

    await item.locator('[aria-label="Toggle First level menu"]').click()

    await expect(
      item.locator('[aria-label="Toggle Second level menu"]')
    ).toBeVisible()

    await expect(
      item.locator(
        '[aria-label="Toggle Third level link with some text that will need to wrap menu"]'
      )
    ).toBeHidden()

    await item.locator('[aria-label="Toggle Second level menu"]').click()

    await expect(
      item.locator(
        '[aria-label="Toggle Third level link with some text that will need to wrap menu"]'
      )
    ).toBeVisible()

    await item
      .locator(
        '[aria-label="Toggle Third level link with some text that will need to wrap menu"]'
      )
      .click()

    await expect(
      item
        .locator(
          '.rpl-vertical-nav__list--level-4, .rpl-vertical-nav__list--level-5'
        )
        .first()
    ).toBeVisible()

    await item.locator('[aria-label="Toggle First level menu"]').click()
    await expect(item.locator('> .rpl-expandable')).toHaveAttribute(
      'aria-hidden',
      'true'
    )
  })
})
