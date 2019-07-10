import { addDecorator, configure, addParameters } from '@storybook/vue'
import { withA11y } from '@storybook/addon-a11y'
import Vue from 'vue'

// Apply our Ripple global styles on storybook
import '@dpc-sdp/ripple-global/style.scss'
// Apply storybook specific style
import '../storybook-components/scss/story.scss'

import RplGlobal from '@dpc-sdp/ripple-global'
import RplMarkupExamplePlugins from '@dpc-sdp/ripple-markup/examplePlugins'

addDecorator(withA11y)

// Install Ripple Global plugin
Vue.use(RplGlobal, { rplMarkup: {plugins: RplMarkupExamplePlugins, options: { decodeEntities: false }}})

const req = require.context('./../../packages/components', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module)
