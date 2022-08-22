import { onMounted, onBeforeUnmount } from 'vue'
import type { Ref } from 'vue'
import { useEventListener } from '@vueuse/core'

export function useAccessibleCardPattern(card: Ref, trigger: Ref) {
  const checkLeftMouseButton = (evt: MouseEvent) => {
    // https://stackoverflow.com/a/3944291
    evt = evt || window.event
    if ('buttons' in evt) {
      return evt.buttons === 1
    }
    return evt.button === 1
  }

  let up: number
  let down: number
  let isLeftBtn = false

  useEventListener(card, 'mousedown', (e: MouseEvent) => {
    if (checkLeftMouseButton(e)) {
      isLeftBtn = true
      down = +new Date()
    }
  })

  useEventListener(card, 'mouseup', (e: MouseEvent) => {
    if (isLeftBtn) {
      e.preventDefault()
      up = +new Date()

      // Add 200ms delay to allow text selection
      if (up - down < 200) {
        // Only fire a click if the target is not the trigger el
        if (trigger.value !== e.target) {
          trigger.value.triggerClick()
        }
      }
    }
  })

  onMounted(() => {
    card.value.setActive()
  })

  onBeforeUnmount(() => {
    card.value.setInactive()
  })
}
