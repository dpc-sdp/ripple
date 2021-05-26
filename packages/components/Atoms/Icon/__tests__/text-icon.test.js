import { shallowMount } from '@vue/test-utils'
import RplTextIcon from './../TextIcon'

describe('RplTextIcon', () => {
  it('trims trailing spaces from anchor text correctly', () => {
    const wrapper = shallowMount(RplTextIcon, {
      propsData: {
        symbol: 'search',
        color: 'primary',
        placement: 'after',
        size: 'm',
        text: ' I have trailing spaces '
      }
    })

    expect(wrapper.vm.text).toEqual(' I have trailing spaces ')
    expect(wrapper.vm.trimmedText).toEqual('I have trailing spaces')
  })

  it('returns the correct word count', () => {
    const wrapper = shallowMount(RplTextIcon, {
      propsData: {
        symbol: 'search',
        color: 'primary',
        placement: 'after',
        size: 'm',
        text: '    Lorem ipsum dolor sit amet '
      }
    })

    expect(wrapper.vm.textWordCount).toEqual(5)
  })

  it('returns the text without the last word', () => {
    const wrapper = shallowMount(RplTextIcon, {
      propsData: {
        symbol: 'search',
        color: 'primary',
        placement: 'after',
        size: 'm',
        text: '   Lorem ipsum dolor sit amet '
      }
    })

    expect(wrapper.vm.textWithoutLastWord).toEqual('Lorem ipsum dolor sit')
  })

  it('returns the last word of anchor text correctly', () => {
    const wrapper = shallowMount(RplTextIcon, {
      propsData: {
        symbol: 'search',
        color: 'primary',
        placement: 'after',
        size: 'm',
        text: '   Lorem ipsum dolor sit amet  '
      }
    })

    expect(wrapper.vm.textLastWord).toEqual('amet')

    // Text without trailing space
    wrapper.setProps({ text: 'Lorem ipsum dolor sit amet' })
    expect(wrapper.vm.textLastWord).toEqual('amet')
  })

  it('returns text without the first word correctly', () => {
    const wrapper = shallowMount(RplTextIcon, {
      propsData: {
        symbol: 'search',
        color: 'primary',
        placement: 'after',
        size: 'm',
        text: '   Lorem ipsum dolor sit amet  '
      }
    })

    expect(wrapper.vm.textWithoutFirstWord).toEqual('ipsum dolor sit amet')

    // Test text without trailing spaces
    wrapper.setProps({ text: 'Lorem ipsum dolor sit amet' })
    expect(wrapper.vm.textWithoutFirstWord).toEqual('ipsum dolor sit amet')
  })

  it('returns first word of anchor text correctly', () => {
    const wrapper = shallowMount(RplTextIcon, {
      propsData: {
        symbol: 'search',
        color: 'primary',
        placement: 'after',
        size: 'm',
        text: '   Lorem ipsum dolor sit amet   '
      }
    })

    expect(wrapper.vm.textFirstWord).toEqual('Lorem')

    // Test text without trailing spaces
    wrapper.setProps({ text: 'Lorem ipsum dolor sit amet' })
    expect(wrapper.vm.textFirstWord).toEqual('Lorem')
  })

  it('splits text and convert to array properly', () => {
    const wrapper = shallowMount(RplTextIcon, {
      propsData: {
        symbol: 'search',
        color: 'secondary',
        placement: 'before',
        text: '    Lorem ipsum dolor sit amet '
      }
    })

    expect(wrapper.vm.textWordCount).toEqual(5)
    expect(wrapper.vm.textArray).toEqual(['Lorem', 'ipsum', 'dolor', 'sit', 'amet'])
  })

  it('returns icon props accordingly', () => {
    const wrapper = shallowMount(RplTextIcon, {
      propsData: {
        symbol: 'search',
        color: 'secondary',
        placement: 'before',
        text: ' Lorem ipsum dolor sit amet '
      }
    })

    expect(wrapper.vm.iconProps).toEqual({
      symbol: 'search',
      color: 'secondary',
      size: 'm',
      class: 'rpl-text-icon--before'
    })
  })
})
