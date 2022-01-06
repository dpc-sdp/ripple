import pageStore from '@dpc-sdp/ripple-nuxt/lib/store/page'
import siteStore from '@dpc-sdp/ripple-nuxt/lib/store/site'

export default ({ store }) => {
  if (store) {
    store.registerModule('page', pageStore, { preserveState: !!store.state.page })
    store.registerModule('site', siteStore, { preserveState: !!store.state.site })
  }
}
