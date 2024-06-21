import { useAppConfig, useHead } from '#imports'
import { computed } from 'vue'

export default (page: any) => {
  const languages = useAppConfig()?.ripple?.languages

  const locale = computed(() => {
    const lang = page?.meta?.additional?.find(
      (meta: any) =>
        meta.tag === 'meta' && meta.attributes?.property === 'og:locale'
    )

    return (
      lang?.attributes?.content?.toLowerCase() || page?.meta?.langcode || 'en'
    )
  })

  const found = computed(() => languages?.[locale.value] || null)

  const language = computed(() =>
    found.value ? `rpl-u-font-lang--${locale.value}` : null
  )

  const direction = computed(() => (found.value?.rtl ? 'rtl' : 'ltr'))

  if (found.value) {
    useHead({
      link: [{ rel: 'stylesheet', href: found.value?.url }],
      style: [
        {
          children: `
          .${language.value} * { font-family: '${found.value?.name}', var(--rpl-type-font-family) !important }
          `
        }
      ]
    })
  }

  useHead({
    htmlAttrs: {
      lang: language.value || 'en-AU'
    }
  })

  return { locale, direction, language }
}
