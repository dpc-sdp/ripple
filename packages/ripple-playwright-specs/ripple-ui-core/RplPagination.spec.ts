import { test, expect } from '@playwright/experimental-ct-vue'
import RplPagination from '../../ripple-ui-core/src/components/pagination/RplPagination.vue'

const props = {
  totalPages: 3,
  currentPage: 1,
  contentType: 'page'
}

const current = '[aria-current="true"]'
const next = `Go to next ${props.contentType}`
const prev = `Go to previous ${props.contentType}`

test.describe(() => {
  test('mounts', async ({ mount }) => {
    const component = await mount(RplPagination as any, { props })
    await expect(component).toBeAttached()
  })

  test('navigate to the next page', async ({ mount }) => {
    const component = await mount(RplPagination as any, { props })

    await expect(component.locator(current)).toContainText('1')
    await component.getByLabel(next).click()
    await expect(component.locator(current)).toContainText('2')
  })

  test('navigate to the previous page', async ({ mount }) => {
    const component = await mount(RplPagination as any, {
      props: { ...props, currentPage: 3 }
    })

    await expect(component.locator(current)).toContainText('3')
    await component.getByLabel(prev).click()
    await expect(component.locator(current)).toContainText('2')
  })

  test('hide and show next/prev buttons', async ({ mount }) => {
    const component = await mount(RplPagination as any, {
      props: { ...props, totalPages: 2 }
    })

    await expect(component.getByLabel(next)).toBeAttached()
    await expect(component.getByLabel(prev)).not.toBeAttached()

    await component.getByLabel(next).click()

    await expect(component.getByLabel(next)).not.toBeAttached()
    await expect(component.getByLabel(prev)).toBeAttached()
  })
})
