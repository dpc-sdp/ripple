import { redirect } from '../config/paths'
import jsonapiParse from 'jsonapi-parse'

async function tidePreview (context, headersConfig) {
  if (!context.$auth.loggedIn) {
    return context.redirect(`${redirect.login}?destination=${context.req.url}`)
  } else {
    const siteId = (context.store.state.tide && context.store.state.tide.siteId) ? context.store.state.tide.siteId : null
    const section = (context.route.query && context.route.query.section) ? context.route.query.section : null
    return getPageByPreviewLink(context.app.$tide, context.route.path, siteId, section, headersConfig)
  }
}

async function tidePreviewLogin ($route, $auth, storage) {
  const isLoginInProgress = ($route.query.code !== undefined)
  if (!$auth.loggedIn && !isLoginInProgress) {
    // Store destination.
    if ($route.query.destination) {
      storage.setItem('login-destination', $route.query.destination)
    }
    await $auth.loginWith('drupal')
  }
}

function tidePreviewSuccessRedirect ($router, storage) {
  const destination = storage.getItem('login-destination')
  if (destination) {
    // Go to destination.
    storage.removeItem('login-destination')
    $router.replace({ path: destination })
  } else {
    // Go to home.
    $router.replace({ path: '/' })
  }
}

async function getPageByPreviewLink ($tide, path, site, section, headersConfig) {
  const params = {}
  const { 2: contentType, 3: uuid, 4: revisionId } = path.split('/')

  params.resourceVersion = (revisionId === 'latest') ? 'rel:working-copy' : `id:${revisionId}`

  const pathData = {
    entity_type: 'node',
    bundle: contentType,
    uuid: uuid
  }
  const entity = await $tide.getEntityByPathData(pathData, params, headersConfig)
  if (entity instanceof Error) {
    throw entity
  }
  const pageData = jsonapiParse.parse(entity).data

  // Append the site section to page data
  pageData.section = (section && section !== site) ? section : null
  return pageData
}

async function tideShare (context, headersConfig) {
  const siteId = (context.store.state.tide && context.store.state.tide.siteId) ? context.store.state.tide.siteId : null
  const section = (context.route.query && context.route.query.section) ? context.route.query.section : null
  const path = context.route.path[0] === '/' ? context.route.path.substring(1) : context.route.path
  return getPageByShareLink(context.app.$tide, path, siteId, section, headersConfig)
}

async function getPageByShareLink ($tide, path, site, section, headersConfig) {
  // Get shared link node info
  const shareLinkResponse = await $tide.getByURL(path)
  const sharedNode = shareLinkResponse.data.relationships.shared_node.data

  // Get node
  const params = {}
  const headers = Object.assign({}, headersConfig, { shareLinkToken: shareLinkResponse.data.id })
  const pathData = {
    entity_type: 'node',
    bundle: sharedNode.type.replace('node--', ''),
    uuid: sharedNode.id
  }
  if (shareLinkResponse.data.attributes.vid) {
    params.resourceVersion = `id:${shareLinkResponse.data.attributes.vid}`
  }
  const entity = await $tide.getEntityByPathData(pathData, params, headers)
  if (entity instanceof Error) {
    throw entity
  }
  const pageData = jsonapiParse.parse(entity).data

  // Append the site section to page data
  pageData.section = (section && section !== site) ? section : null
  return pageData
}

export { tidePreview }
export { tidePreviewLogin }
export { tidePreviewSuccessRedirect }
export { getPageByPreviewLink }
export { tideShare }
export { getPageByShareLink }
