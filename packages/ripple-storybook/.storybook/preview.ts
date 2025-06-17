import { setup, type Preview } from '@storybook/vue3'
// @ts-ignore-next-line: Missing declaration
import { registerRplFormPlugin } from '@dpc-sdp/ripple-ui-forms'
import registerRplMapsPlugin from '@dpc-sdp/ripple-ui-maps/plugin'
// Note: rebuild ripple-ui-core after generating sprite to update in storybook
// @ts-ignore-next-line: Vue SFC
import {
  RplIconSprite,
  RplLink,
  RplImg,
  RplIcon,
  RplButton,
  RplContent,
  RplTextLink
} from '@dpc-sdp/ripple-ui-core/vue'
import '@dpc-sdp/ripple-ui-core/style'
import themes from './themes.js'
import withBackground from './utils/withBackground'
import { withSource } from './utils/withSource'
// Storybook specific CSS
import './storybook.css'
import withTheme from './utils/withTheme'
import withEventBus from './utils/withEventBus'

setup((app) => {
  // Ripple vue plugins
  registerRplFormPlugin(app)
  registerRplMapsPlugin(app, {})

  app.component('RplLink', RplLink)
  app.component('RplImg', RplImg)
  // Add global components needed for forms
  app.component('RplIcon', RplIcon)
  app.component('RplButton', RplButton)
  app.component('RplContent', RplContent)
  app.component('RplTextLink', RplTextLink)
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    a11y: {
      test: 'error',
      options: {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa']
        }
      }
    },
    options: {
      storySort: {
        order: ['Introduction', 'Base Styles', 'Core', '*', 'WIP']
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
  },
  decorators: [
    (story) => ({
      components: { story, RplIconSprite },
      template: '<div><RplIconSprite /><story /></div>'
    }),
    withBackground,
    withTheme,
    withSource,
    withEventBus
  ],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Ripple theme',
      defaultValue: 'default',
      toolbar: {
        icon: 'paintbrush',
        title: 'Theme',
        items: Object.entries(themes).map(([themeId, config]) => {
          return {
            value: themeId,
            title: config.label
          }
        }),
        dynamicTitle: true
      }
    },
    buttonTheme: {
      name: 'Button theme',
      description: 'Turn on/off neutral themed buttons across all components',
      defaultValue: 'default',
      toolbar: {
        icon: 'button',
        title: 'Button theme',
        items: [
          { title: 'Default buttons', value: 'default' },
          { title: 'Neutral buttons', value: 'neutral' }
        ],
        dynamicTitle: true
      }
    }
  }
}

export default preview
