import { configure } from '@storybook/vue'
import { setOptions } from '@storybook/addon-options'

// Apply our Ripple global styles on storybook
import './../packages/Atoms/Global/style.scss';

import Vue from 'vue'
import RplGlobal from './../packages/Atoms/Global'

// Install Ripple Global plugin
Vue.use(RplGlobal)

setOptions({
  name: 'Ripple',
})

// automatically import all files ending in *.stories.js
const req = require.context('../packages', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
  require('../src/storybook-components/stories');
}

configure(loadStories, module)
