import { defineConfig, devices } from '@playwright/experimental-ct-vue'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import vitePlugins from './packages/ripple-ui-core/src/vite.plugins'

export default defineConfig({
  testDir: './packages',
  /* The base directory, relative to the config file, for snapshot files created with toMatchSnapshot and toHaveScreenshot. */
  snapshotDir: './__snapshots__',
  /* Maximum time one test can run for. */
  timeout: 10 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Port to use for Playwright component endpoint. */
    ctPort: 3100,
    ctViteConfig: {
      plugins: [vue(), ...vitePlugins],
      publicDir: path.join(process.cwd(), 'playwright/public'),
      resolve: {
        alias: {
          // '@': path.resolve(__dirname, './src'),
          vue: 'vue/dist/vue.esm-bundler.js'
        }
      }
    }
  },
  projects: [
    {
      testDir: './packages/ripple-playwright-specs/ripple-ui-core',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      testDir: './packages/ripple-playwright-specs/ripple-ui-forms',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      testDir: './packages/ripple-playwright-specs/ripple-ui-maps',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
})
