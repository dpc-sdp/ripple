import IconSprite from './../src/assets/icons/sprite.svg?component'
import { withCssResources } from '@storybook/addon-cssresources'
import { withDesign } from 'storybook-addon-designs'
import { plugin, defaultConfig } from '@formkit/vue'
import './storybook.css'
import './../src/styles/global.css'
import VueSocialSharing from 'vue-social-sharing'
import { app } from '@storybook/vue3'
app.use(VueSocialSharing)
app.use(plugin, defaultConfig({}))

import svgPlaceholder from './components/svgPlaceholder'
window.svgPlaceholder = svgPlaceholder

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      order: ['Base Styles', 'Components', '*']
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
    components: { story, IconSprite },
    template: '<div><IconSprite style="display: none;" /><story /></div>'
  }),
  withDesign
]
