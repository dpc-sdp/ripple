import { configure } from '@storybook/vue'
import Vue from 'vue'

// Apply our Ripple global styles on storybook
import '@dpc-sdp/ripple-global/style.scss'
// Apply storybook specific style
import '../storybook-components/scss/story.scss'

import RplGlobal from '@dpc-sdp/ripple-global'
import RplMarkupExamplePlugins from '@dpc-sdp/ripple-markup/examplePlugins'

export const parameters = {
  a11y: {
    element: '#root',
    config: {},
    options: {},
    manual: true,
  },
  docs: {
    // Set a smaller default height.
    iframeHeight: '60px',
    // Disable Docs globally for now until we got time to update them.
    // We are still able to add Docs in component level.
    // https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/docspage.md#replacing-docspage
    page: null,
    // We'd better to use inline stories to replace iframe.
    // However multi stories with same knob name in one docs page will be overridden.
    // We need to migrate knobs to control in v6.
    // https://github.com/storybookjs/storybook/blob/next/addons/controls/README.md#how-do-i-migrate-from-addon-knobs
    inlineStories: true
  },
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#edfafc' }
    ],
  },
  knobs: {
    // To allow knob text type to support v-html prop.
    escapeHTML: false,
  }
}

// Install Ripple Global plugin
Vue.use(RplGlobal, { imgQueryString: false, rplMarkup: {plugins: RplMarkupExamplePlugins, options: { decodeEntities: false }}})

configure(require.context('./../../packages/components', true, /(stories\.js|mdx)$/), module)
