import pluginCSS from '@cobalt-ui/plugin-css'
import pluginJS from '@cobalt-ui/plugin-js'
import { readdirSync } from 'node:fs'

// Convert token path segments into CSS-safe kebab-case names.
const toKebab = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-')

// Discover all token source files so new files are picked up automatically.
const tokenDir = new URL('./src/tokens/', import.meta.url)
const tokenFiles = readdirSync(tokenDir)
  .filter((file) => file.endsWith('.json'))
  .sort()
  .map((file) => `./src/tokens/${file}`)

// Prefix and normalize token ids to the public rpl-* naming scheme.
const generateTokenName = (tokenId) =>
  `rpl-${tokenId
    .split('.')
    .filter((segment) => segment !== '_')
    .map((segment) => toKebab(segment))
    .join('-')}`

// Convert stop positions from 0..1 decimal values to CSS percentages.
const formatPercent = (value) => `${Number(value) * 100}%`

// Convert gradient token objects into CSS linear-gradient strings.
const formatGradient = (token) => {
  const angle = token.id.endsWith('.horizontal') ? '90deg' : '180deg'
  const stops = token.$value
    .map((stop) => `${stop.color} ${formatPercent(stop.position)}`)
    .join(', ')

  return `linear-gradient(${angle}, ${stops})`
}

// Convert shadow token objects into single CSS box-shadow values.
const formatShadow = (token) => {
  const shadow = Array.isArray(token.$value) ? token.$value[0] : token.$value
  const spread =
    shadow.spread && shadow.spread !== '0px' && shadow.spread !== '0'
      ? ` ${shadow.spread}`
      : ''

  return `${shadow.offsetX} ${shadow.offsetY} ${shadow.blur}${spread} ${shadow.color}`
}

// Apply custom formatting for token types that need exact CSS serialization.
const transformExactToken = (token) => {
  switch (token.$type) {
    case 'gradient':
      return formatGradient(token)
    case 'shadow':
      return formatShadow(token)
    default:
      return undefined
  }
}

// Build CSS variables while excluding theme and breakpoint aliases.
const exactCssPlugin = () => {
  const cssPlugin = pluginCSS({
    filename: '_vars.css',
    p3: false,
    colorFormat: 'none',
    transform: transformExactToken,
    generateName: generateTokenName
  })

  return {
    ...cssPlugin,
    async build(options) {
      const filteredTokens = options.tokens.filter(
        (token) => !token.id.startsWith('theme.') && !token.id.startsWith('bp.')
      )
      return cssPlugin.build({
        ...options,
        tokens: filteredTokens
      })
    }
  }
}

// Build JS token maps and emit a JSON artifact for package consumers.
const exactJsPlugin = () => {
  const jsPlugin = pluginJS({
    json: '../../../dist/tokens.json'
  })

  return {
    ...jsPlugin,
    async build(options) {
      const remappedTokens = options.tokens.map((token) => {
        const remappedToken = structuredClone(token)
        remappedToken.id = generateTokenName(token.id)

        if (remappedToken._group?.id) {
          remappedToken._group.id = generateTokenName(remappedToken._group.id)
        }

        return remappedToken
      })

      return jsPlugin.build({ ...options, tokens: remappedTokens })
    }
  }
}

/** @type {import("@cobalt-ui/core").Config} */
export default {
  tokens: tokenFiles,
  outDir: './src/styles/generated/',
  plugins: [exactCssPlugin(), exactJsPlugin()]
}
