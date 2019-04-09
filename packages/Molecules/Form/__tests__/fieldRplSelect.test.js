import { mount } from '@vue/test-utils'
import RplSelect from './../fields/fieldRplSelect'

describe('FieldRplSelect', () => {
  const basePropsData = {
    model: {
      select: ''
    },
    schema: {
      type: 'rplselect',
      model: 'select',
      required: true,
      validator: ['required'],
      label: 'Single-select drop down',
      hint: 'Implemented using rplSelect',
      placeholder: 'Select a single topic',
      values: [
        { id: 'topic_a', name: 'Topic A' },
        { id: 'topic_b', name: 'Topic B' },
        { id: 'topic_c', name: 'Topic C' },
        { id: 'topic_d', name: 'Topic D' },
        { id: 'topic_e', name: 'Topic e' },
        { id: 'topic_f', name: 'Topic f' },
        { id: 'topic_g', name: 'Topic g' },
        { id: 'topic_h', name: 'Topic h' }
      ]
    },
    values: [
      {
        id: 'topic_a',
        name: 'Topic A',
        uuid: 'single-select-drop-down__topic_a'
      },
      {
        id: 'topic_b',
        name: 'Topic B',
        uuid: 'single-select-drop-down__topic_b'
      },
      {
        id: 'topic_c',
        name: 'Topic C',
        uuid: 'single-select-drop-down__topic_c'
      },
      {
        id: 'topic_d',
        name: 'Topic D',
        uuid: 'single-select-drop-down__topic_d'
      },
      {
        id: 'topic_e',
        name: 'Topic e',
        uuid: 'single-select-drop-down__topic_e'
      },
      {
        id: 'topic_f',
        name: 'Topic f',
        uuid: 'single-select-drop-down__topic_f'
      },
      {
        id: 'topic_g',
        name: 'Topic g',
        uuid: 'single-select-drop-down__topic_g'
      },
      {
        id: 'topic_h',
        name: 'Topic h',
        uuid: 'single-select-drop-down__topic_h'
      }
    ]
  }

  const baseConfig = {
    propsData: {
      ...basePropsData
    },
    computed: {
      $breakpoint () {
        return {
          s: true
        }
      }
    }
  }

  it('has native select on mobile', () => {
    const wrapper = mount(RplSelect, {
      propsData: {
        ...basePropsData
      },
      computed: {
        $breakpoint () {
          return {
            s: false
          }
        }
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.find('.rpl-select__native').isVisible()).toBeTruthy()
  })

  it('does not have native select on desktop', () => {
    const wrapper = mount(RplSelect, {
      ...baseConfig
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.find('.rpl-select__native').exists()).toBeFalsy()
  })

  it('is closed on load', () => {
    const wrapper = mount(RplSelect, {
      ...baseConfig
    })
    expect(wrapper.find('.rpl-select__trigger').attributes('aria-expanded')).toBeUndefined()
    expect(wrapper.find('.rpl-select__dropdown').isVisible()).toBeFalsy()
  })

  it('opens on click', () => {
    const wrapper = mount(RplSelect, {
      ...baseConfig
    })
    wrapper.find('.rpl-select__trigger').trigger('click')

    expect(wrapper.find('.rpl-select__trigger').attributes('aria-expanded')).toBeTruthy()
    expect(wrapper.find('.rpl-select__dropdown').isVisible()).toBeTruthy()
  })

  it('opens on spacebar', () => {
    const wrapper = mount(RplSelect, {
      ...baseConfig
    })
    wrapper.find('.rpl-select__trigger').trigger('keyup.space')

    expect(wrapper.find('.rpl-select__trigger').attributes('aria-expanded')).toBeTruthy()
    expect(wrapper.find('.rpl-select__dropdown').isVisible()).toBeTruthy()
  })

  it('opens on enter', () => {
    const wrapper = mount(RplSelect, {
      ...baseConfig
    })
    wrapper.find('.rpl-select__trigger').trigger('keyup.enter')

    expect(wrapper.find('.rpl-select__trigger').attributes('aria-expanded')).toBeTruthy()
    expect(wrapper.find('.rpl-select__dropdown').isVisible()).toBeTruthy()
  })

  it('closes on esc', () => {
    const wrapper = mount(RplSelect, {
      ...baseConfig
    })
    wrapper.find('.rpl-select__trigger').trigger('keyup.enter')
    wrapper.find('.rpl-select__listbox').trigger('keyup.esc')

    expect(wrapper.find('.rpl-select__trigger').attributes('aria-expanded')).toBeUndefined()
    expect(wrapper.find('.rpl-select__dropdown').isVisible()).toBeFalsy()
  })

  it('Selects first item when opened', () => {
    const wrapper = mount(RplSelect, {
      ...baseConfig
    })
    wrapper.find('.rpl-select__trigger').trigger('keyup.enter')

    expect(wrapper.find('.rpl-select__dropdown').isVisible()).toBeTruthy()
    expect(wrapper.find('#single-select-drop-down__topic_a').classes()).toContain('rpl-select__listitem--selected')
    expect(wrapper.find('.rpl-select__listitem--selected').text()).toEqual('Topic A')
  })

  it('navigates to next item when press down arrow', () => {
    const wrapper = mount(RplSelect, {
      ...baseConfig,
      propsData: {
        ...baseConfig.propsData,
        model: {
          select: 'topic_a'
        }
      },
      attachToDocument: true
    })

    wrapper.find('.rpl-select__trigger').trigger('keyup.enter')
    wrapper.find('.rpl-select__listbox').trigger('keydown.down')
    expect(wrapper.find('.rpl-select__dropdown').isVisible()).toBeTruthy()
    expect(wrapper.find('.rpl-select__listitem--selected').text()).toEqual('Topic B')
  })

  it('navigates to previous item when press up arrow', () => {
    const wrapper = mount(RplSelect, {
      ...baseConfig,
      propsData: {
        ...baseConfig.propsData,
        model: {
          select: 'topic_a'
        }
      },
      attachToDocument: true
    })

    wrapper.find('.rpl-select__trigger').trigger('keyup.enter')
    wrapper.find('.rpl-select__listbox').trigger('keydown.down')
    wrapper.find('.rpl-select__listbox').trigger('keydown.down')
    wrapper.find('.rpl-select__listbox').trigger('keydown.up')
    wrapper.find('.rpl-select__listbox').trigger('keydown.up')
    expect(wrapper.find('.rpl-select__dropdown').isVisible()).toBeTruthy()
    expect(wrapper.find('.rpl-select__listitem--selected').text()).toEqual('Topic A')
  })
})
