import { defineEventHandler, H3Event } from 'h3'
import { createProxyHandler } from '@dpc-sdp/ripple-tide-api'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event: H3Event) => {
  const { tide, public: config } = useRuntimeConfig()

  return createProxyHandler(event, 'TideSearchHandler', {
    changeOrigin: true,
    target: config.tide.appSearch.endpointBase,
    pathRewrite: {
      '/api/tide/search': ''
    },
    headers: {
      Authorization: `Bearer ${tide.appSearch.privateSearchKey}`
    },
    onResponse(_event) {
      _event.node.res.removeHeader('access-control-allow-origin')
    }
  })
})
