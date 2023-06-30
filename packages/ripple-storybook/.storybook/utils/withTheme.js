import themes from '../themes.js'
import { shallowReactive, h, provide } from 'vue'

// Function to obtain the intended theme
const getTheme = (themeName) => {
  return Object.entries(themes[themeName]?.tokens || {}).reduce(
    (result, [key, value]) => {
      return {
        ...result,
        [`--${key}`]: value
      }
    },
    {}
  )
}

const settings = shallowReactive({ style: '' })
const buttonSettings = shallowReactive({ buttonTheme: 'default' })

const withTheme = (storyFn, context) => {
  settings.style = getTheme(context.globals.theme)
  buttonSettings.buttonTheme = context.globals.buttonTheme || 'default'
  const story = storyFn()

  return {
    components: { story },
    setup() {
      provide('featureFlags', buttonSettings)
    },
    render: () => h('div', settings, h(story))
  }
}

export default withTheme
