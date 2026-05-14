// @ts-nocheck
import { defineConfig, devices } from '@playwright/experimental-ct-vue'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vitePlugins from './src/vite.plugins'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  testDir: './src',
  testMatch: '**/*.pw.ts',
  fullyParallel: true,
  reporter: 'html',
  use: {
    ctPort: 3100,
    ctViteConfig: {
      plugins: [vue(), ...vitePlugins],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          vue: 'vue/dist/vue.esm-bundler.js'
        }
      }
    }
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
})
