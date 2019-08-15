import { get } from 'lodash'
import moment from 'moment'
const fetchInterval = 1 // interval in minutes to refetch
export default function ({ app, store }) {
  if (process.client) {
    app.router.afterHooks.push(() => {
      const lastFetched = get(store, 'state.tide.siteData.lastFetched')
      if (lastFetched) {
        const lastFetchedTime = moment(lastFetched)
        const now = moment()
        if (now.diff(lastFetchedTime, 'minutes') >= fetchInterval) {
          store.dispatch('tide/setSiteData')
        }
      }
    })
  }
}
