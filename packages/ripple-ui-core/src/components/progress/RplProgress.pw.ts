import { expect, test } from '@playwright/experimental-ct-vue'
import RplProgress from './RplProgress.vue'

const baseProps = {
  id: 'testId',
  title: 'Test title',
  currentStepId: 'test1',
  steps: [
    { id: 'test1', label: 'Test item one' },
    { id: 'test2', label: 'Test item two' },
    { id: 'test3', label: 'Test item three' }
  ]
}

test.describe('RplProgress', () => {
  test('mounts', async ({ mount }) => {
    const component = await mount(RplProgress, { props: baseProps })

    await expect(component.locator('.rpl-progress__title')).toContainText(
      'Test title'
    )
  })

  test('allows a step to be set as the current step', async ({ mount }) => {
    const component = await mount(RplProgress, {
      props: { ...baseProps, currentStepId: 'test2' }
    })

    await expect(component.locator('.rpl-progress__subtitle')).toContainText(
      'Step 2 of 3'
    )

    const steps = component.locator('.rpl-progress-step')

    await expect(steps.nth(0)).toContainText('Test item one')
    await expect(steps.nth(0)).toContainClass('rpl-progress-step--complete')
    await expect(steps.nth(0)).not.toContainClass('rpl-progress-step--active')

    await expect(steps.nth(1)).toContainText('Test item two')
    await expect(steps.nth(1)).not.toContainClass('rpl-progress-step--complete')
    await expect(steps.nth(1)).toContainClass('rpl-progress-step--active')

    await expect(steps.nth(2)).toContainText('Test item three')
    await expect(steps.nth(2)).not.toContainClass('rpl-progress-step--complete')
    await expect(steps.nth(2)).not.toContainClass('rpl-progress-step--active')
  })

  test('can be exanded/collapsed', async ({ mount }) => {
    const component = await mount(RplProgress, {
      props: { ...baseProps, currentStepId: 'test1', expandable: true }
    })

    const toggle = component.locator('.rpl-progress__header')
    const panel = component.locator('.rpl-progress__steps')

    await expect(
      component.locator('.rpl-progress-step').first()
    ).not.toBeVisible()
    await expect(toggle).toHaveAttribute('id', 'testId_toggle')
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(toggle).toHaveAttribute('aria-controls', 'testId_panel')
    await expect(panel).toHaveAttribute('id', 'testId_panel')
    await expect(panel).toHaveAttribute('aria-labelledBy', 'testId_toggle')

    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(component.locator('.rpl-progress-step').first()).toBeVisible()

    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
})
