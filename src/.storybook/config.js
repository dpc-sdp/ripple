import { addDecorator, configure } from '@storybook/vue'
import Vue from 'vue'
import { addReadme } from 'storybook-readme/vue'
import { withInfo, setDefaults } from 'storybook-addon-vue-info'

// Apply our Ripple global styles on storybook
import '@dpc-sdp/ripple-global/style.scss'
// Apply storybook specific style
import '../storybook-components/scss/story.scss'

import RplGlobal from '@dpc-sdp/ripple-global'
import RplMarkupExamplePlugins from '@dpc-sdp/ripple-markup/examplePlugins'

// Install Ripple Global plugin
Vue.use(RplGlobal, { rplMarkup: {plugins: RplMarkupExamplePlugins, options: { decodeEntities: false }}})

addDecorator(withInfo)
addDecorator(addReadme)

setDefaults({
  header: false,
  docsInPanel: true
})

const req = require.context('./../../packages/components', true, /.stories.js$/);

function loadStories() {
  // require('./../../packages/components/Atoms/Button/stories.js')
  req.keys().forEach((filename) => req(filename))
  // require('../src/storybook-components/stories')
}

configure(loadStories, module)
