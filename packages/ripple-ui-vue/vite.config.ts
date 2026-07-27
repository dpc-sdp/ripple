import { defineConfig, type PluginOption } from 'vite'
import svgLoader from 'vite-svg-loader'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

const plugins: PluginOption[] = [
  vue() as PluginOption,
  svgLoader({
    defaultImport: 'raw',
    svgoConfig: {
      multipass: true,
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              removeHiddenElems: false
            }
          }
        },
        {
          name: 'removeAttrs',
          params: {
            attrs: '(fill|stroke)'
          }
        },
        {
          name: 'removeStyleElement'
        },
        {
          name: 'removeAttributesBySelector',
          params: {
            selector: "[style='fill:#*']",
            attributes: 'style'
          }
        }
      ]
    }
  }) as PluginOption
]

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  },
  optimizeDeps: {
    exclude: ['@dpc-sdp/ripple-ui-shared']
  },
  ssr: {
    noExternal: ['@dpc-sdp/ripple-ui-shared']
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: (f) => `rpl-lib.${f}.js`
    },
    target: 'esnext',
    rollupOptions: {
      external: ['vue'],
      output: { preserveModules: true, preserveModulesRoot: 'src' }
    }
  }
})
