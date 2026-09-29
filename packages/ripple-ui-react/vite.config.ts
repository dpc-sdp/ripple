import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import dts from 'vite-plugin-dts'
import path from 'node:path'
import fs from 'node:fs'
import { components } from './components.config.mjs'

const externalPackages = [
  'react',
  'react-dom',
  '@dpc-sdp/ripple-ui-shared',
  '@dpc-sdp/ripple-ui-styles'
]

const isExternal = (id: string) =>
  externalPackages.some((pkg) => id === pkg || id.startsWith(`${pkg}/`))

const preserveUseClientDirective = () => {
  const useClientModules = new Set<string>()

  return {
    name: 'preserve-use-client-directive',
    transform(code: string, id: string) {
      if (!id.includes(`${path.sep}src${path.sep}`)) {
        return null
      }

      const trimmed = code.trimStart()

      if (
        trimmed.startsWith("'use client'") ||
        trimmed.startsWith('"use client"')
      ) {
        useClientModules.add(id)
      }

      return null
    },
    renderChunk(code: string, chunk: { facadeModuleId?: string | null }) {
      const facadeModuleId = chunk.facadeModuleId

      if (!facadeModuleId || !useClientModules.has(facadeModuleId)) {
        return null
      }

      return {
        code: `'use client'\n${code}`,
        map: null
      }
    }
  }
}

// Build Rollup entry map from manifest — keeps vite.config in sync with
// components.config.mjs without manual duplication.
const componentEntries = Object.fromEntries(
  Object.entries(components).map(([name, component]) => [
    name,
    path.resolve(__dirname, component.entry)
  ])
)

export default defineConfig({
  plugins: [
    react(),
    preserveUseClientDirective(),
    svgr({
      include: '**/*.svg?react'
    }),
    dts({
      entryRoot: 'src',
      outputDir: 'dist'
    })
  ],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  build: {
    outDir: 'dist',
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
        ...componentEntries
      },
      formats: ['es']
    },
    rollupOptions: {
      external: isExternal,
      output: {
        // preserveModules emits every source file as its own output file, so
        // shared code (e.g. RplIcon used by RplAlert) is never duplicated.
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js'
      }
    }
  }
})
