import { test, expect } from '@playwright/experimental-ct-vue'
import { defineComponent } from 'vue'
import RplPrimaryNav from './RplPrimaryNav.vue'
import { RplPrimaryNavItems } from './fixtures/sample'
import { bpMin } from '../../lib/breakpoints'

const props = {
  primaryLogo: {
    href: '#',
    altText: 'Logo'
  },
  items: RplPrimaryNavItems
}

const NavWithActionSlot = defineComponent({
  components: { RplPrimaryNav },
  data() {
    return { props }
  },
  template: `
          <RplPrimaryNav v-bind="props">
            <template #userAction>
              <a href="/login">Login</a>
            </template>
          </RplPrimaryNav>
        `
})

test.describe('RplPrimaryNav', () => {
  test('mounts', async ({ mount }) => {
    await mount(RplPrimaryNav, { props })
  })

  test.describe('Mobile', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: bpMin.s, height: 1000 })
    })

    test('toggles menu when menu button is clicked', async ({ mount }) => {
      const component = await mount(RplPrimaryNav, { props })

      const openMenu = component.locator('[aria-label="Open Menu"]')
      await expect(openMenu).toHaveAttribute('aria-expanded', 'false')
      await openMenu.click()

      const closeMenu = component.locator('[aria-label="Close Menu"]')
      const menuId = await closeMenu.getAttribute('aria-controls')
      const menu = component.locator(`#${menuId}`)

      await expect(menu).toBeVisible()
      await expect(closeMenu).toHaveAttribute('aria-expanded', 'true')

      await closeMenu.click()
      await expect(menu).toHaveCount(0)
    })

    test('tabs to an action when user actions are present', async ({
      mount,
      page
    }) => {
      const component = await mount(NavWithActionSlot, { props })

      await component.locator('[aria-label="Open Menu"]').focus()
      await page.keyboard.press('Enter')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')

      await expect(component.locator('a:focus')).toContainText('Login')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await expect(component.locator('button:focus')).toContainText(
        'First level A'
      )

      await page.keyboard.press('Shift+Tab')
      await page.keyboard.press('Shift+Tab')
      await expect(component.locator(':focus')).toContainText('Menu')
    })
  })

  test.describe('Desktop', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: bpMin.l, height: 1000 })
    })

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
      ).toBeHidden()
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
      await expect(component.locator(level(3))).toBeVisible()

      await component.locator(levelToggle(3)).first().click()
      await expect(component.locator(level(4))).toBeVisible()

      await component.locator(levelToggle(3)).first().click()
      await expect(component.locator(level(4))).toBeHidden()

      await component.locator(levelToggle(2)).first().click()
      await expect(component.locator(level(3))).toBeHidden()
    })

    test('toggles the display of the search form', async ({ mount }) => {
      const component = await mount(RplPrimaryNav, { props })

      const openSearch = component.locator('[aria-label="Open Search"]')
      await expect(openSearch).toContainText('Search')
      await expect(openSearch).toHaveAttribute('aria-expanded', 'false')
      await openSearch.click()

      const closeSearch = component.locator('[aria-label="Close Search"]')
      await expect(closeSearch).toContainText('Close')

      const searchId = await closeSearch.getAttribute('aria-controls')
      const search = component.locator(`#${searchId}`)

      await expect(search).toBeVisible()
      await expect(closeSearch).toHaveAttribute('aria-expanded', 'true')
      await expect(search.locator('input')).toBeFocused()

      await closeSearch.click()
      await expect(search).toBeHidden()
    })

    test('megamenu can be navigated with the keyboard', async ({
      mount,
      page
    }) => {
      const component = await mount(RplPrimaryNav, { props })

      await component.locator('button', { hasText: 'First level A' }).focus()
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
      await expect(page.locator('a:focus')).toContainText('First level A')

      // Navigate to 'sub' menu
      await page.keyboard.press('Tab')
      await page.keyboard.press('Enter')
      await page.keyboard.press('Tab')
      await expect(page.locator('a:focus')).toHaveText('Second level A')

      // Navigate to 'sub sub' menu
      await page.keyboard.press('Tab')
      await page.keyboard.press('Enter')
      await page.keyboard.press('Tab')
      await expect(page.locator('a:focus')).toContainText('Third level A')

      // Navigate back up through the levels
      await page.keyboard.press('Shift+Tab')
      await expect(page.locator('button:focus')).toContainText('Third level A')
      await page.keyboard.press('Shift+Tab')
      await page.keyboard.press('Shift+Tab')
      await expect(page.locator('button:focus')).toHaveText('Second level A')

      // Navigate out of the megamenu
      await page.keyboard.press('Shift+Tab')
      await page.keyboard.press('Shift+Tab')
      await expect(page.locator('button:focus')).toContainText('First level A')
      await expect(page.locator('button:focus')).toHaveAttribute(
        'aria-expanded',
        'false'
      )

      // And into the next top level item
      await page.keyboard.press('Tab')
      await expect(page.locator('button:focus')).toHaveAttribute(
        'aria-expanded',
        'false'
      )
      await expect(page.locator('button:focus')).toContainText('First level B')

      await page.keyboard.press('Enter')
      await expect(page.locator('button:focus')).toHaveAttribute(
        'aria-expanded',
        'true'
      )

      await page.keyboard.press('Tab')
      await expect(page.locator(':focus')).toContainText('Quick exit')

      const nextItem = component
        .locator('button', {
          hasText: 'First level B'
        })
        .first()
      await nextItem.click()
      await nextItem.focus()

      await page.keyboard.press('Enter')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')

      await expect(page.locator('button:focus')).toHaveText('Second level')

      // Switching open mega menus with clicks and tabs
      await component
        .locator('button', { hasText: 'First level D' })
        .first()
        .click()
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await expect(page.locator('button:focus')).toContainText('Second level D')
    })

    test('tabs to menu when user actions are present', async ({
      mount,
      page
    }) => {
      props.items.pop()
      const navProps = { ...props, items: props.items }

      const component = await mount(NavWithActionSlot, { props: navProps })

      await component
        .locator('button', { hasText: 'First level A' })
        .first()
        .focus()

      await page.keyboard.press('Enter')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')

      await expect(component.locator('a:focus')).toContainText('First level A')

      await page.keyboard.press('Shift+Tab')
      await expect(component.locator('button:focus')).toContainText(
        'First level A'
      )
    })
  })
})
