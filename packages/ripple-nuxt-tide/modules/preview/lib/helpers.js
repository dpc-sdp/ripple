import { redirect } from '../config/paths'

async function tidePreview (context) {
  if (!context.$auth.loggedIn) {
    return context.redirect(`${redirect.login}?destination=${context.req.url}`)
  } else {
    return context.app.$tide.getPageByPreviewLink(context.route.path, context.route.query.section)
  }
}

export { tidePreview }
