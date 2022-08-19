import { RplIconSprite } from '@dpc-sdp/ripple-ui-core'
import { registerRplFormPlugin } from '@dpc-sdp/ripple-ui-forms'
import '@dpc-sdp/ripple-ui-core/style'
import { withCssResources } from '@storybook/addon-cssresources'
import { withDesign } from 'storybook-addon-designs'
import VueSocialSharing from 'vue-social-sharing'
import { app } from '@storybook/vue3'

// Storybook specific CSS
import './storybook.css'

// Add SVG based image placeholder for use in all stories
import svgPlaceholder from '~/storybook/utils/svgPlaceholder'
window.svgPlaceholder = svgPlaceholder

// Ripple vue plugins
app.use(VueSocialSharing)
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
  cssresources: [
    {
      id: 'Light theme',
      code: `<link rel="stylesheet" type="text/css" href="/themes/dark-on-light.css"></link>`,
      picked: false,
      hideCode: true
    }
  ]
}
export const decorators = [
  withCssResources,
  (story) => ({
    components: { story, RplIconSprite },
    template: '<div><RplIconSprite /><story /></div>'
  }),
  withDesign
]
