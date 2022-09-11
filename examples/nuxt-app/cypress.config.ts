import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'test/features/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'test/support/index.ts',
    supportFolder: 'test',
    downloadsFolder: 'test/downloads',
    fixturesFolder: 'test/fixtures',
    videosFolder: 'test/videos',
    screenshotsFolder: 'test/screenshots',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
})
