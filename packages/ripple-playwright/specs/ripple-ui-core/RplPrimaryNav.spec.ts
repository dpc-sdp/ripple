import { test, expect } from '@playwright/experimental-ct-vue'
import RplPrimaryNav from '../../../ripple-ui-core/src/components/primary-nav/RplPrimaryNav.vue'
import { RplPrimaryNavItems } from './fixtures/primary-nav'

const props = {
  primaryLogo: {
    href: '#',
    altText: 'Logo'
  },
  items: RplPrimaryNavItems
}

test.describe(() => {
  test('mounts', async ({ mount }) => {
    const component = await mount(RplPrimaryNav, { props })
    await expect(component).toBeAttached()
  })

  test.describe('Mobile', () => {
    test.use({ viewport: { width: 576, height: 1000 } })

    test('toggles menu when menu button is clicked', async ({ mount }) => {
      const component = await mount(RplPrimaryNav, { props })

      const openMenu = component.getByLabel('Open Menu')
      await expect(openMenu).toHaveAttribute('aria-expanded', 'false')
      await openMenu.click()

      const closeMenu = component.getByLabel('Close Menu')
      const menuId = await closeMenu.getAttribute('aria-controls')
      const menu = component.locator(`#${menuId}`)

      await expect(menu).toBeVisible()
      await expect(closeMenu).toHaveAttribute('aria-expanded', 'true')

      await closeMenu.click()
      await expect(menu).not.toBeAttached()
    })

    test('tabs to an action when user actions are present', async ({
      mount,
      page
    }) => {
      const component = await mount(RplPrimaryNav, {
        props,
        slots: {
          userAction: '<a href="/login">Login</a>'
        }
      })

      const openMenu = component.getByLabel('Open Menu')
      await expect(openMenu).toBeVisible()
      await openMenu.focus()

      await page.keyboard.press('Enter')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')

      await expect(page.locator(':focus')).toHaveRole('link')
      await expect(page.locator(':focus')).toContainText('Login')

      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')

      await expect(page.locator(':focus')).toHaveRole('button')
      await expect(page.locator(':focus')).toContainText('First level A')

      await page.keyboard.press('Shift+Tab')
      await page.keyboard.press('Shift+Tab')

      await expect(page.locator(':focus')).toContainText('Menu')
    })
  })

  test.describe('Desktop', () => {
    test.use({ viewport: { width: 992, height: 1000 } })

    test('toggles the menu items submenu', async ({ mount }) => {
      const component = await mount(RplPrimaryNav, { props })

      const toggle = component
        .locator(
          '.rpl-primary-nav__nav-bar-item .rpl-primary-nav__nav-bar-action--toggle'
        )
        .first()

      await expect(toggle).toHaveAttribute('aria-expanded', 'false')

      await toggle.click()
      await expect(
        component.locator('.rpl-primary-nav__mega-menu')
      ).toBeVisible()
      await expect(toggle).toHaveAttribute('aria-expanded', 'true')

      await toggle.click()
      await expect(
        component.locator('.rpl-primary-nav__mega-menu')
      ).not.toBeAttached()
      await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    })

    test('navigates through mega menu sub levels', async ({ mount }) => {
      const component = await mount(RplPrimaryNav, { props })

      const level = (val: number) =>
        `.rpl-primary-nav__mega-menu-list--level-${val}`
      const levelToggle = (val: number) =>
        `${level(val)} .rpl-primary-nav__mega-menu-action--toggle`

      await component
        .locator(
          '.rpl-primary-nav__nav-bar-item .rpl-primary-nav__nav-bar-action--toggle'
        )
        .first()
        .click()

      await component.locator(levelToggle(2)).first().click()
      await expect(component.locator(level(3))).toBeAttached()

      await component.locator(levelToggle(3)).first().click()
      await expect(component.locator(level(4))).toBeAttached()

      await component.locator(levelToggle(3)).first().click()
      await expect(component.locator(level(4))).not.toBeAttached()

      await component.locator(levelToggle(2)).first().click()
      await expect(component.locator(level(3))).not.toBeAttached()
    })

    test('toggles the display of the search form', async ({ mount }) => {
      const component = await mount(RplPrimaryNav, { props })

      const openSearch = component.getByLabel('Open Search')
      await expect(openSearch).toContainText('Search')
      await expect(openSearch).toHaveAttribute('aria-expanded', 'false')
      await openSearch.click()

      const closeSearch = component.getByLabel('Close Search')
      await expect(closeSearch).toContainText('Close')

      const searchId = await closeSearch.getAttribute('aria-controls')
      const search = component.locator(`#${searchId}`)

      await expect(search).toBeVisible()
      await expect(closeSearch).toHaveAttribute('aria-expanded', 'true')
      await expect(search.locator('input')).toBeFocused()

      await closeSearch.click()
      await expect(search).not.toBeAttached()
    })

    test('megamenu can be navigated with the keyboard', async ({
      mount,
      page
    }) => {
      const component = await mount(RplPrimaryNav, { props })

      const firstLevelA = component.getByRole('button', {
        name: 'First level A'
      })
      await expect(firstLevelA).toBeVisible()
      await firstLevelA.focus()
      await expect(page.locator(':focus')).toHaveAttribute(
        'aria-expanded',
        'false'
      )

      await page.keyboard.press('Enter')
      await expect(page.locator(':focus')).toHaveAttribute(
        'aria-expanded',
        'true'
      )

      // Get into megamenu
      await page.keyboard.press('Tab')
      await expect(page.locator(':focus')).toContainText('Quick exit')
      await page.keyboard.press('Tab')
      await expect(page.locator(':focus')).toHaveRole('link')
      await expect(page.locator(':focus')).toContainText('First level A')

      // Navigate to 'sub' menu
      await page.keyboard.press('Tab')
      await page.keyboard.press('Enter')
      await page.keyboard.press('Tab')
      await expect(page.locator(':focus')).toHaveRole('link')
      await expect(page.locator(':focus')).toHaveText('Second level A')

      // Navigate to 'sub sub' menu
      await page.keyboard.press('Tab')
      await page.keyboard.press('Enter')
      await page.keyboard.press('Tab')
      await expect(page.locator(':focus')).toHaveRole('link')
      await expect(page.locator(':focus')).toContainText('Third level A')

      // Navigate back up through the levels
      await page.keyboard.press('Shift+Tab')
      await expect(page.locator(':focus')).toHaveRole('button')
      await expect(page.locator(':focus')).toContainText('Third level A')

      await page.keyboard.press('Shift+Tab')
      await page.keyboard.press('Shift+Tab')
      await expect(page.locator(':focus')).toHaveRole('button')
      await expect(page.locator(':focus')).toHaveText('Second level A')

      // Navigate out of the megamenu
      await page.keyboard.press('Shift+Tab')
      await page.keyboard.press('Shift+Tab')
      await expect(page.locator(':focus')).toHaveRole('button')
      await expect(page.locator(':focus')).toContainText('First level A')
      await expect(page.locator(':focus')).toHaveAttribute(
        'aria-expanded',
        'false'
      )

      // And into the next top level item
      await page.keyboard.press('Tab')
      await expect(page.locator(':focus')).toHaveAttribute(
        'aria-expanded',
        'false'
      )
      await expect(page.locator(':focus')).toHaveRole('button')
      await expect(page.locator(':focus')).toContainText('First level B')

      await page.keyboard.press('Enter')
      await expect(page.locator(':focus')).toHaveAttribute(
        'aria-expanded',
        'true'
      )

      await page.keyboard.press('Tab')
      await expect(page.locator(':focus')).toContainText('Quick exit')

      const nextItem = component.getByRole('button', {
        name: 'First level B will go over two lines'
      })
      await nextItem.click()
      await nextItem.focus()

      await page.keyboard.press('Enter')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')

      await expect(page.locator(':focus')).toHaveRole('button')
      await expect(page.locator(':focus')).toHaveText('Second level')

      // Switching open mega menus with clicks and tabs
      const lastItem = component.getByRole('button', { name: 'First level D' })
      await lastItem.click()
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await expect(page.locator(':focus')).toHaveRole('button')
      await expect(page.locator(':focus')).toContainText('Second level D')
    })

    test('tabs to menu when user actions are present', async ({
      mount,
      page
    }) => {
      const itemsCopy = [...RplPrimaryNavItems]
      itemsCopy.pop()

      const component = await mount(RplPrimaryNav, {
        props: {
          ...props,
          items: itemsCopy
        },
        slots: {
          userAction: '<a href="/login">Login</a>'
        }
      })

      const firstLevelA = component.getByRole('button', {
        name: 'First level A'
      })
      await expect(firstLevelA).toBeVisible()
      await firstLevelA.focus()

      await page.keyboard.press('Enter')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')

      await expect(page.locator(':focus')).toHaveRole('link')
      await expect(page.locator(':focus')).toContainText('First level A')

      await page.keyboard.press('Shift+Tab')
      await expect(page.locator(':focus')).toHaveRole('button')
      await expect(page.locator(':focus')).toContainText('First level A')
    })
  })
})
