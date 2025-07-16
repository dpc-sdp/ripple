import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  },
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/components/**/*.vue',
          dest: '.'
        }
      ],
      flatten: false
    })
  ],
  server: {
    fs: {
      strict: false
    }
  },
  build: {
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'rpl-form',
      formats: ['es'],
      fileName: (f) => `rpl-forms.${f}.js`
    },
    sourcemap: false,
    // Reduce bloat from legacy polyfills.
    target: 'esnext',
    // Leave minification for now whilst we are non prod
    minify: false,
    rollupOptions: {
      external: [
        'vue',
        '@dpc-sdp/ripple-ui-core/vue',
        '@vuepic/vue-datepicker'
      ],
      output: {
        inlineDynamicImports: true,
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
