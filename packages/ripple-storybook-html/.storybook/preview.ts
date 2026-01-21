import type { Preview } from '@storybook/html'
import '@dpc-sdp/ripple-ui-core/style'
import '@dpc-sdp/ripple-ui-core/style/components'
import themes from './themes.js'
import './storybook.css'

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
        order: ['Introduction', 'HTML Components', '*']
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
    (Story) => {
      // Add SVG sprite to document body if not already present
      if (!document.getElementById('rpl-icon-sprite')) {
        fetch('/sprite.svg')
          .then((response) => response.text())
          .then((svgContent) => {
            const div = document.createElement('div')
            div.innerHTML = svgContent
            const svg = div.querySelector('svg')
            if (svg) {
              svg.style.display = 'none'
              document.body.insertBefore(svg, document.body.firstChild)
            }
          })
          .catch((err) => console.error('Failed to load SVG sprite:', err))
      }

      return Story()
    },
    (Story, context) => {
      document.body.setAttribute(
        'data-rpl-theme',
        context.globals.theme || 'default'
      )

      return Story()
    }
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
    }
  }
}

export default preview
