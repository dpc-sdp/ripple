import { withCssResources } from '@storybook/addon-cssresources'
import { withDesign } from 'storybook-addon-designs'
import { app } from '@storybook/vue3'
import { registerRplFormPlugin } from '@dpc-sdp/ripple-ui-forms'
import { RplIconSprite } from '@dpc-sdp/ripple-ui-core/vue'
import '@dpc-sdp/ripple-ui-core/style'
import themes from './themes.json'
import withBackground from './utils/withBackground'
import svgPlaceholder from './utils/svgPlaceholder'
import { withSource } from './utils/withSource'
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
  },
  designTokensCss: {
    label: 'Themes',
    persistData: true,
    themes
  }
}

export const decorators = [
  withCssResources,
  (story) => ({
    components: { story, RplIconSprite },
    template: '<div><RplIconSprite /><story /></div>'
  }),
  withBackground,
  withDesign,
  withSource
]
