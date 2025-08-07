import { Ref, inject, watch, nextTick } from 'vue'
import { IRplPrimaryNavFocusOptions } from '../components/primary-nav/constants'

export function usePrimaryNavFocus(element: Ref, key: string) {
  const {
    focus,
    setFocus,
    navCollapsed,
    hasQuickExit,
    hasUserActions
  }: IRplPrimaryNavFocusOptions = inject('navFocus')

  watch(focus, async (value) => {
    const el = element?.value?.$el || element?.value

    if (el && value === key) {
      el.focus()
      await nextTick()
      setFocus('')
    }
  })

  const forceFocus = (selector: string): boolean => {
    const element = document.querySelector<HTMLInputElement>(selector)

    if (element) {
      element?.focus()
      setFocus('')
    }

    return Boolean(element)
  }

  return {
    setFocus,
    forceFocus,
    navCollapsed,
    hasQuickExit,
    hasUserActions
  }
}
