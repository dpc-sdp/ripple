async function getSiteAlert (app) {
  try {
    const response = await app.$tide.get(`node/alert`, {include: ['field_alert_type']})
    const fetched = Date.now()

    if (response.meta && response.meta.count > 0 && response.data.length > 0 && response.included) {
      const data = response.data[0] // only one alert should be displayed
      const title = data.attributes.title
      const alertId = data.id
      const type = response.included[0].attributes.name
      const revision = data.attributes.revision_timestamp
      const link = {
        text: data.attributes.field_call_to_action.title,
        url: data.attributes.field_call_to_action.url || data.attributes.field_call_to_action.uri
      }
      if (alertId && title && type && link && revision) {
        return {
          alertId,
          title,
          type,
          link,
          revision,
          fetched
        }
      }
    }
  } catch (error) {
    if (process.server) {
      console.error(new Error(`Get alert from Tide failed: ${error}`))
    }
  }
  return null
}

export default ({ app, store, route }) => {
  // Register Tide Alerts Vuex module
  if (store) {
    const storeModule = {
      namespaced: true,
      state: () => ({
        alert: null,
        dismissedAlerts: []
      }),
      mutations: {
        setAlerts (state, alert) {
          state.alert = alert
        },
        dismissAlert (state, alertId) {
          if (!state.dismissedAlerts.includes(id => id !== alertId)) {
            state.dismissedAlerts.push(alertId)
          }
        }
      },
      actions: {
        async init ({ commit, dispatch }) {
          if (process.server) {
            const siteAlerts = await getSiteAlert(app)
            commit('setAlerts', siteAlerts)
          }
        }
      }
    }

    // In SSR, Vuex regiseter store module on both server side and client side.
    // That causes the moudle store states will be reset in client side.
    // We only need to mutate the state in server side.
    // So after state created, we don't register again in client side.
    store.registerModule('tideAlerts', storeModule, { preserveState: !!store.state.tideAlerts })
  }
}
