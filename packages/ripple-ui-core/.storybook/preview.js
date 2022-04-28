import IconSprite from './../src/assets/icons/sprite.svg?component'
import { withCssResources } from '@storybook/addon-cssresources'
import './storybook.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  cssresources: [
    {
      id: 'Theme Variant 1',
      code: `<link rel="stylesheet" type="text/css" href="/themes/variant-1.css"></link>`,
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
  })
]
