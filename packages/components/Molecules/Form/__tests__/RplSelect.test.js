import { mount } from '@vue/test-utils'
import RplSelect from './../Select'

let wrapper

afterEach(() => {
  wrapper.destroy()
  wrapper = null
})

describe('RplSelect', () => {
  const basePropsData = {
    config: {
      multiselect: false,
      placeholder: 'Select',
      showitems: 4,
      fieldId: 'single-select-drop-down',
      label: ''
    },
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
  }

  const div = document.createElement('div')
  document.body.appendChild(div)

  const baseConfig = {
    attachTo: div,
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
    wrapper = mount(RplSelect, {
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

  it('opens on click', async () => {
    wrapper = mount(RplSelect, {
      ...baseConfig
    })
    await wrapper.find('.rpl-select__trigger').trigger('click')

    expect(wrapper.find('.rpl-select__trigger').attributes('aria-expanded')).toBeTruthy()
    expect(wrapper.find('.rpl-select__dropdown').isVisible()).toBeTruthy()
  })

  it('opens on spacebar', async () => {
    wrapper = mount(RplSelect, {
      ...baseConfig
    })
    await wrapper.find('.rpl-select__trigger').trigger('keyup.space')

    expect(wrapper.find('.rpl-select__trigger').attributes('aria-expanded')).toBeTruthy()
    expect(wrapper.find('.rpl-select__dropdown').isVisible()).toBeTruthy()
  })

  it('opens on enter', async () => {
    wrapper = mount(RplSelect, {
      ...baseConfig
    })
    await wrapper.find('.rpl-select__trigger').trigger('keyup.enter')

    expect(wrapper.find('.rpl-select__trigger').attributes('aria-expanded')).toBeTruthy()
    expect(wrapper.find('.rpl-select__dropdown').isVisible()).toBeTruthy()
  })

  it('closes on esc', async () => {
    wrapper = mount(RplSelect, {
      ...baseConfig
    })
    await wrapper.find('.rpl-select__trigger').trigger('keyup.enter')
    await wrapper.find('.rpl-select__listbox').trigger('keyup.esc')

    expect(wrapper.find('.rpl-select__trigger').attributes('aria-expanded')).toBeUndefined()
    expect(wrapper.find('.rpl-select__dropdown').isVisible()).toBeFalsy()
  })

  test('Selects first item when opened', async () => {
    wrapper = mount(RplSelect, {
      ...baseConfig
    })
    await wrapper.find('.rpl-select__trigger').trigger('keyup.enter')
    expect(wrapper.find('.rpl-select__dropdown').isVisible()).toBeTruthy()

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('#single-select-drop-down__topic__005fa').classes()).toContain('rpl-select__listitem--selected')
      expect(wrapper.find('.rpl-select__listitem--selected').text()).toEqual('Topic A')
      expect(wrapper.find('.rpl-select__listitem--selected').attributes('aria-selected')).toBeUndefined()
    })
  })

  test('navigates to next item when press down arrow', async () => {
    wrapper = mount(RplSelect, {
      ...baseConfig,
      propsData: {
        ...baseConfig.propsData,
        state: 'topic_b'
      }
    })
    await wrapper.find('.rpl-select__trigger').trigger('keyup.enter')
    await wrapper.find('.rpl-select__listbox').trigger('keydown.down')
    await wrapper.find('.rpl-select__listbox').trigger('keydown.down')
    expect(wrapper.find('.rpl-select__dropdown').isVisible()).toBeTruthy()
    expect(wrapper.find('.rpl-select__listitem--selected').text()).toEqual('Topic D')
  })

  it('navigates to previous item when press up arrow', async () => {
    wrapper = mount(RplSelect, {
      ...baseConfig,
      propsData: {
        ...baseConfig.propsData
      },
      attachTo: div
    })

    await wrapper.find('.rpl-select__trigger').trigger('keyup.enter') // On Enter, first element is already selected
    await wrapper.find('.rpl-select__listbox').trigger('keydown.down')
    await wrapper.find('.rpl-select__listbox').trigger('keydown.down')
    await wrapper.find('.rpl-select__listbox').trigger('keydown.down')
    await wrapper.find('.rpl-select__listbox').trigger('keydown.up')
    expect(wrapper.find('.rpl-select__dropdown').isVisible()).toBeTruthy()
    expect(wrapper.find('.rpl-select__listitem--selected').text()).toEqual('Topic C')
  })

  it('initialises value from state prop', () => {
    wrapper = mount(RplSelect, {
      ...baseConfig,
      propsData: {
        ...baseConfig.propsData,
        state: 'topic_c'
      },
      attachToDocument: true
    })

    expect(wrapper.find('.rpl-select__trigger').text()).toContain('Topic C')
  })

  describe('multiselect', () => {
    it('sets aria attibutes correctly', () => {
      wrapper = mount(RplSelect, {
        ...baseConfig,
        propsData: {
          ...baseConfig.propsData,
          config: {
            ...baseConfig.propsData.config,
            fieldId: 'multi-select-drop-down',
            multiselect: true
          },
          state: ['topic_a', 'topic_b']
        },
        attachToDocument: true
      })

      expect(wrapper.find('.rpl-select__listbox').attributes('role')).toEqual('listbox')
      expect(wrapper.find('.rpl-select__listbox').attributes('aria-multiselectable')).toEqual('true')
      expect(wrapper.find('.rpl-select__trigger').attributes('aria-haspopup')).toEqual('listbox')
    })

    it('shows multiple options when selected', () => {
      wrapper = mount(RplSelect, {
        ...baseConfig,
        propsData: {
          ...baseConfig.propsData,
          config: {
            ...baseConfig.propsData.config,
            fieldId: 'multi-select-drop-down',
            multiselect: true
          },
          state: ['topic_a', 'topic_b']
        },
        attachToDocument: true
      })

      expect(wrapper.find('#multi-select-drop-down-rpl-select-value').text()).toContain('Topic A, Topic B')
      wrapper.destroy()
    })

    it('shows count if more than limit selected', () => {
      wrapper = mount(RplSelect, {
        ...baseConfig,
        propsData: {
          ...baseConfig.propsData,
          config: {
            ...baseConfig.propsData.config,
            fieldId: 'multi-select-drop-down',
            multiselect: true
          },
          state: ['topic_a', 'topic_b', 'topic_c', 'topic_d', 'topic_e', 'topic_f', 'topic_g']
        }
      })
      expect(wrapper.find('.rpl-select__trigger').text()).toContain('Topic A + 6 more')
      wrapper.destroy()
    })

    it('makes selections with spacebar', async () => {
      wrapper = mount(RplSelect, {
        ...baseConfig,
        propsData: {
          ...baseConfig.propsData,
          config: {
            ...baseConfig.propsData.config,
            fieldId: 'multi-select-drop-down',
            multiselect: true
          }
        }
      })

      await wrapper.find('.rpl-select__trigger').trigger('click') // Focuses on first element Topic A
      expect(wrapper.find('.rpl-select__dropdown').isVisible()).toBeTruthy()
      await wrapper.find('.rpl-select__listbox').trigger('keydown.down')
      await wrapper.find('.rpl-select__listbox').trigger('keydown.down')
      expect(wrapper.find('.rpl-select__listitem--focussed').text()).toContain('Topic C')
      await wrapper.find('.rpl-select__listbox').trigger('keydown.down')
      expect(wrapper.find('.rpl-select__listitem--focussed').text()).toContain('Topic D')
      await wrapper.find('.rpl-select__listbox').trigger('keydown.down')
      expect(wrapper.find('.rpl-select__listitem--focussed').text()).toContain('Topic e')
      await wrapper.find('.rpl-select__listitem--focussed').trigger('click')
      expect(wrapper.find('.rpl-select__listitem--focussed').find('.rpl-select__checkbox').exists()).toBeTruthy()

      expect(wrapper.find('.rpl-select__trigger').text()).toContain('Topic e')
    })
  })
})
