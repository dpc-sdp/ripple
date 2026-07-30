import { test, expect } from '@playwright/experimental-ct-vue'
import RplFormCounter from '../../ripple-ui-forms/src/components/RplFormCounter/RplFormCounter.vue'

test.describe(() => {
  test('renders', async ({ mount }) => {
    const component = await mount(RplFormCounter, {
      props: {
        value: 'Loem Ipsum',
        counterMin: 0,
        counterMax: 20
      } as any
    })
    await expect(component).toBeAttached()
  })

  test('displays the current count', async ({ mount }) => {
    const component = await mount(RplFormCounter, {
      props: {
        value: 'Lorem',
        counterMin: 0,
        counterMax: 10
      } as any
    })
    await expect(component.locator('[data-cy="counter"]')).toHaveText(
      'You have 5 characters'
    )
  })

  test('displays the current count when under the minimum', async ({ mount }) => {
    const component = await mount(RplFormCounter, {
      props: {
        value: 'Lorem',
        counterMin: 30
      } as any
    })
    await expect(component.locator('[data-cy="counter"]')).toHaveText(
      'You have 5 characters'
    )
  })

  test('displays how many characters over the maximum', async ({ mount }) => {
    const component = await mount(RplFormCounter, {
      props: {
        value: 'Lorem Ipsum Dol',
        counterMax: 10
      } as any
    })
    await expect(component.locator('[data-cy="counter"]')).toHaveText(
      'You have 5 characters too many'
    )
  })

  test('displays the word count when empty', async ({ mount }) => {
    const component = await mount(RplFormCounter, {
      props: {
        type: 'word',
        value: '',
        counterMax: 5
      } as any
    })
    await expect(component.locator('[data-cy="counter"]')).toHaveText(
      'You have 0 words'
    )
  })

  test('displays the word count error when below the minimum and invalid', async ({
    mount
  }) => {
    const component = await mount(RplFormCounter, {
      props: {
        type: 'word',
        value: 'Lorem Ipsum Dol',
        counterMin: 5,
        invalid: true
      }
    })
    await expect(component.locator('[data-cy="counter"]')).toHaveText(
      'You have 2 words too little'
    )
  })
})
