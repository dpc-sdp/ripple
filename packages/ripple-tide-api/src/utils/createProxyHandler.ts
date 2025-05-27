import { getRequestURL, H3Event, ProxyOptions, proxyRequest } from 'h3'
import { createHandler } from './createHandler.js'
import { logger } from '../index.js'

interface ProxyConfig {
  target: string
  changeOrigin?: boolean
  pathRewrite?: Record<string, string>
  onResponse?: (event: H3Event) => void
  headers?: ProxyOptions['headers']
  basicAuth?: {
    username: string
    password: string
  }
}

function getProxyPath(
  path: string,
  pathRewrite?: Record<string, string>
): string {
  if (pathRewrite) {
    const [pattern] = Object.keys(pathRewrite)
    path = path.replace(pattern, pathRewrite[pattern])
  }

  return path
}

function getHeadersOptions(config: ProxyConfig): ProxyOptions['headers'] {
  const { target, changeOrigin, basicAuth, headers = {} } = config

  if (changeOrigin) {
    headers['host'] = new URL(target).host
  }

  if (basicAuth?.username && basicAuth?.password) {
    const basicAuthBase64 = Buffer.from(
      `${basicAuth.username}:${basicAuth.password}`
    ).toString('base64')
    headers['Authorization'] = `Basic ${basicAuthBase64}`
  }

  return headers
}

export const createProxyHandler = async (
  event: H3Event,
  logLabel: string,
  config: ProxyConfig
) => {
  return await createHandler(event, logLabel, async () => {
    const { pathname, href, search } = getRequestURL(event)
    const { target, pathRewrite, onResponse } = config

    const proxyPath = getProxyPath(pathname, pathRewrite)
    const targetUrl = `${target}${proxyPath}${search}`
    const proxyHeaders = getHeadersOptions(config)

    logger.info(`Proxy ${href} request to ${targetUrl}`, { label: logLabel })

    return await proxyRequest(event, targetUrl, {
      headers: proxyHeaders,
      ...(onResponse && { onResponse })
    })
  })
}
