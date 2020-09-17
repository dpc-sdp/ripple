module.exports = function () {
  // Register `@nuxtjs/auth` module
  this.addModule(['@nuxtjs/auth', {
    strategies: {
      drupal: {
        _scheme: 'oauth2',
        authorization_endpoint: `${process.env.CONTENT_API_SERVER}/oauth/authorize`,
        access_token_endpoint: `${process.env.CONTENT_API_SERVER}/oauth/token`
        client_id: process.env.CONTENT_API_CLIENT_ID,
        scope: [process.env.OAUTH_SCOPE, 'authenticated'],
        response_type: 'code',
        userinfo_endpoint: false
      }
    }
  }])

  this.extendRoutes((routes, resolve) => {
    routes.push({
      // OAuth Preview Links
      name: 'login',
      path: '/login',
      component: resolve(__dirname, 'pages', 'Login.vue')
    })
  })
}
