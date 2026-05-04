import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      include: ['**/*.ts'],
      exclude: ['**/*.d.ts']
    },
    passWithNoTests: true
  }
})
