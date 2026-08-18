import { test, expect } from '@playwright/experimental-ct-vue'
import RplFormAlert from '../../../ripple-ui-forms/src/components/RplFormAlert/RplFormAlert.vue'

test.describe(() => {
  test('renders', async ({ mount }) => {
    const component = await mount(RplFormAlert, {
      props: { title: 'Test title', status: 'success' }
    })
    await expect(component).toBeAttached()
  })
})
