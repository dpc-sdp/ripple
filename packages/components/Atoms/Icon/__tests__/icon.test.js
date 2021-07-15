import { shallowMount } from '@vue/test-utils'
import RplIcon from './../Icon'
import './../icons/index.js'

describe('RplIcon', () => {
  it('returns the correct icon class based on icon name provided', async () => {
    const wrapper = shallowMount(RplIcon, {
      propsData: {
        'symbol': 'search',
        'color': 'primary',
        'size': 'm'
      }
    })
    expect(wrapper.vm.iconClass).toEqual('rpl-icon rpl-icon--search rpl-icon--color_primary')

    await wrapper.setProps({
      'symbol': ''
    })
    expect(wrapper.vm.iconClass).toEqual('')
  })

  it('returns the correct icon style', () => {
    const wrapper = shallowMount(RplIcon, {
      propsData: {
        'symbol': 'search',
        'color': 'primary',
        'size': 'm'
      }
    })
    expect(wrapper.vm.iconStyle).toEqual('width: 16px; height: 16px')
  })

  it('builds the correct icon object', () => {
    const wrapper = shallowMount(RplIcon, {
      propsData: {
        'symbol': 'search',
        'color': 'primary',
        'size': 'm'
      }
    })

    const expectedIcon = {
      height: 16,
      width: 16,
      paths: [
        {
          d: 'M10.99 9.243c1.597-2.45 1.224-5.82-1.133-7.833C7.59-.526 4.137-.46 1.94 1.557a6 6 0 00-.19 8.653c2.043 2.045 5.205 2.293 7.527.757.031-.02.102-.083.198-.173l4.343 4.195a.941.941 0 101.308-1.354l-4.324-4.176c.098-.106.166-.184.188-.216zm-8.023-.25a4.274 4.274 0 010-6.035 4.266 4.266 0 016.03 0 4.274 4.274 0 010 6.034 4.266 4.266 0 01-6.03 0z'
        }
      ],
      polygons: []
    }
    expect(wrapper.vm.icon).toEqual(expectedIcon)
  })

  it('builds icon view box correctly', () => {
    const wrapper = shallowMount(RplIcon, {
      propsData: {
        'symbol': 'search',
        'color': 'primary',
        'size': 'm'
      }
    })
    expect(wrapper.vm.box).toEqual('0 0 16 16')
  })
})
