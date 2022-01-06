export const redirect = {
  login: '/oauth/login',
  logout: '/',
  home: '/oauth/success',
  callback: '/oauth/login'
}

export const isPreviewPath = (path) => {
  return path.indexOf('/preview/') === 0
}

export const isSharePath = (path) => {
  return path.indexOf('/share_link/') === 0
}

export default async function useTide ({ route, app, store, req, error, $config, res, redirect }) {
  try {
    const reqHeaders = {}
    if (isPreviewPath(route.path)) {
      if (!app.$auth.loggedIn) {
        redirect(`/oauth/login?destination=${req.url}`)
      }
    }

    const { data, headers } = await app.$tideApi.get(
      `/page?path=${route.path}&site=${$config.SITEID}`,
      { headers: reqHeaders }
    )
    if (data) {
      if (data && !data.error) {
        /* Handle redirects */
        if (data.type === 'redirect') {
          if (data.redirect_type === 'internal') {
            redirect(data.status_code, data.redirect_url)
          }
        }
        /* Set Page metadata */
        store.dispatch('page/setPageHead', { page: data, path: route.path })
        /* Set Page type */
        store.dispatch('page/setType', data.type)
        /* Set Section cache tags */
        if (process.server && res) {
          if (headers && headers.hasOwnProperty('section-cache-tags')) {
            res.setHeader('section-cache-tags', headers['section-cache-tags'])
          }
        }
        return {
          page: data
        }
      }
    }
  } catch (err) {
    // error({ message: 'Oops there was an error', statusCode: 500 })
    return {
      error: err
    }
  }
}
