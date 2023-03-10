import { computed } from 'vue'

export default (src: string, width: number) => {
  // @ts-ignore Nuxt auto import
  const config = useRuntimeConfig()
  return computed(
    () => `${config.tide.baseUrl.slice(0, -1)}${src}?width=${width}`
  )
}
