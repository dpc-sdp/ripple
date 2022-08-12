import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
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
      external: ['vue'],
      output: {
        inlineDynamicImports: true,
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
