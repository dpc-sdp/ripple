import { useAppConfig, useHead } from '#imports'
import { computed, provide } from 'vue'

export default (page: any) => {
  const languages = useAppConfig()?.ripple?.languages

  const locale = computed(() => {
    const lang = page?.meta?.additional?.find(
      (meta: any) =>
        meta.tag === 'meta' && meta.attributes?.property === 'og:locale'
    )

    return lang?.attributes?.content?.toLowerCase() || page.meta?.langcode
  })

  const language = computed(() => languages?.[locale.value] || null)

  const font = computed(() =>
    language.value ? `rpl-u-font-lang--${locale.value}` : null
  )

  const direction = computed(() => (language.value?.rtl ? 'rtl' : 'ltr'))

  if (language.value) {
    useHead({
      link: [{ rel: 'stylesheet', href: language.value?.url }],
      style: [
        {
          children: `
           .${font.value} { font-family: '${language.value?.name}', var(--rpl-type-font-family) }
          `
        }
      ]
    })
  }

  provide('language', { locale, direction, font })

  return { locale, direction, font }
}
