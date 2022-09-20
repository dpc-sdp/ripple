import { RplIconSprite } from '@dpc-sdp/ripple-ui-core'
import { registerRplFormPlugin } from '@dpc-sdp/ripple-ui-forms'
import '@dpc-sdp/ripple-ui-core/style'
import { withCssResources } from '@storybook/addon-cssresources'
import { withDesign } from 'storybook-addon-designs'
import VueSocialSharing from 'vue-social-sharing'
import { app } from '@storybook/vue3'
import themes from './themes.json'
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
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: 'white',
      },
      {
        name: 'gray',
        value: 'var(--rpl-clr-neutral-100)',
      },
      {
        name: 'reverse',
        value: 'var(--rpl-clr-primary-alt)',
      },
    ],
  },
  designTokensCss: {
    label: "Themes",
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
  withDesign
]
