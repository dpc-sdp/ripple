import { addDecorator, configure } from '@storybook/vue'
import Vue from 'vue'
import { addReadme } from 'storybook-readme/vue'
import { withInfo } from 'storybook-addon-vue-info'

// Apply our Ripple global styles on storybook
import '@dpc-sdp/ripple-global/style.scss'
// // Apply storybook specific style
import '../storybook-components/scss/story.scss'

import RplGlobal from '@dpc-sdp/ripple-global'
import RplMarkupExamplePlugins from '@dpc-sdp/ripple-markup/examplePlugins'

// Install Ripple Global plugin
Vue.use(RplGlobal, { rplMarkup: {plugins: RplMarkupExamplePlugins, options: { decodeEntities: false }}})

addDecorator(withInfo)
addDecorator(addReadme)

function loadStories() {
  require('./../../packages/components/Atoms/Button/stories.js'),
  require('./../../packages/components/Atoms/Link/stories.js'),
  require('./../../packages/components/Atoms/MetaTag/stories.js')
  require('./../../packages/components/Molecules/Alert/stories.js')
  require('./../../packages/components/Molecules/AnchorLinks/stories.js')
  require('./../../packages/components/Molecules/Breadcrumbs/stories.js')
  require('./../../packages/components/Molecules/Card/stories.js')
  require('./../../packages/components/Molecules/Contact/stories.js')
  require('./../../packages/components/Molecules/DescriptionList/stories.js')
  require('./../../packages/components/Molecules/DocumentLink/stories.js')
  require('./../../packages/components/Molecules/EmbeddedVideo/stories.js')
  require('./../../packages/components/Molecules/Figure/stories.js')
  require('./../../packages/components/Molecules/Form/stories.js')
  require('./../../packages/components/Molecules/List/stories.js')
  require('./../../packages/components/Molecules/Map/stories.js')
  require('./../../packages/components/Molecules/Pagination/stories.js')
  require('./../../packages/components/Molecules/PublishDateAndAuthor/stories.js')
  require('./../../packages/components/Molecules/RelatedLinks/stories.js')
  require('./../../packages/components/Molecules/ShareThis/stories.js')
  require('./../../packages/components/Molecules/Sitemap/stories.js')
  require('./../../packages/components/Molecules/Timeline/stories.js')
  require('./../../packages/components/Molecules/WhatsNext/stories.js')
  // TODO: require all components
}

configure(loadStories, module)
