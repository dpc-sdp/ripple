export default defineEventHandler(async (event) => {
  if (useRuntimeConfig().public.nodeEnv !== 'production') return
  await proxyRequest(event, event.path)
})
