
const formatThemeStyle = (themeObj) => {
  if (themeObj) {
    return Object.keys(themeObj).map(key => {
      return `--${key}: ${themeObj[key]}`
    }).join(`;\r\n`)
  }
}

export default (siteTheme) => {
  // @ts-ignore Nuxt auto import
  const appConfig = useAppConfig()
  return formatThemeStyle(siteTheme || appConfig.theme)
}
