import { Ref, inject, watch } from 'vue'
import { IRplPrimaryNavFocusOptions } from '../components/primary-nav/constants'

export function usePrimaryNavFocus(element: Ref, key: string) {
  const {
    focus,
    setFocus,
    navCollapsed,
    hasQuickExit,
    hasUserActions
  }: IRplPrimaryNavFocusOptions = inject('navFocus')

  watch(focus, (value) => {
    const el = element?.value?.$el || element?.value

    if (el && value === key) {
      el.focus()
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
