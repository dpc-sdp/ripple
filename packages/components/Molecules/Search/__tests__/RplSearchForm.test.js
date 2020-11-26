import { shallowMount } from '@vue/test-utils'
import SearchForm from '../SearchForm'

describe('SearchForm', () => {
  it('emits search event with a value when submitting the form', () => {
    const wrapper = shallowMount(SearchForm)
    wrapper.setProps({ allowBlank: false })
    wrapper.setData({ searchInput: 'test keyword' })

    wrapper.vm.submitSearch()
    expect(wrapper.emitted().search[0]).toEqual(['test keyword'])
  })

  it('doesn\'t emit search event when there is no search input', () => {
    const wrapper = shallowMount(SearchForm)
    wrapper.setData({ searchInput: '' })

    wrapper.vm.submitSearch()
    expect(wrapper.emitted().search).toBeUndefined()
  })

  it('clears form input when triggered', () => {
    const wrapper = shallowMount(SearchForm)
    wrapper.setData({ searchInput: 'something' })

    wrapper.vm.clearSearch()
    expect(wrapper.vm.searchInput).toBe('')
  })

  it('tests searchFormClass to return empty array when there is no theme assigned', () => {
    const wrapper = shallowMount(SearchForm)

    wrapper.setProps({ theme: '' })
    expect(wrapper.vm.searchFormClass).toEqual([])
  })

  it('adds classes to form when a valid theme is assigned', () => {
    const wrapper = shallowMount(SearchForm)

    wrapper.setProps({ theme: 'solid' })
    expect(wrapper.vm.searchFormClass).toEqual(['rpl-search-form--solid'])
  })

  it('returns total number of form filters correctly', () => {
    const wrapper = shallowMount(SearchForm, {
      propsData: {
        filterForm: {}
      }
    })

    expect(wrapper.vm.filterCount).toEqual(0)

    wrapper.setProps({
      filterForm: {
        model: {
          testOne: 'test',
          testTwo: ['one', 'two', 'three'],
          testThree: ''
        }
      }
    })
    expect(wrapper.vm.filterCount).toEqual(2)
  })

  it('tests watcher for prefillSearchTerm to assign value to searchInput correctly', () => {
    const wrapper = shallowMount(SearchForm, {
      propsData: {
        prefillSearchTerm: 'something'
      }
    })

    expect(wrapper.vm.searchInput).toEqual('something')
  })
})
