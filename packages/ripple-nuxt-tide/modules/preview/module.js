module.exports = function () {
  const options = this.options.tide

  this.options.proxy = {
    ...this.options.proxy,
    '/oauth/token': {
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
      login: '/oauth/login',
      logout: '/',
      home: '/oauth/success',
      callback: '/oauth/login'
    }
  }])

  this.extendRoutes((routes, resolve) => {
    routes.push({
      name: 'login',
      path: '/oauth/login',
      component: resolve(__dirname, 'pages', 'Login.vue')
    },
    {
      name: 'loginsuccess',
      path: '/oauth/success',
      component: resolve(__dirname, 'pages', 'Success.vue')
    })
  })
}
