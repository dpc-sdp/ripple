import corePlugins from '../config/markup-plugins'
const customPlugins = []

try {
  const customPluginsLoadConfig = require('~/tide/tide.markup-plugins.js').default
  if (customPluginsLoadConfig) {
    customPlugins.push(...customPluginsLoadConfig)
  }
} catch (error) {
  // no custom plugins
}

export default [
  ...corePlugins,
  ...customPlugins
]
