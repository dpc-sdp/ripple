import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-dts'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueSvgPlugin from 'vite-plugin-vue-svg'

// https://vitejs.dev/config/
// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    vue(),
    dts(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/core')],
      symbolId: 'rpl-icon--[name]'
    }),
    vueSvgPlugin({ defaultExport: 'component' })
  ],
  build: {
    emptyOutDir: false,
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
