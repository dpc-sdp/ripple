/**
 * Nuxt image provider to support Section.io image modifiers.
 * https://image.nuxt.com/advanced/custom-provider
 * Note: section only currently supports width param for Optidash
 *
 * Generates an image URL with optional width modifier.
 *
 * @param src - The source URL of the image.
 * @param options - An object containing optional modifiers.
 * @param options.modifiers - An object containing optional image modifiers.
 * @param options.modifiers.width - The desired width of the image.
 * @returns An object containing the generated image URL.
 */
import type { ProviderGetImage } from '@nuxt/image'

export const getImage: ProviderGetImage = (src, { modifiers = {} } = {}) => {
  const width = modifiers.width || null

  return {
    url: `${src.replace(/\/$/, '')}${width ? '?' + `width=${width}` : ''}`
  }
}
