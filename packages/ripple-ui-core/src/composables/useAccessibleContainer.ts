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

  useEventListener(container, 'mousedown', (e: MouseEvent) => {
    if (checkLeftMouseButton(e)) {
      isLeftBtn = true
      down = +new Date()
    }
  })

  useEventListener(container, 'mouseup', (e: MouseEvent) => {
    if (isLeftBtn) {
      e.preventDefault()
      up = +new Date()

      // Add 200ms delay to allow text selection
      if (up - down < 200) {
        // Only fire a click if the target is not the trigger el
        const clickedElement = container.value.$el.querySelector('a')

        if (clickedElement !== e.target) {
          clickedElement.click()
        }
      }
    }
  })

  return { container, trigger }
}
