import { onMounted, onUnmounted } from 'vue'

export default (el, callback) => {
  const resizeObserver = new ResizeObserver((entries) => {
    callback(entries[0])
  })

  onMounted(() => {
    resizeObserver.observe(el)
    window.addEventListener('resize', callback)
  })
  onUnmounted(() => {
    resizeObserver.disconnect()
    window.removeEventListener('resize', callback)
  })
}
