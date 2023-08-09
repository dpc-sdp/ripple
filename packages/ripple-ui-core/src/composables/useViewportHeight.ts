import { onMounted, onUnmounted, ref } from 'vue'

export function useViewportHeight() {
  const height = ref(0)

  const viewportHeight = () => {
    height.value = window.innerHeight
  }

  onMounted(() => {
    viewportHeight()
    window.addEventListener('resize', viewportHeight)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', viewportHeight)
  })

  return height
}
