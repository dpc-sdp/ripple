import { isPreviewPath } from './preview'

const tidePreview = async (context, pageData, headersConfig) => {
  // Preview
  if (isPreviewPath(context.route.path)) {
    if (!context.$auth.loggedIn) {
      return context.redirect('/oauth/login?destination=' + context.req.url)
    }
    const { 2: type, 3: id, 4: rev } = context.route.path.split('/')
    const section = context.route.query.section ? context.route.query.section : null
    const response = await context.app.$tide.getPreviewPage(type, id, rev, section, {}, headersConfig)
    return response
  } else {
    return false
  }
}

export { tidePreview }
