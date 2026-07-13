import { test, expect } from '@playwright/experimental-ct-vue'
import AutocompleteWrapper from '../../../playwright/AutocompleteWrapper.vue'

const baseProps = {
  id: 'autocomplete',
  labelId: 'autocomplete-label',
  placeholder: 'Search for a fruit'
}

// Locators
const _ = {
  input: '.rpl-form-autocomplete__input',
  menu: '.rpl-form-autocomplete__menu',
  option: '.rpl-form-autocomplete__menu-option',
  noResults: '.rpl-form-autocomplete__menu-noresults',
  clear: '[aria-label="Clear search"]'
}

test.describe(() => {
  test('renders with placeholder and correct initial state', async ({
    mount
  }) => {
    const component = await mount(AutocompleteWrapper, {
      props: baseProps
    })

    await expect(component.locator(_.input)).toHaveAttribute(
      'placeholder',
      'Search for a fruit'
    )
    await expect(component.locator(_.menu)).not.toBeAttached()
    await expect(component.locator(_.clear)).not.toBeAttached()
  })

  test('has basic display options that can be configured', async ({
    mount
  }) => {
    const component = await mount(AutocompleteWrapper, {
      props: {
        ...baseProps,
        disabled: true,
        iconPosition: 'left',
        placeholder: 'Search to start'
      }
    })

    await expect(component.locator(_.input)).toBeDisabled()
    await expect(component.locator(_.input)).toHaveAttribute(
      'placeholder',
      'Search to start'
    )
    await expect(
      component.locator('.rpl-form-autocomplete__icon')
    ).toBeAttached()
  })

  test('fetches and displays suggestions when typing', async ({
    mount,
    page
  }) => {
    const component = await mount(AutocompleteWrapper, {
      props: baseProps
    })

    await component.locator(_.input).focus()
    await page.keyboard.press('a')

    await expect(component.locator(_.menu)).toBeVisible()
    await expect(component.locator(_.option)).toHaveCount(4)
    await expect(component.locator(_.option).nth(0)).toContainText('Apple')
    await expect(component.locator(_.option).nth(1)).toContainText('Banana')

    await page.keyboard.press('t')

    await expect(component.locator(_.menu)).toBeVisible()
    await expect(component.locator(_.option)).toHaveCount(1)
    await expect(component.locator(_.option).nth(0)).toContainText('Date')
  })

  test('shows no results message when no matches found', async ({
    mount,
    page
  }) => {
    const component = await mount(AutocompleteWrapper, {
      props: {
        ...baseProps,
        showNoResults: true
      } as any
    })

    await component.getByRole('combobox').focus()
    await page.keyboard.press('x')
    await page.keyboard.press('y')
    await page.keyboard.press('z')

    await expect(component.locator(_.noResults)).toBeVisible()
    await expect(component.locator(_.noResults)).toContainText('No results')

    await component.locator(_.input).clear()
    await expect(component.locator(_.noResults)).not.toBeAttached()
  })

  test('allows selecting an option on click', async ({ mount, page }) => {
    const selectCalls: any[] = []
    const changeCalls: any[] = []

    const component = await mount(AutocompleteWrapper, {
      props: {
        ...baseProps,
        onSelectOption: (val: any) => selectCalls.push(val),
        onChange: (val: any) => changeCalls.push(val)
      } as any
    })

    await component.getByRole('combobox').focus()
    await page.keyboard.press('a')
    await component.locator(_.option).filter({ hasText: 'Apple' }).click()

    await expect(component.locator(_.menu)).not.toBeAttached()
    await expect(component.getByRole('combobox')).toHaveValue('Apple')

    expect(selectCalls).toHaveLength(1)
    expect(selectCalls[0]).toEqual({ id: 'apple', label: 'Apple' })
  })

  test('allows for navigation and option selection via keyboard', async ({
    mount,
    page
  }) => {
    const selectCalls: any[] = []

    const component = await mount(AutocompleteWrapper, {
      props: {
        ...baseProps,
        onSelectOption: (val: any) => selectCalls.push(val)
      } as any
    })

    await component.getByRole('combobox').focus()
    await page.keyboard.press('a')

    await page.keyboard.press('ArrowDown')
    await expect(component.locator(_.option).nth(0)).toHaveClass(
      /rpl-u-focusable--force-on/
    )

    await page.keyboard.press('ArrowDown')
    await expect(component.locator(_.option).nth(1)).toHaveClass(
      /rpl-u-focusable--force-on/
    )

    await page.keyboard.press('ArrowUp')
    await expect(component.locator(_.option).nth(0)).toHaveClass(
      /rpl-u-focusable--force-on/
    )

    await page.keyboard.press('Enter')

    await expect(component.locator(_.menu)).not.toBeAttached()
    await expect(component.getByRole('combobox')).toHaveValue('Apple')

    expect(selectCalls).toHaveLength(1)
    expect(selectCalls[0]).toEqual({ id: 'apple', label: 'Apple' })
  })

  test('can close the menu via the escape key', async ({ mount, page }) => {
    const component = await mount(AutocompleteWrapper, {
      props: baseProps
    })

    await component.locator(_.input).fill('a')
    await expect(component.locator(_.menu)).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(component.locator(_.menu)).not.toBeAttached()
  })

  test('clears the input when clear button is clicked', async ({
    mount,
    page
  }) => {
    const changeCalls: any[] = []

    const component = await mount(AutocompleteWrapper, {
      props: {
        ...baseProps,
        onChange: (val: any) => changeCalls.push(val)
      } as any
    })

    await component.getByRole('combobox').focus()
    await page.keyboard.type('apple')

    await component.locator(_.option).filter({ hasText: 'Apple' }).click()
    await expect(component.getByRole('combobox')).toHaveValue('Apple')

    await component.locator(_.clear).click()

    await expect(component.locator(_.input)).toHaveValue('')
    await expect(component.locator(_.clear)).not.toBeAttached()

    expect(changeCalls).toContainEqual(null)
  })

  test('emits onChange for every keystroke in free text mode', async ({
    mount,
    page
  }) => {
    const changeCalls: any[] = []

    const component = await mount(AutocompleteWrapper, {
      props: {
        ...baseProps,
        isFreeText: true,
        onChange: (val) => {
          console.log('typed', val)
          changeCalls.push(val)
        }
      } as any
    })

    await component.getByRole('combobox').focus()
    await page.keyboard.press('a')
    await page.keyboard.press('b')
    await page.keyboard.press('c')

    await expect(component.locator(_.clear)).not.toBeAttached()

    expect(changeCalls).toContainEqual('a')
    expect(changeCalls).toContainEqual('ab')
    expect(changeCalls).toContainEqual('abc')
  })

  test('can include an action button that emits the action event when clicked', async ({
    mount
  }) => {
    const actionCalls: any[] = []

    const component = await mount(AutocompleteWrapper, {
      props: {
        ...baseProps,
        showAction: true,
        actionLabel: 'Add new fruit',
        onActionClick: () => actionCalls.push(true)
      } as any
    })

    await component.getByRole('button', { name: 'Add new fruit' }).click()

    expect(actionCalls).toHaveLength(1)
  })

  // Playwright can't serialise function params from the spec, so the scenario
  // can be found in the wrapper component code as 'label-value'
  test('can render with custom suggestion labels and values', async ({
    mount,
    page
  }) => {
    const changeCalls: any[] = []

    const component = await mount(AutocompleteWrapper, {
      props: {
        ...baseProps,
        customScenario: 'label-value',
        onChange: (val) => changeCalls.push(val)
      } as any
    })

    await component.getByRole('combobox').focus()
    await page.keyboard.type('au')

    await component
      .locator(_.option)
      .filter({ hasText: 'Country: Australia' })
      .click()

    await expect(component.getByRole('combobox')).toHaveValue('Country - Australia')

    expect(changeCalls).toContainEqual({
      code: 'au',
      name: 'Australia'
    })
  })

  // Playwright can't serialise function params from the spec, so the scenario
  // can be found in the wrapper component code as 'no-results-slot'
  test('can render with a custom no results slot', async ({ mount, page }) => {
    const component = await mount(AutocompleteWrapper, {
      props: {
        ...baseProps,
        customScenario: 'no-results-slot',
        showNoResults: true
      } as any
    })

    await component.getByRole('combobox').focus()
    await page.keyboard.type('xyz')

    await expect(component.locator('.custom-no-results')).toContainText(
      'Nothing to see here'
    )
  })

  // Playwright can't serialise function params from the spec, so the scenario
  // can be found in the wrapper component code as 'suggestions-slot'
  test('can render with a custom suggestion slot', async ({ mount, page }) => {
    const component = await mount(AutocompleteWrapper, {
      props: {
        ...baseProps,
        customScenario: 'suggestions-slot'
      }
    })

    await component.getByRole('combobox').focus()
    await page.keyboard.press('o')

    await expect(component.locator(_.option)).toContainText('My custom One')
  })
})
