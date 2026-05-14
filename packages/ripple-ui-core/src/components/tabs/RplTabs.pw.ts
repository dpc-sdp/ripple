import { test, expect } from '@playwright/experimental-ct-vue'
import RplTabs from './RplTabs.vue'

const baseProps = {
  tabs: [
    { title: 'One', key: 'one' },
    { title: 'Two', key: 'two' }
  ],
  mode: 'horizontal'
}

test.describe('RplTabs', () => {
  test('mounts', async ({ mount }) => {
    await mount(RplTabs, { props: baseProps })
  })

  test('switches tabs when clicked', async ({ mount }) => {
    let changeArg: any

    const component = await mount(RplTabs, {
      props: {
        ...baseProps,
        activeTab: 'one',
        onToggleTab: (arg: any) => {
          changeArg = arg
        }
      }
    })

    await component.locator('.rpl-tab', { hasText: 'Two' }).click()

    expect(changeArg).toEqual({
      action: 'select',
      id: 'two',
      key: 'two',
      text: 'Two'
    })

    await component.update({ props: { ...baseProps, activeTab: changeArg.id } })
    await expect(component.locator('.rpl-tab--active')).toContainText('Two')
  })

  test('sets the correct default tab', async ({ mount }) => {
    const component = await mount(RplTabs, {
      props: { ...baseProps, activeTab: 'two' }
    })

    await expect(component.locator('.rpl-tab--active')).toContainText('Two')
  })
})
