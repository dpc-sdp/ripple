// Redirect endpoints used for oauth authorization.
// https://auth.nuxtjs.org/api/options.html#redirect
const redirect = {
  login: '/oauth/login',
  logout: '/',
  home: '/oauth/success',
  callback: '/oauth/login'
}

export { redirect }
