export enum AuthRoutes {
  LOGGING_IN = '/oauth/logging-in',
  LOGIN = '/api/tide/oauth',
  CALLBACK = '/oauth/login',
  SUCCESS = '/oauth/success'
}

export enum AuthCookieNames {
  ACCESS_TOKEN = 'preview.access_token',
  ACCESS_TOKEN_EXPIRY = 'preview.access_token_expiry',
  STATE = 'preview.state'
}

export const LOGIN_DESTINATION_KEY = 'login-destination'
