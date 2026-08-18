import { test, expect } from '@playwright/experimental-ct-vue'
import RplFormDateRange from '../../../ripple-ui-forms/src/components/RplFormDateRange/RplFormDateRange.vue'

const baseProps = {
  id: 'date-range',
  name: 'date-range',
  label: 'Date range',
  fromLabel: 'From date',
  toLabel: 'To date',
  onChange: () => {}
}

test.describe(() => {
  test('mounts', async ({ mount }) => {
    const component = await mount(RplFormDateRange, { props: baseProps })

    await expect(component.getByText('From date')).toBeVisible()
    await expect(component.getByText('To date')).toBeVisible()
  })

  test('allows filling out from and to fields independently', async ({ mount }) => {
    const changeCalls: any[] = []

    const component = await mount(RplFormDateRange, {
      props: {
        ...baseProps,
        onChange: (val: any) => changeCalls.push(val)
      } as any
    })

    const fromInput = component.locator('input[type="date"]').first()
    const toInput = component.locator('input[type="date"]').last()

    await fromInput.fill('2025-01-22')
    expect(changeCalls).toContainEqual({
      from: '2025-01-22',
      to: ''
    })

    await toInput.fill('2025-01-28')
    expect(changeCalls).toContainEqual({
      from: '2025-01-22',
      to: '2025-01-28'
    })

    await fromInput.clear()
    expect(changeCalls).toContainEqual({
      from: '',
      to: '2025-01-28'
    })
  })

  test('updates min and max attributes accordingly', async ({ mount }) => {
    const component = await mount(RplFormDateRange, {
      props: {
        ...baseProps,
        min: '2025-01-22',
        max: '2026-12-31'
      } as any
    })

    const fromInput = component.locator('input[type="date"]').first()
    const toInput = component.locator('input[type="date"]').last()

    // Initial state
    await expect(fromInput).toHaveAttribute('min', '2025-01-22')
    await expect(fromInput).toHaveAttribute('max', '2026-12-31')
    await expect(toInput).toHaveAttribute('min', '2025-01-22')
    await expect(toInput).toHaveAttribute('max', '2026-12-31')

    // Setting 'from' date should update 'to' min value
    await fromInput.fill('2025-06-01')
    await expect(toInput).toHaveAttribute('min', '2025-06-01')

    // Setting 'to' date should update 'from' max value
    await toInput.fill('2026-07-13')
    await expect(fromInput).toHaveAttribute('max', '2026-07-13')
  })

  test('handles custom date formats', async ({ mount }) => {
    const changeCalls: any[] = []

    const component = await mount(RplFormDateRange, {
      props: {
        ...baseProps,
        onChange: (val: any) => changeCalls.push(val),
        dateFormat: 'dd/MM/yyyy',
        value: {
          from: '22/01/2025',
          to: '13/02/2025'
        }
      } as any
    })

    const fromInput = component.locator('input[type="date"]').first()
    const toInput = component.locator('input[type="date"]').last()

    await expect(fromInput).toHaveValue('2025-01-22')
    await expect(toInput).toHaveValue('2025-02-13')

    await fromInput.fill('2024-03-18')
    expect(changeCalls).toContainEqual({
      from: '18/03/2024',
      to: '13/02/2025'
    })

    await toInput.fill('2026-04-20')
    expect(changeCalls).toContainEqual({
      from: '18/03/2024',
      to: '20/04/2026'
    })
  })

  test('uses the supplied from value to set the from date', async ({ mount }) => {
    const component = await mount(RplFormDateRange, {
      props: {
        ...baseProps,
        value: {
          from: '2025-01-22'
        }
      } as any
    })

    const fromInput = component.locator('input[type="date"]').first()
    const toInput = component.locator('input[type="date"]').last()

    await expect(fromInput).toHaveValue('2025-01-22')
    await expect(toInput).toHaveValue('')
  })

  test('uses the supplied to value to set the to date', async ({ mount }) => {
    const component = await mount(RplFormDateRange, {
      props: {
        ...baseProps,
        value: {
          from: '',
          to: '2025-12-31'
        }
      } as any
    })

    const fromInput = component.locator('input[type="date"]').first()
    const toInput = component.locator('input[type="date"]').last()

    await expect(fromInput).toHaveValue('')
    await expect(toInput).toHaveValue('2025-12-31')
  })

  test('uses the supplied values to set the date fields', async ({ mount }) => {
    const component = await mount(RplFormDateRange, {
      props: {
        ...baseProps,
        value: {
          from: '2025-01-22',
          to: '2025-12-31'
        }
      } as any
    })

    const fromInput = component.locator('input[type="date"]').first()
    const toInput = component.locator('input[type="date"]').last()

    await expect(fromInput).toHaveValue('2025-01-22')
    await expect(toInput).toHaveValue('2025-12-31')
  })
})
