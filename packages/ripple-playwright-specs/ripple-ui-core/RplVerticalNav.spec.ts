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

    const item = component
      .locator(
        ':has(.rpl-vertical-nav__list-item:has-text("NESTED_ACTIVE_TEST"))'
      )
      .first()
    await expect(item).toBeVisible()
    const toggle = item.locator('.rpl-vertical-nav__toggle').first()
    const link = component.getByRole('link', { name: 'NESTED_ACTIVE_TEST' })

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

    const item = component
      .locator(
        ':has(.rpl-vertical-nav__list-item:has-text("NESTED_ACTIVE_TEST"))'
      )
      .first()
    await expect(item).toBeVisible()
    const toggle = item.locator('.rpl-vertical-nav__toggle').first()
    const link = component.getByRole('link', { name: 'NESTED_ACTIVE_TEST' })

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

    const item = component
      .locator(
        ':has(.rpl-vertical-nav__list-item:has-text("NESTED_ACTIVE_TEST"))'
      )
      .first()
    await expect(item).toBeVisible()
    const toggle = item.getByLabel('Toggle First Level menu') //item.locator('.rpl-vertical-nav__toggle').first()
    const link = component.getByRole('link', { name: 'NESTED_ACTIVE_TEST' })

    await expect(link).toContainClass('rpl-vertical-nav__item--active')
    await expect(toggle).not.toBeAttached()
    await expect(
      component.locator('.rpl-vertical-nav__list--level-5')
    ).toBeVisible()

    // cy.get('.rpl-vertical-nav__list-item')
    //   .contains('NESTED_ACTIVE_TEST')
    //   .parent()
    //   .as('item')
    // cy.get('@item').should('be.visible')
    // cy.get('@item').find('.rpl-vertical-nav__toggle').should('not.exist')
    // cy.get('@item').find('.rpl-vertical-nav__item').as('link')

    // cy.get('@link').should('have.class', 'rpl-vertical-nav__item--active')

    // cy.get('.rpl-vertical-nav__list--level-5').should('be.visible')
  })

  // it('a deeply nested item is highlighted when active, and the parent items are expanded (toggleLevels: 0)', () => {
  //   cy.mount(RplVerticalNav as any, {
  //     props: { ...props, items: verticalNavExample3, toggleLevels: 0 }
  //   })

  //   cy.get('.rpl-vertical-nav__list-item')
  //     .contains('NESTED_ACTIVE_TEST')
  //     .parent()
  //     .as('item')
  //   cy.get('@item').find('.rpl-vertical-nav__toggle').should('not.exist')
  //   cy.get('@item').find('.rpl-vertical-nav__item').as('link')

  //   cy.get('@link').should('have.class', 'rpl-vertical-nav__item--active')
  // })

  // it('toggles the display of top level nav items', () => {
  //   cy.mount(RplVerticalNav as any, {
  //     props: { ...props, items: verticalNavExample2 }
  //   })

  //   cy.get('.rpl-vertical-nav__list-item').first().as('item')

  //   cy.get('@item').find('.rpl-expandable').should('be.hidden')

  //   cy.get('@item').find('.rpl-vertical-nav__toggle').click()
  //   cy.get('@item').find('.rpl-expandable').should('be.visible')

  //   cy.get('@item')
  //     .find('.rpl-vertical-nav__list--level-5')
  //     .should('be.visible')
  // })

  // it('toggles the display of nav items to 3 levels', () => {
  //   cy.mount(RplVerticalNav as any, {
  //     props: { ...props, items: verticalNavExample2, toggleLevels: 3 }
  //   })

  //   cy.get('.rpl-vertical-nav__list-item').first().as('item')

  //   cy.get('@item').within(() => {
  //     cy.get('[aria-label="Toggle Second level menu"]').should('be.hidden')
  //     cy.get('[aria-label="Toggle First level menu"]').click()
  //     cy.get('[aria-label="Toggle Second level menu"]').should('be.visible')
  //     cy.get(
  //       '[aria-label="Toggle Third level link with some text that will need to wrap menu"]'
  //     ).should('be.hidden')
  //     cy.get('[aria-label="Toggle Second level menu"]').click()
  //     cy.get(
  //       '[aria-label="Toggle Third level link with some text that will need to wrap menu"]'
  //     ).should('be.visible')
  //     cy.get(
  //       '[aria-label="Toggle Third level link with some text that will need to wrap menu"]'
  //     ).click()
  //     cy.get(
  //       '.rpl-vertical-nav__list--level-4, .rpl-vertical-nav__list--level-5'
  //     ).should('be.visible')

  //     cy.get('[aria-label="Toggle First level menu"]').click()
  //     cy.get('@item')
  //       .find('.rpl-vertical-nav__list--level-2')
  //       .should('be.hidden')
  //   })
  // })
})
