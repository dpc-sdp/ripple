import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'

export default ({ store, isHMR, app }) => {
  if (isHMR) return
  // add persisted state as a vue mounted mixin
  if (!app.mixins) {
    app.mixins = []
  }
  app.mixins.push({
    mounted () {
      const cookieExpiry = null // in days or null for session
      const inDaysFromNow = (x) => new Date(new Date().getDate() + x)

      createPersistedState({
        key: 'alert',
        paths: ['tideAlerts.dismissedAlerts'],
        storage: {
          getItem: key => Cookies.get(key),
          setItem: (key, value) => Cookies.set(key, value, {expires: cookieExpiry ? inDaysFromNow(cookieExpiry) : null}),
          removeItem: key => Cookies.remove(key)
        }
      })(store)
    }
  })
}
