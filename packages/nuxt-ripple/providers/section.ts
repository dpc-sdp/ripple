import type { ProviderGetImage } from '@nuxt/image'

export const getImage: ProviderGetImage = (src, { modifiers = {} } = {}) => {
  const width = modifiers.width || null

  return {
    url: `${src.replace(/\/$/, '')}${width ? '?' + `width=${width}` : ''}`
  }
}
