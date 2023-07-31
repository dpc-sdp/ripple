import { useHead } from '#imports'
import { computed, provide } from 'vue'

const rtlangs = ['ar', 'aii', 'fa', 'haz', 'he', 'prs', 'ps', 'ur']

const fonts = {
  aii: 'https://fonts.googleapis.com/earlyaccess/notosanssyriaceastern.css',
  am: 'https://fonts.googleapis.com/earlyaccess/notosansethiopic.css',
  ar: 'https://fonts.googleapis.com/earlyaccess/notokufiarabic.css',
  bn: 'https://fonts.googleapis.com/earlyaccess/notosansbengali.css',
  cld: 'https://fonts.googleapis.com/earlyaccess/notonaskharabic.css',
  el: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
  fa: 'https://fonts.googleapis.com/earlyaccess/notonaskharabic.css',
  gu: 'https://fonts.googleapis.com/earlyaccess/notosansgujarati.css',
  haz: 'https://fonts.googleapis.com/earlyaccess/notonaskharabic.css',
  he: 'https://fonts.googleapis.com/earlyaccess/notosanshebrew.css',
  hi: 'https://fonts.googleapis.com/earlyaccess/notosansdevanagari.css',
  ja: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap',
  kar: 'https://fonts.googleapis.com/css2?family=Padauk:wght@400;700&display=swap',
  km: 'https://fonts.googleapis.com/earlyaccess/notosanskhmer.css',
  ko: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap',
  mk: 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap',
  my: 'https://fonts.googleapis.com/earlyaccess/notosansmyanmar.css',
  ne: 'https://fonts.googleapis.com/css2?family=Cambay:wght@400;700&display=swap',
  pa: 'https://fonts.googleapis.com/earlyaccess/notosansgurmukhi.css',
  prs: 'https://fonts.googleapis.com/earlyaccess/notonaskharabic.css',
  ps: 'https://fonts.googleapis.com/earlyaccess/notonaskharabic.css',
  ru: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
  si: 'https://fonts.googleapis.com/earlyaccess/notosanssinhala.css',
  sr: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
  ta: 'https://fonts.googleapis.com/earlyaccess/notosanstamil.css',
  th: 'https://fonts.googleapis.com/earlyaccess/notosansthai.css',
  ti: 'https://fonts.googleapis.com/earlyaccess/notosansethiopic.css',
  ur: 'https://fontlibrary.org/face/nafees-nastaleeq',
  vi: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
  'zh-hans':
    'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap',
  'zh-hant':
    'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap'
}

export default (page: any) => {
  const language = computed(() => {
    const lang = page?.meta?.additional?.find(
      (meta: any) =>
        meta.tag === 'meta' && meta.attributes?.property === 'og:locale'
    )

    return lang?.attributes?.content?.toLowerCase() || 'en'
  })

  const direction = computed(() =>
    rtlangs.includes(language.value) ? 'rtl' : 'ltr'
  )

  provide('language', { language, direction })

  const font = computed(() => fonts[language.value] || null)

  if (font.value) {
    useHead({
      link: [{ rel: 'stylesheet', href: font.value }]
    })
  }

  return { language, direction }
}
