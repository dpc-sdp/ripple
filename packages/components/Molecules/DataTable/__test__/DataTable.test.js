import { shallowMount } from '@vue/test-utils'
import DataTable from '../DataTable'

describe('DataTable', () => {
  it('assigns props accordingly', () => {
    const wrapper = shallowMount(DataTable, {
      propsData: {
        title: 'Data table demo title'
      }
    })

    expect(wrapper.vm.title).toEqual('Data table demo title')
    expect(wrapper.vm.isRowOriented).toBe(true)
    expect(wrapper.vm.items).toEqual([])
  })

  it('assigns header and items for row oriented layout', () => {
    const wrapper = shallowMount(DataTable, {
      propsData: {
        title: 'Data table demo title',
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
        title: 'Data table demo title',
        isRowOriented: false,
        items: [
          ['Band', 'Maroon 5', 'U2', 'Paramore'],
          ['Singer', 'Adam Levine', 'John Doe', 'Jane Doe'],
          ['Inception', '2000', '1985', '2004'],
          ['Label', 'Century Media', 'Candlelight', 'Century Media']
        ]
      }
    })

    expect(wrapper.vm.responsiveHeaders).toEqual(['Band', 'Singer', 'Inception', 'Label'])
    expect(wrapper.vm.responsiveItems).toEqual([
      ['Maroon 5', 'Adam Levine', '2000', 'Century Media'],
      ['U2', 'John Doe', '1985', 'Candlelight'],
      ['Paramore', 'Jane Doe', '2004', 'Century Media']
    ])
  })
})
