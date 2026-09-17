import { test, expect } from '@playwright/experimental-ct-vue'
import RplFormCounter from '../../../ripple-ui-forms/src/components/RplFormCounter/RplFormCounter.vue'

test.describe(() => {
  test('renders', async ({ mount }) => {
    const component = await mount(RplFormCounter, {
      props: {
        value: '',
        counterMin: 0,
        counterMax: 20
      } as any
    })
    await expect(component.locator('[data-cy="counter"]')).toHaveText(
      'You have 20 characters left'
    )
  })

  test('displays 0 characters left when at max', async ({ mount }) => {
    const component = await mount(RplFormCounter, {
      props: {
        value: 'Lorem',
        counterMax: 5
      } as any
    })
    await expect(component.locator('[data-cy="counter"]')).toHaveText(
      'You have 0 characters left'
    )
  })

  test('displays the remaining current count when below max', async ({
    mount
  }) => {
    const component = await mount(RplFormCounter, {
      props: {
        value: 'Lorem',
        counterMin: 0,
        counterMax: 10
      } as any
    })
    await expect(component.locator('[data-cy="counter"]')).toHaveText(
      'You have 5 characters left'
    )
  })

  test('displays the current count when under the minimum', async ({
    mount
  }) => {
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

  test('displays the current count when over the minimum', async ({
    mount
  }) => {
    const component = await mount(RplFormCounter, {
      props: {
        value: 'LoremIpsum',
        counterMin: 5
      } as any
    })
    await expect(component.locator('[data-cy="counter"]')).toHaveText(
      'You have 10 characters'
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

  test('displays 0 words left when at max', async ({ mount }) => {
    const component = await mount(RplFormCounter, {
      props: {
        type: 'word',
        value: 'one two three four five',
        counterMax: 5
      } as any
    })
    await expect(component.locator('[data-cy="counter"]')).toHaveText(
      'You have 0 words left'
    )
  })

  test('displays the remaining current word count when below max', async ({
    mount
  }) => {
    const component = await mount(RplFormCounter, {
      props: {
        type: 'word',
        value: 'one two',
        counterMax: 5
      } as any
    })
    await expect(component.locator('[data-cy="counter"]')).toHaveText(
      'You have 3 words left'
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
