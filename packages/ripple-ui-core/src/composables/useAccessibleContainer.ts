import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useEventListener } from '@vueuse/core'

export function useAccessibleContainer(
  callback = 'triggerClick',
  setActive = 'setActive',
  setInactive = 'setInactive'
) {
  const checkLeftMouseButton = (evt: MouseEvent) => {
    // https://stackoverflow.com/a/3944291
    evt = evt || window.event
    if ('buttons' in evt) {
      return evt.buttons === 1
    }
    return evt.button === 1
  }

  // container is a RplCard or any comp with a "setActive"/"setInactive" interface
  const container: any = ref(null)
  // trigger is a RplTextLink or any comp with a "callback" interface
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
        if (trigger.value !== e.target) {
          trigger.value[callback]()
        }
      }
    }
  })

  onMounted(() => {
    container.value[setActive]()
  })

  onBeforeUnmount(() => {
    container.value[setInactive]()
  })

  return { container, trigger }
}
