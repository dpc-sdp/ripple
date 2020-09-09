import { shallowMount } from '@vue/test-utils'
import RplIcon from './../Icon'
import './../icons/index.js'

describe('RplIcon', () => {
  it('returns the correct icon class based on icon name provided', () => {
    const wrapper = shallowMount(RplIcon, {
      propsData: {
        'symbol': 'search',
        'color': 'primary',
        'size': 'm'
      }
    })
    expect(wrapper.vm.iconClass).toEqual('rpl-icon rpl-icon--search rpl-icon--color_primary')

    wrapper.setProps({
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
          d: 'M10.9895 9.24258C12.587 6.79233 12.2144 3.42261 9.85748 1.40991C7.58966 -0.526184 4.13776 -0.45993 1.94049 1.55707C-0.581665 3.87222 -0.645325 7.81287 1.75031 10.2102C3.79315 12.2547 6.95502 12.503 9.2771 10.967C9.30811 10.9465 9.37885 10.8841 9.47473 10.7944L13.8181 14.9887C14.192 15.3498 14.7879 15.3394 15.1489 14.9655C15.51 14.5916 15.4996 13.9958 15.1257 13.6347L10.8018 9.45914C10.8997 9.35345 10.9681 9.27545 10.9895 9.24258ZM2.96704 8.99216C1.3045 7.3284 1.3045 4.62128 2.96704 2.95752C4.62952 1.29376 7.33447 1.29334 8.99695 2.95752C10.6594 4.62128 10.6594 7.3284 8.99695 8.99216C7.33447 10.6559 4.62952 10.6559 2.96704 8.99216Z'
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
