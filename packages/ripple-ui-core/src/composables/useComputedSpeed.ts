import { ref, onMounted, Ref } from 'vue'

// Takes a container ref and a CSS property and returns the computed speed value in ms
export function useComputedSpeed(
  container: Ref,
  property: string,
  fallback: any = null
): Ref {
  const duration = ref(fallback)

  onMounted(() => {
    duration.value =
      parseFloat(getComputedStyle(container.value).getPropertyValue(property)) *
      1000
  })

  return duration
}
