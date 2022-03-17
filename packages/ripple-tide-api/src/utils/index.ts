export const redirect = {
  login: '/oauth/login',
  logout: '/',
  home: '/oauth/success',
  callback: '/oauth/login'
}

export const isPreviewPath = (path: string): boolean => {
  return path.indexOf('/preview/') === 0
}

export const isSharePath = (path: string): boolean => {
  return path.indexOf('/share_link/') === 0
}
