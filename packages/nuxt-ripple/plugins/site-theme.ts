import { useAppConfig, useHead, useLogger } from '#imports'
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
    const logger = useLogger()

    logger.info('tide:page hook was triggered', {
      label: 'site-theme.ts'
    })

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
