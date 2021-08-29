export const redirect = {
  login: '/oauth/login',
  logout: '/',
  home: '/oauth/success',
  callback: '/oauth/login'
}

export const isPreviewPath = path => {
  return path.indexOf('/preview/') === 0
}

export const isSharePath = path => {
  return path.indexOf('/share_link/') === 0
}
