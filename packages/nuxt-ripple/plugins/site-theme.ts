import { useAppConfig, useHead } from '#imports'
import { defu as defuMerge } from 'defu'

const formatThemeStyle = (themeObj) => {
  if (themeObj) {
    return Object.keys(themeObj)
      .map((key) => {
        return `--${key}: ${themeObj[key]}`
      })
      .join(`;\r\n`)
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('tide:page', ({ site }) => {
    const siteTheme = defuMerge(
      site?.theme,
      useAppConfig()?.ripple?.theme || {}
    )
    const style = formatThemeStyle(siteTheme)
    if (style) {
      useHead({
        style: [
          {
            children: `:root, body { ${style} }`
          }
        ]
      })
    }
  })
})
