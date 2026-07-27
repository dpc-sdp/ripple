import '@dpc-sdp/ripple-ui-styles/global'
import { type Preview, setup } from '@storybook/vue3-vite'
import RplIconSprite from './../src/components/icon/RplIconSprite.vue'
import RplImg from './../src/components/image/RplImg.vue'
import RplLink from './../src/components/link/RplLink.vue'

setup((app) => {
  // Ripple vue plugins

  app.component('RplLink', RplLink)
  app.component('RplImg', RplImg)
})

const preview: Preview = {
  decorators: [
    (story) => ({
      components: { story, RplIconSprite },
      template: '<div><RplIconSprite /><story /></div>'
    })
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
