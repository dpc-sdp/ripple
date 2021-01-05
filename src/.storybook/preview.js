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
    // Disable Docs globally for now until we got time to update them.
    // We are still able to add Docs in component level.
    // https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/docspage.md#replacing-docspage
    page: null,
  },
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#edfafc' }
    ],
  },
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
}

// Install Ripple Global plugin
Vue.use(RplGlobal, { imgQueryString: false, rplMarkup: {plugins: RplMarkupExamplePlugins, options: { decodeEntities: false }}})
