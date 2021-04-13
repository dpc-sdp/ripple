import { shallowMount } from '@vue/test-utils'
import DataTable from '../DataTable'

describe('DataTable', () => {
  it('assigns props accordingly', () => {
    const wrapper = shallowMount(DataTable, {
      propsData: {
        caption: 'Data table demo title'
      }
    })

    expect(wrapper.vm.caption).toEqual('Data table demo title')
    expect(wrapper.vm.isRowOriented).toBe(true)
    expect(wrapper.vm.items).toEqual([])
  })

  it('assigns header and items for row oriented layout', () => {
    const wrapper = shallowMount(DataTable, {
      propsData: {
        caption: 'Data table demo title',
        items: [
          ['Band', 'Singer', 'Inception', 'Label'],
          ['Napalm Death', 'Barney Greenway', '1981', 'Century Media'],
          ['Carcass', 'Jeff Walker', '1985', 'Earache'],
          ['Extreme Noise Terror', 'Dean Jones', '1985', 'Candlelight'],
          ['Discordance Axis', 'Jon Chang', '1992', 'Hydrahead']
        ]
      }
    })

    expect(wrapper.vm.headers).toEqual(['Band', 'Singer', 'Inception', 'Label'])
    expect(wrapper.vm.rows).toEqual([
      ['Napalm Death', 'Barney Greenway', '1981', 'Century Media'],
      ['Carcass', 'Jeff Walker', '1985', 'Earache'],
      ['Extreme Noise Terror', 'Dean Jones', '1985', 'Candlelight'],
      ['Discordance Axis', 'Jon Chang', '1992', 'Hydrahead']
    ])
  })

  it('assigns header and items for column oriented layout', () => {
    const wrapper = shallowMount(DataTable, {
      propsData: {
        caption: 'Data table demo title',
        isRowOriented: false,
        items: [
          ['Band', 'Maroon 5', 'U2', 'Paramore', 'The Weekend', 'Coldplay'],
          ['Singer', 'Adam Levine', 'John Doe', 'Jane Doe', 'Some guy', 'Another guy'],
          ['Inception', '2000', '1985', '2004', '2017', '1997']
        ]
      }
    })

    expect(wrapper.vm.responsiveHeaders).toEqual(['Band', 'Singer', 'Inception'])
    expect(wrapper.vm.responsiveItems).toEqual([
      ['Maroon 5', 'Adam Levine', '2000'],
      ['U2', 'John Doe', '1985'],
      ['Paramore', 'Jane Doe', '2004'],
      ['The Weekend', 'Some guy', '2017'],
      ['Coldplay', 'Another guy', '1997']
    ])
  })

  it('converts columns to rows for single column mobile layout', () => {
    const wrapper = shallowMount(DataTable, {
      propsData: {
        caption: 'Data table demo title',
        isStackableColumns: true,
        items: [
          ['Fruit', 'Vegetable', 'Elements'],
          ['Apple', 'Potato', 'Zinc'],
          ['Orange', 'Broccoli', 'Copper'],
          ['Banana', 'Pumpkin', 'Iron']
        ]
      }
    })

    expect(wrapper.vm.stackableColumns).toEqual([
      [
        'Fruit',
        'Apple',
        'Orange',
        'Banana'
      ],
      [
        'Vegetable',
        'Potato',
        'Broccoli',
        'Pumpkin'
      ],
      [
        'Elements',
        'Zinc',
        'Copper',
        'Iron'
      ]
    ])
  })
})
