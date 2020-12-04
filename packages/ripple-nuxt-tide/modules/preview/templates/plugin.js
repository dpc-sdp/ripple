export default function ({ $axios, app }) {

  $axios.onError(error => {
    // Redirect to login page again if both token and refresh token have expired.
    if (error.name === 'ExpiredAuthSessionError') {
      app.router.replace({ path: '/oauth/login' })
    }
  })

}
