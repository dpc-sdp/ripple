const rtlLangs = ['ar', 'aii', 'fa', 'haz', 'prs', 'ps', 'ur']

const fontConfigs = {
  'ar': 'https://fonts.googleapis.com/earlyaccess/notokufiarabic.css',
  'aii': 'https://fonts.googleapis.com/earlyaccess/notosanssyriaceastern.css',
  'fa': 'https://fonts.googleapis.com/earlyaccess/notonaskharabic.css',
  'cld': 'https://fonts.googleapis.com/earlyaccess/notonaskharabic.css',
  'ur': 'https://fontlibrary.org/face/nafees-nastaleeq',
  'hi': 'https://fonts.googleapis.com/earlyaccess/notosansdevanagari.css',
  'ta': 'https://fonts.googleapis.com/earlyaccess/notosanstamil.css',
  'bn': 'https://fonts.googleapis.com/earlyaccess/notosansbengali.css',
  'el': 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
  'my': 'https://fonts.googleapis.com/earlyaccess/notosansmyanmar.css',
  'am': 'https://fonts.googleapis.com/earlyaccess/notosansethiopic.css',
  'zh-Hans': 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap',
  'zh-Hant': 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap',
  'prs': 'https://fonts.googleapis.com/earlyaccess/notonaskharabic.css',
  'ps': 'https://fonts.googleapis.com/earlyaccess/notonaskharabic.css',
  'gu': 'https://fonts.googleapis.com/earlyaccess/notosansgujarati.css',
  'haz': 'https://fonts.googleapis.com/earlyaccess/notonaskharabic.css',
  'ja': 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap',
  'kar': 'https://fonts.googleapis.com/css2?family=Padauk:wght@400;700&display=swap',
  'kyu': 'https://fonts.googleapis.com/css2?family=Noto+Sans+Kayah+Li:wght@400;700&display=swap',
  'km': 'https://fonts.googleapis.com/earlyaccess/notosanskhmer.css',
  'ko': 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap',
  'mk': 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap',
  'ne': 'https://fonts.googleapis.com/css2?family=Cambay:wght@400;700&display=swap',
  'pa': 'https://fonts.googleapis.com/earlyaccess/notosansgurmukhi.css',
  'ru': 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
  'sr': 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
  'si': 'https://fonts.googleapis.com/earlyaccess/notosanssinhala.css',
  'th': 'https://fonts.googleapis.com/earlyaccess/notosansthai.css',
  'ti': 'https://fonts.googleapis.com/earlyaccess/notosansethiopic.css',
  'vi': 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'
}

const addLangFonts = (lang, links) => {
  const fontLink = fontConfigs[lang]
  if (fontLink) {
    links.push({
      rel: 'preload',
      href: fontLink,
      as: 'style'
    })
    links.push({
      rel: 'stylesheet',
      href: fontLink
    })
  }

  return links
}

// Add Language to page data
export default (context, pageData) => {
  if (!pageData.tidePage) {
    return
  }

  const page = pageData.tidePage

  // Get current lang
  const lang = (page.appMetatag && page.appMetatag.lang) || page.langcode || 'en'
  pageData.tidePage.appLang = lang
  pageData.tidePage.appRTL = false

  if (lang === 'en') {
    return
  }

  pageData.tidePage.class = pageData.tidePage.class || []
  pageData.tidePage.class.push(`rpl-lang--${lang}`)

  // Set RTL
  if (rtlLangs.includes(lang)) {
    pageData.tidePage.appRTL = true
  }

  // Set head links for language fonts
  const links = pageData.tidePage.appHeadLinks || []
  pageData.tidePage.appHeadLinks = addLangFonts(lang, links)
}
