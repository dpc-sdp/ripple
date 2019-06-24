import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'
import cookie from 'cookie'

export default ({ store, req }) => {
  const cookieExpiry = null // in days or null for session
  const inDaysFromNow = (x) => new Date(new Date().getDate() + x)

  createPersistedState({
    key: 'authenticatedContent',
    paths: ['tideAuthenticatedContent.token'],
    storage: {
      // For SSR use cookie headers as the token is needed to request the content
      getItem: key => process.server ? cookie.parse(req.headers.cookie)[key] : Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, {
        expires: cookieExpiry ? inDaysFromNow(cookieExpiry) : null
      }),
      removeItem: key => Cookies.remove(key)
    }
  })(store)
}
