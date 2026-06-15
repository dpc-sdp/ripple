import { test, expect } from '@playwright/experimental-ct-vue'
import RplDataTable from '../../ripple-ui-core/src/components/data-table/RplDataTable.vue'
import {
  RplDataTableColumns,
  RplDataTableColumnsCustom,
  RplDataTableItems,
  RplDataTableItemsCustom,
  RplDataTableItemsSimple,
  RplDataTableMixedColumns,
  RplDataTableMixedItems
} from './fixtures/data-table'
import { bpMin } from '@dpc-sdp/ripple-ui-core'

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

test.describe(() => {
  test('mounts', async ({ mount }) => {
    const component = await mount(RplDataTable, { props })
    await expect(component).toBeAttached()
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
  })

  test.describe('using l breakpoint', () => {
    test.use({ viewport: { width: bpMin.l, height: 600 } })

    test('sets the scope correctly for horizontal headings', async ({
      mount
    }) => {
      const component = await mount(RplDataTable, {
        props: { items: RplDataTableItemsSimple, columns: RplDataTableColumns }
      })

      await expect(component.locator('thead th').first()).toHaveAttribute(
        'scope',
        'col'
      )
      await expect(component.locator('tbody td').first()).not.toHaveAttribute(
        'scope'
      )
      await expect(component.locator('tbody th').first()).not.toBeAttached()
    })

    test('sets the scope correctly for vertical headings', async ({
      mount
    }) => {
      const component = await mount(RplDataTable, {
        props: {
          items: RplDataTableItemsSimple,
          columns: RplDataTableColumns,
          headingType: { vertical: true, horizontal: false }
        }
      })

      await expect(component.locator('thead')).not.toBeAttached()
      await expect(component.locator('tbody th').first()).toHaveAttribute(
        'scope',
        'row'
      )
      await expect(component.locator('tbody td').first()).not.toHaveAttribute(
        'scope'
      )
    })

    test('sets the scope correctly for vertical and horizontal headings', async ({
      mount
    }) => {
      const component = await mount(RplDataTable, {
        props: {
          items: RplDataTableItemsSimple,
          columns: RplDataTableColumns,
          headingType: { vertical: true, horizontal: true }
        }
      })

      await expect(component.locator('thead th').first()).toHaveAttribute(
        'scope',
        'col'
      )
      await expect(component.locator('tbody th').first()).toHaveAttribute(
        'scope',
        'row'
      )
      await expect(component.locator('tbody td').first()).not.toHaveAttribute(
        'scope'
      )
    })
  })

  test.describe('using s breakpoint', () => {
    test.use({ viewport: { width: bpMin.s, height: 600 } })

    test('handles column orientation on mobile for horizontal headings', async ({
      mount
    }) => {
      const component = await mount(RplDataTable as any, {
        props: {
          columns: RplDataTableColumnsCustom,
          items: RplDataTableItemsCustom,
          headingType: {
            vertical: false,
            horizontal: true
          },
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

      expected.forEach(async (item, index) => {
        const matched = component.locator(`tbody:nth-of-type(${index + 1})`)
        for (let i = 0; i <= (await matched.count()) - 1; i++) {
          const th = matched.nth(i).locator('th')
          await expect(th).toHaveAttribute('scope', 'row')
          await expect(th).toContainText(expected[index].heading)
        }
        item.content.forEach(async (content, j) => {
          for (let i = 0; i <= (await matched.count()) - 1; i++) {
            await expect(
              matched.nth(i).locator(`td:nth-of-type(${j + 1})`)
            ).toContainText(content)
          }
        })
      })
    })

    test('handles column orientation on mobile for vertical headings', async ({
      mount
    }) => {
      const component = await mount(RplDataTable as any, {
        props: {
          columns: RplDataTableMixedColumns,
          items: RplDataTableMixedItems,
          headingType: {
            vertical: true,
            horizontal: false
          },
          orientation: 'column'
        }
      })

      values.forEach(async (item, index) => {
        const matched = component.locator(`tbody:nth-of-type(${index + 1})`)
        for (let i = 0; i <= (await matched.count()) - 1; i++) {
          const th = matched.nth(i).locator('th')
          await expect(th).not.toBeAttached()

          item.forEach(async (content, j) => {
            const cell = matched.nth(i).locator(`td:nth-child(${j + 1})`)
            await expect(cell).toContainText(headings[j])
            await expect(cell).toContainText(content)
          })
        }
      })
    })

    test('handles column orientation on mobile for dual headings', async ({
      mount
    }) => {
      const component = await mount(RplDataTable as any, {
        props: {
          columns: RplDataTableMixedColumns,
          items: RplDataTableMixedItems,
          headingType: {
            vertical: true,
            horizontal: true
          },
          orientation: 'column'
        }
      })

      values.forEach(async (item, index) => {
        const matched = component.locator(`tbody:nth-of-type(${index + 1})`)
        for (let i = 0; i <= (await matched.count()) - 1; i++) {
          const th = matched.nth(i).locator('th')
          await expect(th).toHaveAttribute('scope', 'row')
          await expect(th).toContainText(title[index])

          item.forEach(async (content, j) => {
            const cell = matched.nth(i).locator(`td:nth-of-type(${j + 1})`)
            await expect(cell).toContainText(headings[j])
            await expect(cell).toContainText(content)
          })
        }
      })
    })
  })
})
