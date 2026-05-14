import { expect, test } from '@playwright/experimental-ct-vue'
import RplDataTable from './RplDataTable.vue'
import {
  RplDataTableColumns,
  RplDataTableColumnsCustom,
  RplDataTableItems,
  RplDataTableItemsCustom,
  RplDataTableItemsSimple,
  RplDataTableMixedColumns,
  RplDataTableMixedItems
} from './fixtures/sample'
import { bpMin } from '@dpc-sdp/ripple-ui-core'
import { expectAll } from '../../../playwright/helpers'

const props = {
  showExtraContent: true,
  columns: RplDataTableColumns,
  items: RplDataTableItems
}

const title = ['Time frame', 'Budget', 'Risk']
const headings = [
  'Design ideas',
  'Co-design solutions',
  'Single solution',
  'Development'
]
const values = [
  ['2-4 weeks', '8-10 weeks', '12 weeks', '16 weeks'],
  ['$50k', '$60k', '$100k', '$125k'],
  ['High', 'Medium', 'Low', 'High']
]

test.describe('RplDataTable', () => {
  test('mounts', async ({ mount }) => {
    const component = await mount(RplDataTable, { props })

    await expect(component).toContainText('R1 - C1')
  })

  test('toggles the display of more information', async ({ mount }) => {
    const component = await mount(RplDataTable, { props })

    const row = component.locator('.rpl-data-table__row').first()
    const toggle = row.locator('.rpl-data-table-toggle')
    const details = row.locator('.rpl-data-table__details')

    await expect(details).toBeHidden()
    await expect(toggle).toContainText('More info')

    await toggle.click()

    await expect(details).toBeVisible()
    await expect(toggle).toContainText('Less info')

    await toggle.click()
    await expect(toggle).toContainText('More info')
  })

  test('sets the scope correctly for horizontal headings', async ({
    mount,
    page
  }) => {
    await page.setViewportSize({ width: bpMin.l, height: 600 })
    const component = await mount(RplDataTable, {
      props: { items: RplDataTableItemsSimple, columns: RplDataTableColumns }
    })

    await expectAll(component.locator('thead th'), async (th) =>
      expect(th).toHaveAttribute('scope', 'col')
    )
    await expectAll(component.locator('tbody td'), async (td) =>
      expect(td).not.toHaveAttribute('scope')
    )
    await expect(component.locator('tbody th')).toHaveCount(0)
  })

  test('sets the scope correctly for vertical headings', async ({
    mount,
    page
  }) => {
    await page.setViewportSize({ width: bpMin.l, height: 600 })
    const component = await mount(RplDataTable, {
      props: {
        items: RplDataTableItemsSimple,
        columns: RplDataTableColumns,
        headingType: { vertical: true, horizontal: false }
      }
    })

    await expect(component.locator('thead')).toBeHidden()
    await expectAll(component.locator('tbody th'), async (th) =>
      expect(th).toHaveAttribute('scope', 'row')
    )
    await expectAll(component.locator('tbody td'), async (td) =>
      expect(td).not.toHaveAttribute('scope')
    )
  })

  test('sets the scope correctly for vertical and horizontal headings', async ({
    mount,
    page
  }) => {
    await page.setViewportSize({ width: bpMin.l, height: 600 })
    const component = await mount(RplDataTable, {
      props: {
        items: RplDataTableItemsSimple,
        columns: RplDataTableColumns,
        headingType: { vertical: true, horizontal: true }
      }
    })

    await expectAll(component.locator('thead th'), async (th) =>
      expect(th).toHaveAttribute('scope', 'col')
    )
    await expectAll(component.locator('tbody th'), async (th) =>
      expect(th).toHaveAttribute('scope', 'row')
    )
    await expectAll(component.locator('tbody td'), async (td) =>
      expect(td).not.toHaveAttribute('scope')
    )
  })

  test('handles column orientation on mobile for horizontal headings', async ({
    mount,
    page
  }) => {
    await page.setViewportSize({ width: bpMin.s, height: 600 })
    const component = await mount(RplDataTable, {
      props: {
        columns: RplDataTableColumnsCustom,
        items: RplDataTableItemsCustom,
        headingType: { vertical: false, horizontal: true },
        orientation: 'column'
      }
    })

    const expected = [
      {
        heading: 'Fruit',
        content: ['Apple', 'Orange', 'Banana', 'Pear', 'Mango']
      },
      {
        heading: 'Vegetable',
        content: ['Potato', 'Broccoli', 'Pumpkin', 'Carrot', 'Mushrooms']
      },
      {
        heading: 'Elements',
        content: ['Zinc', 'Copper', 'Iron', 'Bronze', 'Slate']
      }
    ]

    for (let index = 0; index < expected.length; index++) {
      const tbody = component.locator(`tbody:nth-of-type(${index + 1})`)
      await expect(tbody.locator('th')).toHaveAttribute('scope', 'row')
      await expect(tbody.locator('th')).toContainText(expected[index].heading)

      for (let i = 0; i < expected[index].content.length; i++) {
        await expect(tbody.locator(`td:nth-of-type(${i + 1})`)).toContainText(
          expected[index].content[i]
        )
      }
    }
  })

  test('handles column orientation on mobile for vertical headings', async ({
    mount,
    page
  }) => {
    await page.setViewportSize({ width: bpMin.s, height: 600 })
    // @ts-ignore (Ignore type warning about columns' prop not being a string in tests)
    const component = await mount(RplDataTable, {
      props: {
        columns: RplDataTableMixedColumns,
        items: RplDataTableMixedItems,
        headingType: { vertical: true, horizontal: false },
        orientation: 'column'
      }
    })

    for (let index = 0; index < values.length; index++) {
      const tbody = component.locator(`tbody:nth-of-type(${index + 1})`)
      await expect(tbody.locator('th')).toHaveCount(0)

      for (let i = 0; i < values[index].length; i++) {
        const cell = tbody.locator(`td:nth-child(${i + 1})`)
        await expect(cell).toContainText(headings[i])
        await expect(cell).toContainText(values[index][i])
      }
    }
  })

  test('handles column orientation on mobile for dual headings', async ({
    mount,
    page
  }) => {
    await page.setViewportSize({ width: bpMin.s, height: 600 })
    // @ts-ignore (Ignore type warning about columns' prop not being a string in tests)
    const component = await mount(RplDataTable, {
      props: {
        columns: RplDataTableMixedColumns,
        items: RplDataTableMixedItems,
        headingType: { vertical: true, horizontal: true },
        orientation: 'column'
      }
    })

    for (let index = 0; index < values.length; index++) {
      const tbody = component.locator(`tbody:nth-of-type(${index + 1})`)
      await expect(tbody.locator('th')).toHaveAttribute('scope', 'row')
      await expect(tbody.locator('th')).toContainText(title[index])

      for (let i = 0; i < values[index].length; i++) {
        const cell = tbody.locator(`td:nth-of-type(${i + 1})`)
        await expect(cell).toContainText(headings[i])
        await expect(cell).toContainText(values[index][i])
      }
    }
  })
})
