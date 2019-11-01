import { createLocalVue, mount } from '@vue/test-utils'
import RplCol from './../Col.vue'
import RplGlobal from '@dpc-sdp/ripple-global'

const localVue = createLocalVue()

localVue.use(RplGlobal, { isDev: true })

const colNotCatchError = mount(RplCol)

const colCatchErrorDev = mount(RplCol, {
  propsData: {
    catchChildError: true
  },
  localVue
})

const colCatchErrorNotDev = mount(RplCol, {
  propsData: {
    catchChildError: true
  }
})

// Give an error for testing.
// Ideally will be mount an error child component but Vue test utils didn't support mount in slot.
const error = new Error('I have an error.')
colNotCatchError.vm.interceptError(error)
colCatchErrorDev.vm.interceptError(error)
colCatchErrorNotDev.vm.interceptError(error)

describe('RplCol', () => {
  it('not render the child error class when catch child error is not enabled', () => {
    expect(colNotCatchError.classes()).not.toContain('rpl-child-component-error')
  })

  it('render the child error class when caught an error in dev mode', () => {
    expect(colCatchErrorDev.classes()).toContain('rpl-child-component-error')
  })

  it('render the child error messages when caught an error in dev mode', () => {
    expect(colCatchErrorDev.contains('.rpl-dev-error')).toBe(true)
  })

  it('render the child error class when caught an error but is not in dev mode', () => {
    expect(colCatchErrorNotDev.classes()).toContain('rpl-child-component-error')
  })

  it('not render the child error messages when caught an error but is not in dev mode', () => {
    expect(colCatchErrorNotDev.contains('.rpl-dev-error')).toBe(false)
  })
})
