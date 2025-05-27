import { defineEventHandler, H3Event } from 'h3'
import { createProxyHandler } from '@dpc-sdp/ripple-tide-api'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event: H3Event) => {
  const { public: config } = useRuntimeConfig()

  const headers = {
    'X-Sdp-Request-Location': 'tide'
  }
  if (config.isStatic) {
    headers['User-Agent'] = 'Quant'
  }

  return createProxyHandler(event, 'TideFilesHandler', {
    headers,
    changeOrigin: true,
    target: config.tide.baseUrl,
    onResponse(_event) {
      _event.node.res.setHeader('X-Sdp-App-Type', 'tide')
    }
  })
})
