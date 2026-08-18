import { test, expect } from '@playwright/experimental-ct-vue'
import RplTabs from '../../../ripple-ui-core/src/components/tabs/RplTabs.vue'

const props = {
  tabs: [
    {
      title: 'One',
      key: 'one'
    },
    {
      title: 'Two',
      key: 'two'
    }
  ],
  mode: 'horizontal'
}

test.describe(() => {
  test('mounts', async ({ mount }) => {
    const component = await mount(RplTabs, { props })
    await expect(component).toBeAttached()
  })

  test('switches tabs when clicked', async ({ mount }) => {
    const calls: any[] = []

    const component = await mount(RplTabs, {
      props: {
        ...props,
        activeTab: 'one',
        [`onToggleTab`]: (...args) => calls.push(args[0])
      }
    })

    await component.getByRole('tab', { name: 'Two' }).click()

    expect(calls[0]).toEqual({
      action: 'select',
      id: 'two',
      key: 'two',
      text: 'Two'
    })
  })

  test('sets the correct default tab', async ({ mount }) => {
    const component = await mount(RplTabs, {
      props: { ...props, activeTab: 'two' }
    })

    await expect(component.locator('.rpl-tab--active')).toContainText('Two')
  })
})
