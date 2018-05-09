import { configure } from '@storybook/vue'

import Vue from 'vue'
import RplGlobal from '../src/components/Atoms/Global'

// Install Ripple Global plugin
Vue.use(RplGlobal)

// automatically import all files ending in *.stories.js
const req = require.context('../src/components', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module)
