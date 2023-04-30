export enum AuthRoutes {
  LOGGING_IN = '/oauth/logging-in',
  LOGIN = '/api/tide/oauth',
  CALLBACK = '/oauth/login',
  SUCCESS = '/oauth/success'
}

export enum AuthCookieNames {
  ACCESS_TOKEN = 'nuxt_access_token',
  ACCESS_TOKEN_EXPIRY = 'nuxt_access_token_expiry',
  STATE = 'nuxt_auth_state'
}

export const LOGIN_DESTINATION_KEY = 'login-destination'
