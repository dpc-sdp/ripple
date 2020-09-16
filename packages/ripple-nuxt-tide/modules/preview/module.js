module.exports = function () {
  const options = this.options.tide

  this.options.proxy = {
    ...this.options.proxy,
    '/oauth/': {
      target: options.baseUrl
    }
  }

  // Register `@nuxtjs/auth` module
  this.addModule(['@nuxtjs/auth', {
    strategies: {
      drupal: {
        _scheme: 'oauth2',
        authorization_endpoint: `${process.env.CONTENT_API_SERVER}oauth/authorize`,
        access_token_endpoint: `/oauth/token`,
        userinfo_endpoint: false,
        response_type: 'code',
        client_id: process.env.CONTENT_API_CLIENT_ID,
        scope: ['editor', 'authenticated'],
        tokenName: 'X-OAuth2-Authorization',
        token_type: 'Bearer',
        grant_type: 'authorization_code'
      }
    },
    rewriteRedirects: true,
    redirect: {
      login: '/login',
      logout: '/',
      home: '/loginsuccess',
      callback: '/login'
    }
  }])

  this.extendRoutes((routes, resolve) => {
    routes.push({
      name: 'login',
      path: '/login',
      component: resolve(__dirname, 'pages', 'Login.vue')
    },
    {
      name: 'loginsuccess',
      path: '/loginsuccess',
      component: resolve(__dirname, 'pages', 'Success.vue')
    })
  })
}
