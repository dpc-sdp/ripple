import { shallowMount } from '@vue/test-utils'
import LinkTiles from '../index'

it('renders the default row view', () => {
  const wrapper = shallowMount(LinkTiles, {
    propsData: {
      title: 'Languages',
      primaryCta: {
        text: 'View all languages',
        url: '/view-all'
      },
      links: [
        { text: 'عربي / Arabic', url: '/arabic' },
        { text: '中文 / Chinese', url: '/chinese' },
        { text: 'Türkçe / Turkish', url: '/turkish' },
        { text: 'Việt-ngữ / Vietnamese', url: '/vietnamese' }
      ]
    }
  })

  expect(wrapper.vm.gridView).toEqual(false)
  expect(wrapper.classes()).not.toContain('rpl-link-tiles--grid')
})

it('renders the grid view', () => {
  const wrapper = shallowMount(LinkTiles, {
    propsData: {
      title: 'Languages',
      primaryCta: {
        text: 'View all languages',
        url: '/view-all'
      },
      links: [
        { text: 'COVID-19 Coronavirus', url: '#', image: 'http://via.placeholder.com/64x64' },
        { text: 'Character references', url: '#', image: 'http://via.placeholder.com/64x64' },
        { text: 'Family violence', url: '#', image: 'http://via.placeholder.com/64x64' },
        { text: 'Driving offences', url: '#', image: 'http://via.placeholder.com/64x64' },
        { text: 'Divorce', url: '#', image: 'http://via.placeholder.com/64x64' },
        { text: 'Housing and tenancy', url: '#', image: 'http://via.placeholder.com/64x64' }
      ],
      gridView: true
    }
  })

  expect(wrapper.classes()).toContain('rpl-link-tiles--grid')
  expect(wrapper.findAll('.rpl-link-tiles__link').length).toEqual(6)
  expect(wrapper.findAll('.rpl-link-tiles__link-icon').length).toEqual(6)
})

it('renders the grid view without icons', () => {
  const wrapper = shallowMount(LinkTiles, {
    propsData: {
      title: 'Languages',
      primaryCta: {
        text: 'View all languages',
        url: '/view-all'
      },
      links: [
        { text: 'COVID-19 Coronavirus', url: '#', image: 'http://via.placeholder.com/64x64' },
        { text: 'Character references', url: '#', image: 'http://via.placeholder.com/64x64' },
        { text: 'Family violence', url: '#', image: 'http://via.placeholder.com/64x64' },
        { text: 'Driving offences', url: '#', image: 'http://via.placeholder.com/64x64' },
        { text: 'Divorce', url: '#', image: 'http://via.placeholder.com/64x64' },
        { text: 'Housing and tenancy', url: '#', image: 'http://via.placeholder.com/64x64' }
      ],
      hideIcons: true,
      gridView: true
    }
  })

  expect(wrapper.classes()).toContain('rpl-link-tiles--grid')
  expect(wrapper.classes()).toContain('rpl-link-tiles--wide')
  expect(wrapper.findAll('.rpl-link-tiles__link').length).toEqual(6)
  expect(wrapper.findAll('.rpl-link-tiles__link-icon').length).toEqual(0)
})

it('renders the grid view variation when sidebar is present', () => {
  const wrapper = shallowMount(LinkTiles, {
    propsData: {
      title: 'Languages',
      primaryCta: {
        text: 'View all languages',
        url: '/view-all'
      },
      links: [
        { text: 'COVID-19 Coronavirus', url: '#', image: 'http://via.placeholder.com/64x64' },
        { text: 'Character references', url: '#', image: 'http://via.placeholder.com/64x64' }
      ],
      gridView: true,
      sidebar: true
    }
  })

  expect(wrapper.classes()).toContain('rpl-link-tiles--grid')
  expect(wrapper.classes()).not.toContain('rpl-link-tiles--wide')
})
