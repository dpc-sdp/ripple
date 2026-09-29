/**
 * Component manifest — single source of truth for all subpath entry points.
 *
 * Keys   = npm subpath  (e.g. "button" → @dpc-sdp/ripple-ui-react/button)
 * Values = source entry path relative to the package root
 *
 * Consumed by:
 *   vite.config.ts          → lib.entry
 *   scripts/sync-exports.mjs → package.json#exports
 */
export const components = {
  button: {
    entry: 'src/components/button/index.ts',
    export: 'dist/components/button/RplButton.js'
  },
  alert: {
    entry: 'src/components/alert/index.ts',
    export: 'dist/components/alert/RplAlert.js'
  },
  icon: {
    entry: 'src/components/icon/index.ts',
    export: 'dist/components/icon/RplIcon.js'
  },
  layout: {
    entry: 'src/components/layout/index.ts',
    export: 'dist/components/layout/RplLayout.js'
  },
  content: {
    entry: 'src/components/content/index.ts',
    export: 'dist/components/content/RplContent.js'
  }
}
