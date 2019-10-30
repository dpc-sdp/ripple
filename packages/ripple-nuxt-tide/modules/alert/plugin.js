import { get } from 'lodash'

export default function ({ app, store }) {
  if (store) {
    const storeModule = {
      namespaced: true,
      state: () => ({
        alerts: {},
        ids: []
      }),
      mutations: {
        setAlert (state, payload) {
          if (!state.ids.includes(payload.id)) {
            state.alerts = {
              ...state.alerts,
              [`${payload.id}`]: {
                ...payload
              }
            }
            state.ids.push(payload.id)
          }
        }
      },
      getters: {
        getAlerts: state => {
          return state.ids.map(id => {
            const siteId = get(store, 'state.tide.siteData.drupal_internal__tid')
            const siteSectionId = get(store, 'state.tideSite.siteSection', siteId)
            if (state.alerts[id].sites.includes(siteSectionId) || state.alerts[id].sites.includes(siteId)) {
              return state.alerts[id]
            }
          }).filter(id => id)
        }
      },
      actions: {
        async setAlerts ({ commit, state }, { alerts, siteSection }) {
          if (alerts && alerts.length > 0) {
            alerts.forEach(alert => {
              // if it doesn't exist or if it has been updated
              if (!state.ids.includes(alert.id) || (state.alerts[alert.id].changed !== alert.changed)) {
                const link = get(alert, 'field_call_to_action', {})
                const sites = get(alert, 'field_node_site', []).map(site => {
                  if (site.drupal_internal__tid) {
                    return site.drupal_internal__tid
                  }
                }).filter(s => s)
                if (siteSection) {
                  sites.push(siteSection)
                }
                const payload = {
                  id: alert.id,
                  changed: alert.changed,
                  title: get(alert, 'title', ''),
                  type: get(alert, 'field_alert_type.name', ''),
                  link: {
                    text: get(link, 'title', ''),
                    url: get(link, 'url', '') || get(link, 'uri', '')
                  },
                  sites
                }
                commit('setAlert', payload)
              }
            })
          }
        }
      }
    }
    store.registerModule('tideAlerts', storeModule, { preserveState: !!store.state.tideAlerts })
  }
}
