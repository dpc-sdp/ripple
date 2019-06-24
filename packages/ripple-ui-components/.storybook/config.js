import { configure } from '@storybook/vue'
import { setOptions } from '@storybook/addon-options'

// Apply our Ripple global styles on storybook
import './../components/Atoms/Global/style.scss';
// Apply storybook specific style
import './../src/storybook-components/scss/story.scss';

import Vue from 'vue'
import RplGlobal from './../components/Atoms/Global'
import RplMarkupExamplePlugins from './../components/Organisms/Markup/examplePlugins'

// Add custom icons to library.
import { addCustomIcons } from '../components/Atoms/Icon'
addCustomIcons(require.context('../static/custom_icons/', true, /\.svg$/))

// Install Ripple Global plugin
Vue.use(RplGlobal, { rplMarkup: {plugins: RplMarkupExamplePlugins, options: { decodeEntities: false }}})

setOptions({
  name: 'Ripple',
  downPanelInRight: true,
})

// automatically import all files ending in *.stories.js
const req = require.context('../components', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
  require('../src/storybook-components/stories');
}

configure(loadStories, module)
