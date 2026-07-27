import { ref } from 'vue'
import { useEventListener } from '@vueuse/core'

export function useAccessibleContainer() {
  const checkLeftMouseButton = (evt: any) => {
    // https://stackoverflow.com/a/3944291
    evt = evt || window.event
    if ('buttons' in evt) {
      return evt.buttons === 1
    }
    return evt.button === 1
  }

  const container: any = ref(null)
  const trigger: any = ref(null)

  let up: number
  let down: number
  let isLeftBtn = false

  useEventListener(container, 'pointerdown', (e: MouseEvent) => {
    if (checkLeftMouseButton(e)) {
      isLeftBtn = true
      down = +new Date()
    }
  })

  useEventListener(container, 'pointerup', (e: MouseEvent) => {
    if (isLeftBtn) {
      e.preventDefault()
      up = +new Date()

      // Add 200ms delay to allow text selection
      if (up - down < 200) {
        const element = container.value?.$el || container.value
        // Only fire a click if the target is not the trigger el
        const clickedElement = element.querySelector('a')
        const targetElement = (e.target as HTMLElement).closest('a')

        if (clickedElement !== targetElement) {
          clickedElement.click()
        }
      }
    }
  })

  return { container, trigger }
}
