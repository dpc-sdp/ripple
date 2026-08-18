import { test, expect } from '@playwright/experimental-ct-vue'
import DropdownWrapper from '../../playwright/DropdownWrapper.vue'
import { RplFormDropdownOptions } from '../../../ripple-ui-forms/src/components/RplFormDropdown/fixtures/sample'

const baseProps = {
  id: 'dropdown',
  labelId: 'dropdown',
  placeholder: 'Select',
  options: RplFormDropdownOptions
}

const selectors = {
  input: '.rpl-form-dropdown-input',
  menu: '.rpl-form-dropdown-menu',
  search: '.rpl-form-dropdown-search__input',
  option: '.rpl-form-dropdown-option',
  toggle: '.rpl-form-dropdown-input__toggle',
  moreLabel: '.rpl-form-dropdown__more-label',
  tagItem: '.rpl-form-dropdown__multi-value-tag-item:not([aria-hidden])'
}

const clickNTimes = async (component, n: number = 13) => {
  await component.locator(selectors.input).click()
  await component.locator(selectors.option).first().click()
  for (let i = 1; i < n; i++) {
    await component.locator(selectors.option).nth(i).click()
  }
  await component.locator(selectors.toggle).click()
}

test.describe(() => {
  test('mounts', async ({ mount }) => {
    const component = await mount(DropdownWrapper, { props: baseProps })
    await expect(component.locator('.rpl-form-dropdown')).toBeVisible()
  })

  test('can be toggled open and closed', async ({ mount }) => {
    const component = await mount(DropdownWrapper, { props: baseProps })

    await component.locator(selectors.input).click()
    await expect(component.locator(selectors.menu)).toBeVisible()

    await component.locator(selectors.input).click()
    await expect(component.locator(selectors.menu)).not.toBeAttached()
  })

  test('allows for single options to be selected', async ({ mount }) => {
    const component = await mount(DropdownWrapper, { props: baseProps })

    await component.locator(selectors.input).click()
    await component.getByRole('option', { name: 'Apple', exact: true }).click()
    // In this component combobox is not an input
    await component.getByRole('combobox').focus()
    await expect(component.locator(selectors.input)).toContainText('Apple')

    await component.locator(selectors.input).click()
    await component.getByRole('option', { name: 'Orange', exact: true }).click()
    await expect(component.getByRole('combobox')).toContainText('Orange')
  })

  test('allows for multiple options to be selected', async ({ mount }) => {
    const component = await mount(DropdownWrapper, {
      props: { ...baseProps, multiple: true }
    })

    await component.locator(selectors.input).click()
    await component.getByRole('option', { name: 'Apple', exact: true }).click()
    await component.getByRole('option', { name: 'Orange', exact: true }).click()

    const inputText = await component.locator(selectors.input).innerText()
    expect(inputText).toBe('Apple, Orange')
  })

  test('selected options are displayed in the order which they were selected', async ({
    mount
  }) => {
    const component = await mount(DropdownWrapper, {
      props: { ...baseProps, multiple: true }
    })

    await component.locator(selectors.input).click()
    await component.getByRole('option', { name: 'Apple', exact: true }).click()
    await component.getByRole('option', { name: 'Grapes', exact: true }).click()
    await component.getByRole('option', { name: 'Apricots', exact: true }).click()
    await component.getByRole('option', { name: 'Orange', exact: true }).click()

    const inputText = await component.locator(selectors.input).innerText()
    expect(inputText).toBe('Apple, Grapes, Apricots, Orange')
  })

  test.describe('at 960px viewport', () => {
    test.use({ viewport: { width: 960, height: 680 } })

    test('displays correct count at 960px', async ({ mount }) => {
      const component = await mount(DropdownWrapper, {
        props: { ...baseProps, multiple: true }
      })

      await clickNTimes(component)
      await expect(component.locator(selectors.moreLabel)).toContainText('+3 more')
    })
  })

  test.describe('at 746px viewport', () => {
    test.use({ viewport: { width: 746, height: 680 } })

    test('displays correct count at 746px', async ({ mount }) => {
      const component = await mount(DropdownWrapper, {
        props: { ...baseProps, multiple: true }
      })

      await clickNTimes(component)
      await expect(component.locator(selectors.moreLabel)).toContainText('+5 more')
    })
  })

  test.describe('at 480px viewport', () => {
    test.use({ viewport: { width: 480, height: 680 } })

    test('displays correct count at 480px', async ({ mount }) => {
      const component = await mount(DropdownWrapper, {
        props: { ...baseProps, multiple: true }
      })

      await clickNTimes(component)
      await expect(component.locator(selectors.moreLabel)).toContainText('+9 more')
    })
  })

  test.describe('at 370px viewport', () => {
    test.use({ viewport: { width: 370, height: 680 } })

    test('displays correct count at 370px', async ({ mount }) => {
      const component = await mount(DropdownWrapper, {
        props: { ...baseProps, multiple: true }
      })

      await clickNTimes(component)
      await expect(component.locator(selectors.moreLabel)).toContainText('+10 more')
    })
  })

  test('can be "searched" by typing from the input', async ({ mount, page }) => {
    const component = await mount(DropdownWrapper, { props: baseProps })

    await component.locator(selectors.input).focus()
    await page.keyboard.type('b')
    await expect(page.locator(':focus')).toContainText('Banana')

    await component.locator(selectors.input).focus()
    await page.keyboard.type('bl')
    await expect(page.locator(':focus')).toContainText('Blueberries')
  })

  test('can be "searched" by typing from an option', async ({ mount, page }) => {
    const component = await mount(DropdownWrapper, { props: baseProps })

    await component.locator(selectors.input).click()
    await component.locator(selectors.option).first().focus()
    await page.keyboard.type('apr')
    await expect(page.locator(':focus')).toContainText('Apricots')

    await component.locator(selectors.option).first().focus()
    await page.keyboard.type('l')
    await expect(page.locator(':focus')).toContainText('Lemon')
  })

  test('can be "traversed" by cycling through a single key stroke', async ({
    mount,
    page
  }) => {
    const component = await mount(DropdownWrapper, { props: baseProps })

    await component.locator(selectors.input).focus()
    await page.keyboard.type('a')
    await expect(page.locator(':focus')).toContainText('Apple')

    await page.locator(':focus').focus()
    await page.keyboard.type('a')
    await expect(page.locator(':focus')).toContainText('Apricots')

    await page.locator(':focus').focus()
    await page.keyboard.type('a')
    await expect(page.locator(':focus')).toContainText('Avocado')

    await page.locator(':focus').focus()
    await page.keyboard.type('a')
    await expect(page.locator(':focus')).toContainText('Apple')
  })

  test('can be navigated using the keyboard', async ({ mount, page }) => {
    const component = await mount(DropdownWrapper, { props: baseProps })

    const input = component.locator(selectors.input)
    await input.focus()
    await page.keyboard.press('ArrowDown')
    await expect(component.locator(selectors.menu)).toBeVisible()

    await expect(page.locator(':focus')).toContainText('Select')

    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')
    await expect(page.locator(':focus')).toContainText('Banana')

    await page.keyboard.press('ArrowUp')
    await expect(page.locator(':focus')).toContainText('Apple')

    await page.keyboard.press('ArrowUp')
    await expect(page.locator(':focus')).toContainText('Select')

    await page.keyboard.press('ArrowUp')
    await expect(page.locator(':focus')).toContainText('Select')

    await page.keyboard.press('Escape')
    await expect(component.locator(selectors.menu)).not.toBeAttached()
  })

  /* Searchable dropdowns (single) */
  test('single select can be searched', async ({ mount, page }) => {
    const component = await mount(DropdownWrapper, {
      props: { ...baseProps, searchable: true }
    })

    await component.locator(selectors.input).click()

    const search = component.locator(selectors.search)
    await expect(search).toBeFocused()
    await expect(component.locator(selectors.menu)).toBeVisible()
    await expect(component.locator(selectors.option)).toHaveCount(13)

    await search.focus()
    await page.keyboard.type('ap')
    await expect(component.locator(selectors.option)).toHaveCount(4)

    const options = component.locator(selectors.option)
    const count = await options.count()
    for (let i = 0; i < count; i++) {
      const text = await options.nth(i).textContent()
      expect(text?.toLowerCase()).toContain('ap')
    }
  })

  test('selecting a single option populates the search input', async ({
    mount
  }) => {
    const component = await mount(DropdownWrapper, {
      props: { ...baseProps, searchable: true }
    })

    await component.locator(selectors.input).click()
    await component.getByRole('option', { name: 'Orange', exact: true }).click()
    await expect(component.locator(selectors.input)).toContainText('Orange')

    await component.locator(selectors.input).click()
    await expect(component.locator(selectors.search)).toHaveValue('Orange')

    await component.getByRole('option', { name: 'Peach', exact: true }).click()
    await expect(component.locator(selectors.input)).toContainText('Peach')

    await component.locator(selectors.input).click()
    await expect(component.locator(selectors.search)).toHaveValue('Peach')
  })

  test('a partially cleared selected input with be restored when dropdown is closed', async ({
    mount
  }) => {
    const component = await mount(DropdownWrapper, {
      props: { ...baseProps, searchable: true }
    })

    await component.locator(selectors.input).click()
    await component.getByRole('option', { name: 'Lemon', exact: true }).click()

    await component.locator(selectors.input).click()
    await expect(component.locator(selectors.option)).toHaveCount(13)

    const search = component.locator(selectors.search)
    await search.press('Backspace')
    await search.press('Backspace')
    await search.press('Backspace')
    await expect(search).toHaveValue('Le')

    await expect(component.locator(selectors.option)).toHaveCount(3)
    const options = component.locator(selectors.option)
    const count = await options.count()
    for (let i = 0; i < count; i++) {
      const text = await options.nth(i).textContent()
      expect(text?.toLowerCase()).toContain('le')
    }

    await component.locator(selectors.toggle).click()
    await expect(component.locator(selectors.input)).toContainText('Lemon')

    await component.locator(selectors.toggle).click()
    await expect(search).toHaveValue('Lemon')
  })

  test('a completely cleared selected input will remove the selected value', async ({
    mount
  }) => {
    const component = await mount(DropdownWrapper, {
      props: { ...baseProps, searchable: true }
    })

    await component.locator(selectors.input).click()
    await component.getByRole('option', { name: 'Lemon', exact: true }).click()
    await expect(component.locator(selectors.input)).toContainText('Lemon')

    await component.locator(selectors.input).click()
    await component.locator(selectors.search).clear()
    await expect(component.locator(selectors.option)).toHaveCount(13)

    await component.locator(selectors.toggle).click()
    await expect(component.locator(selectors.input)).toContainText('Select')
  })

  test('a no results message is displayed', async ({ mount, page }) => {
    const component = await mount(DropdownWrapper, {
      props: { ...baseProps, searchable: true }
    })

    const input = component.locator(selectors.input)
    await input.focus()
    await page.keyboard.type('...')
    await expect(component.locator(selectors.menu)).toContainText('No results found')
  })

  test('a single matching result will be auto selected on enter', async ({
    mount,
    page
  }) => {
    const component = await mount(DropdownWrapper, {
      props: { ...baseProps, searchable: true }
    })

    await component.locator(selectors.input).click()
    await page.keyboard.type('pea')
    await page.keyboard.press('Enter')
    await expect(component.locator(selectors.input)).toContainText('Peach')
  })

  test('single select can be navigated using the keyboard', async ({
    mount,
    page
  }) => {
    const component = await mount(DropdownWrapper, {
      props: { ...baseProps, searchable: true }
    })

    const input = component.locator(selectors.input)
    await input.focus()
    await page.keyboard.press('ArrowDown')
    await expect(component.locator(selectors.search)).toBeFocused()

    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')
    await expect(page.locator(':focus')).toContainText('Banana')

    await page.keyboard.press('ArrowUp')
    await expect(page.locator(':focus')).toContainText('Apple')

    await page.keyboard.press('ArrowUp')
    await expect(component.locator(selectors.search)).toBeFocused()

    await page.keyboard.press('Escape')
    await expect(component.locator(selectors.menu)).not.toBeAttached()
  })

  /* Searchable dropdowns (multi) */
  test('multi select can be searched', async ({ mount, page }) => {
    const component = await mount(DropdownWrapper, {
      props: { ...baseProps, multiple: true, searchable: true }
    })

    await component.locator(selectors.input).click()

    const search = component.locator(selectors.search)
    await expect(search).toBeFocused()
    await expect(component.locator(selectors.menu)).toBeVisible()
    await expect(component.locator(selectors.option)).toHaveCount(13)

    await page.keyboard.type('be')
    await expect(component.locator(selectors.option)).toHaveCount(2)

    const options = component.locator(selectors.option)
    const count = await options.count()
    for (let i = 0; i < count; i++) {
      const text = await options.nth(i).textContent()
      expect(text?.toLowerCase()).toContain('be')
      await options.nth(i).click()
    }

    await expect(component.locator(selectors.tagItem).filter({ hasText: 'Blueberries' })).toBeVisible()
    await expect(component.locator(selectors.tagItem).filter({ hasText: 'Strawberry' })).toBeVisible()
    await expect(search).toHaveValue('be')

    await component.locator(selectors.toggle).click()
    await component.locator(selectors.toggle).click()
    await expect(component.locator(selectors.option)).toHaveCount(13)
  })

  test.describe('selecting multiple options with 480px viewport', () => {
    test.use({ viewport: { width: 480, height: 680 } })

    test('populates the tag list', async ({ mount }) => {
      const component = await mount(DropdownWrapper, {
        props: { ...baseProps, multiple: true, searchable: true }
      })

    const selection = [
      'Apple',
      'Banana',
      'Orange',
      'Blueberries',
      'Peach',
      'Lemon'
    ]

    await component.locator(selectors.input).click()

    for (const item of selection) {
      await component.getByRole('option', { name: item, exact: true }).click()
    }

    // The search input should remain visible
    const searchEl = component.locator(selectors.search)
    const box = await searchEl.boundingBox()
    expect(box).not.toBeNull()
    if (box) {
      const isVisible =
        box.y >= 0 &&
        box.x >= 0 &&
        box.y + box.height <= 680 &&
        box.x + box.width <= 480
      expect(isVisible).toBe(true)
    }

      // The full tag list is displayed while the dropdown is open
      for (const item of selection) {
        await expect(component.locator(selectors.tagItem).filter({ hasText: item })).toBeVisible()
      }
    })
  })

  test('selecting the only matching option clears the search input', async ({
    mount,
    page
  }) => {
    const component = await mount(DropdownWrapper, {
      props: { ...baseProps, multiple: true, searchable: true }
    })

    await component.locator(selectors.input).click()
    await page.keyboard.type('Gra')
    await page.keyboard.press('Enter')
    await expect(component.locator(selectors.tagItem)).toContainText('Grapes')
    await expect(component.locator(selectors.search)).toHaveValue('')
  })

  test('the search input can be cleared selecting an option', async ({
    mount,
    page
  }) => {
    const component = await mount(DropdownWrapper, {
      props: { ...baseProps, multiple: true, searchable: true, clearSearchOnSelect: true }
    })

    await component.locator(selectors.input).click()
    await page.keyboard.type('an')
    await component.getByRole('option', { name: 'Orange', exact: true }).click()
    await expect(component.locator(selectors.tagItem).filter({ hasText: 'Orange' })).toBeVisible()
    await expect(component.locator(selectors.search)).toHaveValue('')

    await page.keyboard.type('be')
    await component.getByRole('option', { name: 'Blueberries', exact: true }).click()
    await expect(component.locator(selectors.tagItem).filter({ hasText: 'Blueberries' })).toBeVisible()
    await expect(component.locator(selectors.search)).toHaveValue('')
  })

  test.describe('tags display at 960px viewport', () => {
    test.use({ viewport: { width: 960, height: 680 } })

    test('displays correct tag count', async ({ mount }) => {
      const component = await mount(DropdownWrapper, {
        props: {
          ...baseProps,
          multiple: true,
          searchable: true,
          options: [
            {
              id: 'bullace',
              value: 'bullace',
              label: 'Bullace damson plum'
            },
            ...RplFormDropdownOptions
          ]
        }
      })

      await component.locator(selectors.input).click()
      const allOptions = component.locator(selectors.option)
      const optionCount = await allOptions.count()
      for (let i = 0; i < optionCount; i++) {
        await allOptions.nth(i).click()
      }
      await component.locator(selectors.toggle).click()

      await expect(component.locator(selectors.moreLabel)).toContainText('+8 more')
    })
  })

  test.describe('tags display at 746px viewport', () => {
    test.use({ viewport: { width: 746, height: 680 } })

    test('displays correct tag count', async ({ mount }) => {
      const component = await mount(DropdownWrapper, {
        props: {
          ...baseProps,
          multiple: true,
          searchable: true,
          options: [
            {
              id: 'bullace',
              value: 'bullace',
              label: 'Bullace damson plum'
            },
            ...RplFormDropdownOptions
          ]
        }
      })

      await component.locator(selectors.input).click()
      const allOptions = component.locator(selectors.option)
      const optionCount = await allOptions.count()
      for (let i = 0; i < optionCount; i++) {
        await allOptions.nth(i).click()
      }
      await component.locator(selectors.toggle).click()

      await expect(component.locator(selectors.moreLabel)).toContainText('+10 more')
    })
  })

  test.describe('tags display at 480px viewport', () => {
    test.use({ viewport: { width: 480, height: 680 } })

    test('displays correct tag count', async ({ mount }) => {
      const component = await mount(DropdownWrapper, {
        props: {
          ...baseProps,
          multiple: true,
          searchable: true,
          options: [
            {
              id: 'bullace',
              value: 'bullace',
              label: 'Bullace damson plum'
            },
            ...RplFormDropdownOptions
          ]
        }
      })

      await component.locator(selectors.input).click()
      const allOptions = component.locator(selectors.option)
      const optionCount = await allOptions.count()
      for (let i = 0; i < optionCount; i++) {
        await allOptions.nth(i).click()
      }
      await component.locator(selectors.toggle).click()

      await expect(component.locator(selectors.moreLabel)).toContainText('+13 more')
    })
  })

  test.describe('tags display at 370px viewport', () => {
    test.use({ viewport: { width: 370, height: 680 } })

    test('displays correct tag count', async ({ mount }) => {
      const component = await mount(DropdownWrapper, {
        props: {
          ...baseProps,
          multiple: true,
          searchable: true,
          options: [
            {
              id: 'bullace',
              value: 'bullace',
              label: 'Bullace damson plum'
            },
            ...RplFormDropdownOptions
          ]
        }
      })

      await component.locator(selectors.input).click()
      const allOptions = component.locator(selectors.option)
      const optionCount = await allOptions.count()
      for (let i = 0; i < optionCount; i++) {
        await allOptions.nth(i).click()
      }
      await component.locator(selectors.toggle).click()

      await expect(component.locator(selectors.moreLabel)).toContainText('14 items')
    })
  })

  test('options can be managed via the tag list', async ({ mount }) => {
    const component = await mount(DropdownWrapper, {
      props: { ...baseProps, multiple: true, searchable: true }
    })

    const selection = ['Apple', 'Banana', 'Orange', 'Peach']

    await component.locator(selectors.input).click()

    for (const item of selection) {
      await component.getByRole('option', { name: item, exact: true }).click()
    }

    await component.locator(selectors.toggle).click()

    await expect(component.locator(selectors.tagItem)).toHaveCount(4)

    for (const item of selection) {
      await expect(component.locator(selectors.tagItem).filter({ hasText: item })).toBeVisible()
    }

    // Remove some options
    await component.locator(selectors.tagItem).filter({ hasText: 'Banana' }).click()
    await component.locator(selectors.tagItem).filter({ hasText: 'Orange' }).click()

    const remainingTags = component.locator(selectors.tagItem)
    const tagText = await remainingTags.allTextContents()
    expect(tagText.join()).not.toContain('Banana')
    expect(tagText.join()).not.toContain('Orange')
    expect(tagText.join()).toContain('Apple')
    expect(tagText.join()).toContain('Peach')

    await component.locator(selectors.tagItem).filter({ hasText: 'Apple' }).click()
    await component.locator(selectors.tagItem).filter({ hasText: 'Peach' }).click()

    await expect(component.locator(selectors.input)).toContainText('Select')
  })

  test('pressing delete on the multi select will auto select the last tag for deletion', async ({
    mount,
    page
  }) => {
    const component = await mount(DropdownWrapper, {
      props: { ...baseProps, searchable: true, multiple: true }
    })

    await component.locator(selectors.input).click()
    await component.locator(selectors.option).nth(0).click()
    await component.locator(selectors.toggle).click()

    // Pressing delete on an empty input focuses tags
    const input = component.locator(selectors.input)
    await input.focus()
    await page.keyboard.press('Delete')
    await expect(page.locator(':focus')).toContainText('Apple')

    // Focus returns to input when all tags are removed
    await page.keyboard.press('Delete')
    await expect(component.locator(selectors.search)).toBeFocused()
  })

  test('multi select can be navigated using the keyboard', async ({
    mount,
    page
  }) => {
    const component = await mount(DropdownWrapper, {
      props: { ...baseProps, searchable: true, multiple: true }
    })

    const input = component.locator(selectors.input)
    await input.focus()
    await page.keyboard.press('ArrowDown')
    await expect(component.locator(selectors.search)).toBeFocused()

    // Select options
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await page.keyboard.press('ArrowUp')
    await page.keyboard.press('Enter')

    // Return to search
    await page.keyboard.press('ArrowUp')
    await page.keyboard.press('ArrowUp')
    await expect(component.locator(selectors.search)).toBeFocused()

    // Manage tags
    await page.keyboard.press('ArrowLeft')
    await expect(page.locator(':focus')).toContainText('Banana')

    await page.keyboard.press('ArrowLeft')
    await expect(page.locator(':focus')).toContainText('Orange')
    await page.keyboard.press('Delete')

    await expect(page.locator(':focus')).toContainText('Apple')

    await page.keyboard.press('ArrowLeft')
    await expect(page.locator(':focus')).toContainText('Apple')

    await page.keyboard.press('ArrowRight')
    await expect(page.locator(':focus')).toContainText('Banana')

    await page.keyboard.press('ArrowRight')
    await expect(component.locator(selectors.search)).toBeFocused()

    await page.keyboard.type('ap')
    await page.keyboard.press('ArrowLeft')
    await page.keyboard.press('ArrowLeft')
    await page.keyboard.press('ArrowLeft')
    await expect(page.locator(':focus')).toContainText('Banana')
  })
})
