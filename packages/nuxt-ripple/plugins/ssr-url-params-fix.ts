export default defineNuxtPlugin((nuxtApp) => {
  // Remove path from nuxt payload to prevent query params from being stripped
  // The path we are removing is the path that was cached during the server side render
  // https://github.com/nuxt/nuxt/pull/21408
  // https://github.com/nuxt/nuxt/issues/23153
  delete nuxtApp?.payload?.path
})
