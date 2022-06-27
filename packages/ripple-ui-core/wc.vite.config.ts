import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-dts'

// https://vitejs.dev/config/
// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [vue({ customElement: true }), dts()],
  build: {
    emptyOutDir: false,
    outDir: 'dist/web-components',
    lib: {
      entry: path.resolve(__dirname, 'src/web-components.ts'),
      name: 'rpl',
      fileName: (f) => `rpl-wc.${f}.js`
    },
    sourcemap: false,
    target: 'esnext',
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
