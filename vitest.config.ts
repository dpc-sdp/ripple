import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['packages/**/*.ts'],
      exclude: [
        '**/types.ts',
        '**/*.d.ts',
        'packages/**/*.config.ts',
        'packages/nuxt-ripple-cli/**/*',
        'packages/ripple-storybook/**/*',
        'packages/ripple-test-utils/**/*'
      ]
    }
  }
})
