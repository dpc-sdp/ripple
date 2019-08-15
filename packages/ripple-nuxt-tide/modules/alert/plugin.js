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
            return state.alerts[id]
          })
        }
      },
      actions: {
        async setAlerts ({ commit, state }, alertsPayload) {
          if (alertsPayload && alertsPayload.length > 0) {
            alertsPayload.forEach(alert => {
              if (!state.ids.includes(alert.id)) {
                commit('setAlert', alert)
              }
            })
          }
        }
      }
    }
    store.registerModule('tideAlerts', storeModule, { preserveState: !!store.state.tideAlerts })
  }
}
