import { onMounted, onUnmounted } from 'vue'

export default (refItm, callback) => {
  if (window) {
    const resizeObserver = new ResizeObserver((entries) => {
      callback(entries[0].contentRect.height)
    })
    onMounted(() => {
      if (refItm.value) {
        resizeObserver.observe(refItm.value)
        window.addEventListener('resize', callback)
      }
    })
    onUnmounted(() => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', callback)
    })
  }
}
