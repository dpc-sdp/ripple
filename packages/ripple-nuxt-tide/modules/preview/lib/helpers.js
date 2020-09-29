import { redirect } from '../config/paths'

async function tidePreview (context) {
  if (!context.$auth.loggedIn) {
    return context.redirect(`${redirect.login}?destination=${context.req.url}`)
  } else {
    return context.app.$tide.getPageByPreviewLink(context.route.path, context.route.query.section)
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

export { tidePreview }
export { tidePreviewLogin }
export { tidePreviewSuccessRedirect }
