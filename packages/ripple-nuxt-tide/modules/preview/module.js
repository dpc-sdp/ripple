import { redirect } from './config/paths'
import path from 'path'

module.exports = function () {
  const options = this.options.tide
  const { URL } = require('url')
  const baseUrl = options.baseUrl ? new URL(options.baseUrl).toString() : options.baseUrl

  this.options.proxy = {
    ...this.options.proxy,
    '/oauth/token': {
      target: baseUrl,
      onProxyReq (proxyReq, req, res) {
        // As oauth/token is a proxied request, this authorization header
        // for the nuxt site is not valid for the proxied target.
        // Not removing it will present an unauthorizable user prompt.
        proxyReq.removeHeader('authorization')
      }
    }
  }

  // Using `@nuxtjs/auth-next` instead of `@nuxtjs/auth` due to this bug:
  // https://github.com/nuxt-community/auth-module/issues/761
  // Switch to stable when v5 is released.
  this.addModule(['@nuxtjs/auth-next', {
    strategies: {
      drupal: {
        scheme: 'oauth2',
        endpoints: {
          authorization: `${baseUrl}oauth/authorize`,
          token: `/oauth/token`
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 86400,
          name: 'X-OAuth2-Authorization'
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 1209600
        },
        responseType: 'code',
        grantType: 'authorization_code',
        clientId: process.env.CONTENT_API_OAUTH_CLIENT_ID,
        scope: ['editor', 'authenticated']
      }
    },
    resetOnError: true,
    localStorage: false,
    rewriteRedirects: true,
    redirect: redirect,
    plugins: [ path.resolve(__dirname, 'templates/plugin.js') ]
  }])

  this.extendRoutes((routes, resolve) => {
    routes.push({
      name: 'login',
      path: redirect.login,
      component: resolve(__dirname, 'pages', 'Login.vue')
    },
    {
      name: 'loginsuccess',
      path: redirect.home,
      component: resolve(__dirname, 'pages', 'Success.vue')
    })
  })
}
