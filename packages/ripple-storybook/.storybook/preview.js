import { app } from '@storybook/vue3'
import { registerRplFormPlugin } from '@dpc-sdp/ripple-ui-forms'
import { RplIconSprite } from '@dpc-sdp/ripple-ui-core'
import '@dpc-sdp/ripple-ui-core/style'
import withBackground from './utils/withBackground'
import svgPlaceholder from './utils/svgPlaceholder'
// Storybook specific CSS
import './storybook.css'

// Add SVG based image placeholder for use in all stories
window.svgPlaceholder = svgPlaceholder

// Ripple vue plugins
registerRplFormPlugin(app)

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      order: ['Base Styles', 'Core', '*', 'WIP']
    }
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  backgrounds: {
    disable: true
  }
}

export const decorators = [
  (story) => ({
    components: { story, RplIconSprite },
    template: '<div><RplIconSprite /><story /></div>'
  }),
  withBackground
]
