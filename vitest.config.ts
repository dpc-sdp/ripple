import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['packages/**/*.{test,spec}.ts'],
    exclude: ['**/node_modules/**'],
    coverage: {
      provider: 'v8',
      include: ['packages/**/*.ts'],
      exclude: [
        '**/types.ts',
        '**/*.d.ts',
        'packages/**/*.config.ts',
        'packages/ripple-storybook/**/*'
      ]
    }
  }
})
