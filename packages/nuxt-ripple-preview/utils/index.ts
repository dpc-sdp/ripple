export const isPreviewPath = (path: string): boolean => {
  return path.indexOf('/preview/') === 0
}

// TODO unused
export const redirect = {
  login: '/oauth/login',
  logout: '/',
  home: '/oauth/success',
  callback: '/oauth/login'
}
