import { test, expect } from '@playwright/experimental-ct-vue'
import { defineComponent } from 'vue'
import RplSearchBar from './RplSearchBar.vue'
import { mockSuggestions } from './fixtures'

const props = {
  id: 'search-bar',
  suggestions: mockSuggestions
}

test.describe('RplSearchBar', () => {
  test('opens', async ({ mount }) => {
    const component = await mount(RplSearchBar, { props: props })

    await expect(component.locator('#search-bar__menu')).toBeHidden()
    await component.locator('#search-bar').click()
    await expect(component.locator('#search-bar__menu')).toBeVisible()
  })

  test('suggestion slot', async ({ mount }) => {
    const component = await mount(
      defineComponent({
        components: { RplSearchBar },
        data() {
          return { props }
        },
        template: `
          <RplSearchBar v-bind="props">
            <template #suggestion="{ option }">
              test - {{ option.option }}
            </template>
          </RplSearchBar>
        `
      }),
      { props }
    )

    await component.locator('#search-bar').click()
    await expect(component.locator('[data-option-id="rip"]')).toContainText(
      'test - rip'
    )
  })

  test('updates', async ({ mount }) => {
    let changeValue: string | undefined

    const component = await mount(RplSearchBar, {
      props: {
        ...props,
        [`onUpdate:inputValue`]: (val: string) => {
          changeValue = val
        }
      }
    })

    await expect(component.locator('.rpl-search-bar__clear')).toBeHidden()
    await component.locator('#search-bar').fill('rip')
    expect(changeValue).toBe('rip')
    await expect(component.locator('.rpl-search-bar__clear')).toBeVisible()
  })

  test('submits when enter is pressed', async ({ mount }) => {
    let submitArg: any
    let submitCallCount = 0

    const component = await mount(RplSearchBar, {
      props: {
        ...props,
        onSubmit: (arg: any) => {
          submitArg = arg
          submitCallCount++
        }
      }
    })

    await component.locator('#search-bar').fill('ripple')
    await component.locator('#search-bar').press('Enter')

    expect(submitCallCount).toBe(1)
    expect(submitArg).toMatchObject({ value: 'ripple' })
  })

  test('submits when submit button is clicked', async ({ mount }) => {
    let submitArg: any
    let submitCallCount = 0

    const component = await mount(RplSearchBar, {
      props: {
        ...props,
        onSubmit: (arg: any) => {
          submitArg = arg
          submitCallCount++
        }
      }
    })

    await component.locator('#search-bar').fill('ripp')
    await component.locator('button[type="submit"]').click()

    expect(submitCallCount).toBe(1)
    expect(submitArg).toMatchObject({ value: 'ripp' })
  })

  test('does not submit if suggestion selection is required and there are no suggestions', async ({
    mount
  }) => {
    let submitCallCount = 0

    const component = await mount(RplSearchBar, {
      props: {
        ...props,
        submitOnSuggestionOnly: true,
        onSubmit: () => {
          submitCallCount++
        },
        suggestions: []
      }
    })

    await component.locator('#search-bar').fill('ripx')
    await component.locator('#search-bar').press('Enter')
    expect(submitCallCount).toBe(0)

    await component.locator('#search-bar').fill('ripz')
    await component.locator('#search-bar').press('Enter')
    expect(submitCallCount).toBe(0)
  })

  test('auto submits with first suggestion when a suggestion selection is required', async ({
    mount
  }) => {
    let submitArg: any
    let submitCallCount = 0

    const component = await mount(RplSearchBar, {
      props: {
        ...props,
        submitOnSuggestionOnly: true,
        onSubmit: (arg: any) => {
          submitArg = arg
          submitCallCount++
        },
        suggestions: ['ripple', 'riptide']
      }
    })

    await component.locator('#search-bar').fill('ripp')
    await component.locator('#search-bar').press('Enter')

    expect(submitCallCount).toBe(1)
    expect(submitArg).toMatchObject({ value: 'ripple' })
    await expect(component.locator('#search-bar')).toHaveValue('ripple')
  })
})
