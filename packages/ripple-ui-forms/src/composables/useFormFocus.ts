import { useMediaQuery } from '@vueuse/core'

export default function useFormFocus() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  const fieldContainerSelector = '.rpl-form__outer'

  const scrollToFormElement = (element, offset = null) => {
    if (!element) {
      return
    }

    const navHeight = 92
    const top = element.getBoundingClientRect().top

    if (!offset) {
      offset = top < 0 ? navHeight : 10
    }

    const elementYPos = top + window.scrollY - offset

    window.scrollTo({
      top: elementYPos,
      behavior: prefersReducedMotion.value ? 'auto' : 'smooth'
    })
  }

  const focusFormElement = (fieldId: string) => {
    // First look for this data attribute which allows inputs to specify exactly which element should be focused
    let input: HTMLElement = document.querySelector(
      `[data-rpl-focus-input="${fieldId}"]`
    )

    // Then fallback to just getting the element by it's id
    if (!input) {
      input = document.getElementById(fieldId)
    }

    if (input) {
      // Try to get the wrapper of the input as a nicer target for scrolling, otherwise fallback to scrolling to the input itself
      const container = input.closest(fieldContainerSelector)

      input.focus({ preventScroll: true })

      if (container) {
        scrollToFormElement(container)
      } else {
        scrollToFormElement(input)
      }
    }
  }

  return {
    focusFormElement,
    scrollToFormElement
  }
}
