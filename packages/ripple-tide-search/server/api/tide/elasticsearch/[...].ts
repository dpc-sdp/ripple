import { defineEventHandler, H3Event } from 'h3'
import { createProxyHandler } from '@dpc-sdp/ripple-tide-api'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event: H3Event) => {
  const { tide, public: config } = useRuntimeConfig()

  return createProxyHandler(event, 'TideElasticSearchHandler', {
    changeOrigin: true,
    target: config.tide.elasticsearch.host,
    pathRewrite: {
      '/api/tide/elasticsearch': ''
    },
    basicAuth: {
      username: tide.elasticsearch.username,
      password: tide.elasticsearch.password
    },
    onResponse(_event) {
      _event.node.res.removeHeader('access-control-allow-origin')
    }
  })
})
