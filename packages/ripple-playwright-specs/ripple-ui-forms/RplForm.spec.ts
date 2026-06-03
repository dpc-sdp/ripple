import { test, expect } from '@playwright/experimental-ct-vue'
import RplForm from '../../ripple-ui-forms/src/components/RplForm/RplForm.vue'
import { schema } from '../../ripple-ui-forms/src/components/RplForm/fixtures/sample'

test.describe(() => {
  test('renders', async ({ mount }) => {
    const component = await mount(RplForm, {
      props: {
        id: 'test-form',
        schema
      }
    })
    await expect(component.locator('[name="name"]')).not.toBeDisabled()
    await expect(component.locator('[name="message"]')).not.toBeDisabled()
    await expect(component.locator('[name="colour"]')).not.toHaveAttribute(
      'aria-disabled',
      'true'
    )
    expect(await component.locator('[name="pet"]').all()).toHaveLength(2)
    await expect(component.locator('[name="terms"]')).not.toBeDisabled()
    await expect(component.locator('button[type="submit"]')).not.toBeDisabled()
    await expect(component.locator('button[type="reset"]')).not.toBeDisabled()
  })

  test('form is disabled while submitting', async ({ mount }) => {
    const component = await mount(RplForm, {
      props: {
        id: 'test-form',
        schema,
        submissionState: { status: 'submitting' }
      } as any
    })
    await expect(component.locator('[name="name"]')).toBeDisabled()
    await expect(component.locator('[name="message"]')).toBeDisabled()
    await expect(component.locator('[name="colour"]')).toHaveAttribute(
      'aria-disabled',
      'true'
    )
    expect(await component.locator('[name="pet"]').all()).toHaveLength(2)
    await expect(component.locator('[name="terms"]')).toBeDisabled()
    await expect(component.locator('button[type="submit"]')).toBeDisabled()
    await expect(component.locator('button[type="reset"]')).toBeDisabled()
  })
})
