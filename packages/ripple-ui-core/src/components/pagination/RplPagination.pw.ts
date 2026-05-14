import { test, expect } from '@playwright/experimental-ct-vue'
import RplPagination from './RplPagination.vue'

const baseProps = {
  totalPages: 3,
  currentPage: 1,
  contentType: 'page'
}

const current = '[aria-current="true"]'
const next = `[aria-label="Go to next ${baseProps.contentType}"]`
const prev = `[aria-label="Go to previous ${baseProps.contentType}"]`

test.describe('RplPagination', () => {
  test('mounts', async ({ mount }) => {
    const component = await mount(RplPagination, { props: baseProps })

    await expect(component.locator('.rpl-pagination__list')).toBeVisible()
  })

  test('navigate to the next page', async ({ mount }) => {
    const component = await mount(RplPagination, { props: baseProps })

    await expect(component.locator(current)).toContainText('1')
    await component.locator(next).click()
    await expect(component.locator(current)).toContainText('2')
  })

  test('navigate to the previous page', async ({ mount }) => {
    const component = await mount(RplPagination, {
      props: { ...baseProps, currentPage: 3 }
    })

    await expect(component.locator(current)).toContainText('3')
    await component.locator(prev).click()
    await expect(component.locator(current)).toContainText('2')
  })

  test('hide and show next/prev buttons', async ({ mount }) => {
    const component = await mount(RplPagination, {
      props: { ...baseProps, totalPages: 2 }
    })

    await expect(component.locator(next)).toBeVisible()
    await expect(component.locator(prev)).toBeHidden()

    await component.locator(next).click()

    await expect(component.locator(prev)).toBeVisible()
    await expect(component.locator(next)).toBeHidden()
  })
})
