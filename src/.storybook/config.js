import { addDecorator, configure } from '@storybook/vue'
import Vue from 'vue'
import { addReadme } from 'storybook-readme/vue'

// Apply our Ripple global styles on storybook
import '@dpc-sdp/ripple-global/style.scss'
// // Apply storybook specific style
// import '../storybook-components/scss/story.scss';

import RplGlobal from '@dpc-sdp/ripple-global'
import RplMarkupExamplePlugins from '@dpc-sdp/ripple-markup/examplePlugins'

// Install Ripple Global plugin
Vue.use(RplGlobal, { rplMarkup: {plugins: RplMarkupExamplePlugins, options: { decodeEntities: false }}})

addDecorator(addReadme)

function loadStories() {
  require('./../../packages/components/Atoms/Button/stories.js')
  // TODO: require all components stories
}

configure(loadStories, module)
