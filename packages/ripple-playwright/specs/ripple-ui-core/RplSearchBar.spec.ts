import { test, expect } from '@playwright/experimental-ct-vue'
import RplSearchBar from '../../../ripple-ui-core/src/components/search-bar/RplSearchBar.vue'
import { mockSuggestions } from './fixtures/search-bar'

const baseProps = {
  suggestions: mockSuggestions,
  id: 'search-bar'
}

test.describe(() => {
  test('opens', async ({ mount }) => {
    const component = await mount(RplSearchBar, {
      props: {
        ...baseProps
      }
    })

    await expect(component.locator('#search-bar__menu')).not.toBeAttached()
    await component.locator('#search-bar').click()
    await expect(component.locator('#search-bar__menu')).toBeAttached()
  })

  test('suggestion slot', async ({ mount }) => {
    const component = await mount(RplSearchBar, {
      props: {
        ...baseProps
      },
      slots: {
        suggestion: '<div>test - rip</div>'
      }
    })

    await component.locator('#search-bar').click()
    await expect(component.locator('[data-option-id="rip"]')).toContainText(
      'test - rip'
    )
  })

  test('updates', async ({ mount }) => {
    const calls: string[] = []

    const component = await mount(RplSearchBar, {
      props: {
        ...baseProps,
        'onUpdate:inputValue': (value: string) => calls.push(value)
      }
    })

    await expect(component.locator('.rpl-search-bar__clear')).not.toBeAttached()
    await component.locator('#search-bar').fill('rip')
    expect(calls).toContain('rip')
    await expect(component.locator('.rpl-search-bar__clear')).toBeAttached()
  })

  test('submits when enter is pressed', async ({ mount }) => {
    const calls: any[] = []

    const component = await mount(RplSearchBar, {
      props: {
        ...baseProps,
        onSubmit: (event: any) => calls.push(event)
      }
    })

    await component.locator('#search-bar').fill('ripple')
    await component.locator('#search-bar').press('Enter')

    expect(calls).toHaveLength(1)
    expect(calls[0]).toMatchObject({ value: 'ripple' })
  })

  test('submits when submit button is clicked', async ({ mount }) => {
    const calls: any[] = []

    const component = await mount(RplSearchBar, {
      props: {
        ...baseProps,
        onSubmit: (event: any) => calls.push(event)
      }
    })

    await component.locator('#search-bar').fill('ripp')
    await component.locator('button[type="submit"]').click()

    expect(calls).toHaveLength(1)
    expect(calls[0]).toMatchObject({ value: 'ripp' })
  })

  test('does not submit if suggestion selection is required and there are no suggestions', async ({
    mount
  }) => {
    const calls: any[] = []

    const component = await mount(RplSearchBar, {
      props: {
        ...baseProps,
        submitOnSuggestionOnly: true,
        onSubmit: (event: any) => calls.push(event),
        suggestions: []
      }
    })

    await component.locator('#search-bar').fill('ripx')
    await component.locator('#search-bar').press('Enter')
    expect(calls).toHaveLength(0)

    await component.locator('#search-bar').fill('ripz')
    await component.locator('#search-bar').press('Enter')
    expect(calls).toHaveLength(0)
  })

  test('auto submits with first suggestion when a suggestion selection is required', async ({
    mount
  }) => {
    const calls: any[] = []

    const component = await mount(RplSearchBar, {
      props: {
        ...baseProps,
        submitOnSuggestionOnly: true,
        onSubmit: (event: any) => calls.push(event),
        suggestions: ['ripple', 'riptide']
      }
    })

    await component.locator('#search-bar').fill('ripp')
    await component.locator('#search-bar').press('Enter')

    expect(calls).toHaveLength(1)
    expect(calls[0]).toMatchObject({ value: 'ripple' })
    await expect(component.locator('#search-bar')).toHaveValue('ripple')
  })
})
