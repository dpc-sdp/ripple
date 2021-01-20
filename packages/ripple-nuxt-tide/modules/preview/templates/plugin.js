export default function ({ $axios, app, redirect }) {

  $axios.onError(error => {
    // Redirect to login page again if both token and refresh token have expired.
    if (error.name?.includes('ExpiredAuthSessionError')) {
      redirect('/oauth/login')
    }
  })

}
