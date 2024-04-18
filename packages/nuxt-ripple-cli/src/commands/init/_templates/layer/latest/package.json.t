---
to: package.json
---
{
  "name": "@dpc-sdp/<%= h.changeCase.kebabCase(name) %>",
  "type": "module",
  "version": "0.0.0",
  "repository": "https://github.com/dpc-sdp/<%= h.changeCase.kebabCase(name) %>",
  "main": "./nuxt.config.ts",
  "exports": {
    ".": "./nuxt.config.ts",
    "./mapping": "./mapping/index.ts",
    "./types": "./types.ts"
  },
  "scripts": {
    "build": "nuxi build .playground",
    "dev": "nuxi prepare & nuxi dev .playground",
    "dev:mock": "NUXT_PUBLIC_API_URL=http://localhost:3001 API_PORT=3001 npm run dev",
    "start": "nuxi start .playground",
    "start:mock": "NUXT_PUBLIC_API_URL=http://localhost:3001 API_PORT=3001 nuxi start .playground",
    "mock": "node mockserver",
    "preview": "nuxi preview .playground",
    "lint": "eslint .",
    "cy:open": "cypress open",
    "cy:run": "cypress run",
    "test:unit": "jest --colors --runInBand --passWithNoTests",
    "test:integration": "NUXT_PUBLIC_TIDE_SITE=TEST_SITE NUXT_PUBLIC_TIDE_BASE_URL=https://test.base.url/ start-test dev:mock tcp:3000 'cy:open'",
    "test:integration-ci": "NUXT_PUBLIC_TIDE_SITE=TEST_SITE NUXT_PUBLIC_TIDE_BASE_URL=https://test.base.url/ start-test start:mock tcp:3000 'cy:run'"
  },
  "devDependencies": {
    "@babel/plugin-transform-runtime": "^7.22.4",
    "@babel/preset-env": "^7.22.4",
    "@babel/preset-typescript": "^7.21.5",
    "@dpc-sdp/eslint-config-ripple": "<%= rplVersion %>",
    "@dpc-sdp/nuxt-ripple": "<%= rplVersion %>",
    "@dpc-sdp/nuxt-ripple-analytics": "<%= rplVersion %>",
    "@dpc-sdp/nuxt-ripple-preview": "<%= rplVersion %>",
    "@dpc-sdp/ripple-test-utils": "<%= rplVersion %>",
    "@dpc-sdp/ripple-tide-api": "<%= rplVersion %>",
    "@dpc-sdp/ripple-tide-event": "<%= rplVersion %>",
    "@dpc-sdp/ripple-tide-topic": "<%= rplVersion %>",
    "@dpc-sdp/ripple-tide-grant": "<%= rplVersion %>",
    "@dpc-sdp/ripple-tide-landing-page": "<%= rplVersion %>",
    "@dpc-sdp/ripple-tide-media": "<%= rplVersion %>",
    "@dpc-sdp/ripple-tide-news": "<%= rplVersion %>",
    "@dpc-sdp/ripple-tide-publication": "<%= rplVersion %>",
    "@dpc-sdp/ripple-tide-search": "<%= rplVersion %>",
    "cypress": "^12.5.1",
    "eslint": "^8.28.0",
    "jest-environment-jsdom": "^29.5.0",
    "nuxt": "3.11.2",
    "start-server-and-test": "^2.0.0",
    "ts-jest": "^29.1.0",
    "typescript": "^4.9.3"
  },
  "engines": {
    "node": "^18.12.1",
    "npm": "^9.5.1"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/"
  }
}
