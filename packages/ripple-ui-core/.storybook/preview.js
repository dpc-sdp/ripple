import IconSprite from './../src/assets/icons/sprite.svg?component'
import './storybook.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}
export const decorators = [
  (story) => ({
    components: { story, IconSprite },
    template: '<div><IconSprite style="display: none;" /><story /></div>'
  })
]
