import { unref, onMounted, getCurrentInstance } from 'vue'
import type { Ref } from 'vue'

export function useContainerTrigger(c: Ref, r: Ref) {
  const checkLeftMouseButton = (evt: MouseEvent) => {
    // https://stackoverflow.com/a/3944291
    evt = evt || window.event
    if ('buttons' in evt) {
      return evt.buttons === 1
    }
    return evt.button === 1
  }

  onMounted(() => {
    const card = unref(c)
    const link = unref(r)

    if (card) {
      let up: number
      let down: number
      let isLeftBtn = false

      const instance = getCurrentInstance()?.subTree.el
      if (instance) {
        instance.style.cursor = 'pointer'
        instance.onmousedown = (e: MouseEvent) => {
          if (checkLeftMouseButton(e)) {
            isLeftBtn = true
            down = +new Date()
          }
        }
        instance.onmouseup = (e: MouseEvent) => {
          if (isLeftBtn) {
            e.preventDefault()
            up = +new Date()
            if (up - down < 200) {
              if (link !== e.target) {
                link.triggerClick()
              }
            }
          }
        }
      }
    }
  })
}
