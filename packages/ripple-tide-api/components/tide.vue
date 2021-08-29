<template>
<div>
  <div class="rpl-page" :class="`rpl-page--${page.type}`" v-if="page && !error && pageComponent">
    <component :is="pageComponent" :page="page"></component>
  </div>
  <error-page v-else :error="error"></error-page>
</div>
</template>

<script>
import errorPage from './error'

const isPreviewPath = path => {
  return path.indexOf('/preview/') === 0
}

export default {
  components: {
    errorPage
  },
  async asyncData ({ route, app, store, req, error, $config, res, redirect }) {
    try {
      const reqHeaders = {}
      if (isPreviewPath(route.path)) {
        if (!app.$auth.loggedIn) {
          redirect(`/oauth/login?destination=${req.url}`)
        }
      }
      const {
        data,
        headers
      } = await app.$tideApi.get(
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
          // /* Set Page metadata */
          // store.dispatch('page/setPageHead', { page: data, path: route.path })
          // /* Set Page type */
          // store.dispatch('page/setType', data.type)
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
        return {
          error: data,
          tideModules: app.$tideModules
        }
      }
    } catch (err) {
      error({ message: 'Oops there was an error', statusCode: 500 })
    }
  },
  computed: {
    pageComponent () {
      if (this.page && this.page.type) {
        try {
          return this.$tideApi.getModuleComponent(this.page.type)
        } catch (error) {
          return null
        }
      }
    }
  }
}
</script>

