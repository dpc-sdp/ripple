// https://github.com/nuxt/nuxt/issues/31978#issuecomment-2900825080

export default defineEventHandler(async (event) => {
  if (import.meta.dev) return
  await proxyRequest(event, event.path)
})
