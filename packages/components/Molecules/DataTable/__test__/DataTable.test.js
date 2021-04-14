import { shallowMount } from '@vue/test-utils'
import DataTable from '../DataTable'

describe('DataTable', () => {
  it('assigns default value to props accordingly', () => {
    const wrapper = shallowMount(DataTable)

    expect(wrapper.vm.isRowOriented).toBe(true)
    expect(wrapper.vm.isFirstColHeader).toBe(false)
    expect(wrapper.vm.isFirstRowHeader).toBe(false)
    expect(wrapper.vm.items).toEqual([])
  })

  it('assigns items properly for row oriented two column mobile layout', () => {
    const wrapper = shallowMount(DataTable, {
      propsData: {
        isRowOriented: true,
        isFirstRowHeader: true,
        isFirstColHeader: false,
        items: [
          ['Fruit', 'Vegetable', 'Elements'],
          ['Apple', 'Potato', 'Zinc'],
          ['Orange', 'Broccoli', 'Copper'],
          ['Banana', 'Pumpkin', 'Iron']
        ]
      }
    })

    const expectedHeader = ['Fruit', 'Vegetable', 'Elements']
    const expectedItems = [
      ['Apple', 'Potato', 'Zinc'],
      ['Orange', 'Broccoli', 'Copper'],
      ['Banana', 'Pumpkin', 'Iron']
    ]

    expect(wrapper.vm.isStackableColumns).toBe(false)
    expect(wrapper.vm.stackableColumns).toEqual([])
    // Desktop
    expect(wrapper.vm.headers).toEqual(expectedHeader)
    expect(wrapper.vm.rows).toEqual(expectedItems)
    // Responsive - all row oriented layout table doesn't need to be restructured
    expect(wrapper.vm.responsiveHeaders).toEqual(expectedHeader)
    expect(wrapper.vm.responsiveItems).toEqual(expectedItems)
  })

  it('assigns items properly for row oriented single column mobile layout', () => {
    const wrapper = shallowMount(DataTable, {
      propsData: {
        isRowOriented: true,
        isFirstRowHeader: false,
        isFirstColHeader: false,
        items: [
          ['Identify opportunities', '2-4 weeks', '$20,000-$25,000'],
          ['Co-design solutions', '8-10 weeks', '$60,000-$80,000'],
          ['Design and test a potential solution', '12 weeks', '$100,000-$150,000']
        ]
      }
    })

    expect(wrapper.vm.isStackableColumns).toBe(true)
    // Desktop
    expect(wrapper.vm.headers).toEqual(['Identify opportunities', '2-4 weeks', '$20,000-$25,000'])
    expect(wrapper.vm.rows).toEqual([
      ['Co-design solutions', '8-10 weeks', '$60,000-$80,000'],
      ['Design and test a potential solution', '12 weeks', '$100,000-$150,000']
    ])

    // Responsive - all row oriented layout table doesn't need to be restructured
    expect(wrapper.vm.stackableColumns).toEqual([
      ['Identify opportunities', '2-4 weeks', '$20,000-$25,000'],
      ['Co-design solutions', '8-10 weeks', '$60,000-$80,000'],
      ['Design and test a potential solution', '12 weeks', '$100,000-$150,000']
    ])
  })

  it('assigns items properly for column oriented two column mobile layout', () => {
    const wrapper = shallowMount(DataTable, {
      propsData: {
        isRowOriented: false,
        isFirstRowHeader: true,
        isFirstColHeader: true,
        items: [
          ['', 'Vegetable', 'Fruit'],
          ['Red', 'Tomato', 'Strawberry'],
          ['Yellow', 'Squash', 'Banana'],
          ['Green', 'Spinach', 'Kiwi fruit']
        ]
      }
    })

    const expectedHeader = ['', 'Vegetable', 'Fruit']
    const expectedItems = [
      ['Red', 'Tomato', 'Strawberry'],
      ['Yellow', 'Squash', 'Banana'],
      ['Green', 'Spinach', 'Kiwi fruit']
    ]

    expect(wrapper.vm.isStackableColumns).toBe(false)
    expect(wrapper.vm.stackableColumns).toEqual([])
    // Desktop
    expect(wrapper.vm.headers).toEqual(expectedHeader)
    expect(wrapper.vm.rows).toEqual(expectedItems)
    // Responsive - all row will be converted to column
    expect(wrapper.vm.responsiveHeaders).toEqual(['', 'Red', 'Yellow', 'Green'])
    expect(wrapper.vm.responsiveItems).toEqual([
      ['Vegetable', 'Tomato', 'Squash', 'Spinach'],
      ['Fruit', 'Strawberry', 'Banana', 'Kiwi fruit']
    ])
  })

  it('assigns items properly for column oriented single column mobile layout', () => {
    const wrapper = shallowMount(DataTable, {
      propsData: {
        isRowOriented: false,
        isFirstRowHeader: true,
        isFirstColHeader: false,
        items: [
          ['Fruit', 'Vegetable', 'Elements'],
          ['Apple', 'Potato', 'Zinc'],
          ['Orange', 'Broccoli', 'Copper'],
          ['Banana', 'Pumpkin', 'Iron']
        ]
      }
    })

    expect(wrapper.vm.isStackableColumns).toBe(true)
    // Desktop
    expect(wrapper.vm.headers).toEqual(['Fruit', 'Vegetable', 'Elements'])
    expect(wrapper.vm.rows).toEqual([
      ['Apple', 'Potato', 'Zinc'],
      ['Orange', 'Broccoli', 'Copper'],
      ['Banana', 'Pumpkin', 'Iron']
    ])
    // Responsive - all row will be converted to column
    expect(wrapper.vm.stackableColumns).toEqual([
      ['Fruit', 'Apple', 'Orange', 'Banana'],
      ['Vegetable', 'Potato', 'Broccoli', 'Pumpkin'],
      ['Elements', 'Zinc', 'Copper', 'Iron']
    ])
  })
})
