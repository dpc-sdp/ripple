import { shallowMount } from '@vue/test-utils'
import Table from '../Table'

describe('Table', () => {
  it('assigns default value to props accordingly', () => {
    const wrapper = shallowMount(Table)

    expect(wrapper.vm.headers).toEqual([])
    expect(wrapper.vm.rows).toEqual([])
  })

  it('assigns value to props correctly', () => {
    const wrapper = shallowMount(Table, {
      propsData: {
        headers: ['Fruit', 'Vegetable', 'Elements'],
        rows: [
          ['Apple', 'Potato', 'Zinc'],
          ['Orange', 'Broccoli', 'Copper'],
          ['Banana', 'Pumpkin', 'Iron']
        ]
      }
    })

    expect(wrapper.vm.headers).toEqual(['Fruit', 'Vegetable', 'Elements'])
    expect(wrapper.vm.rows).toEqual([
      ['Apple', 'Potato', 'Zinc'],
      ['Orange', 'Broccoli', 'Copper'],
      ['Banana', 'Pumpkin', 'Iron']
    ])
  })
})
