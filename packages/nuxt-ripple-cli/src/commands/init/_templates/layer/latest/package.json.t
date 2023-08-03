---
to: package.json
---
{
  "name": "<%= h.changeCase.kebabCase(name) %>",
  "type": "module",
  "version": "0.0.0",
  "main": "./nuxt.config.ts",
  "exports": {
    ".": "./nuxt.config.ts",
    "./mapping": "./mapping/index.ts",
    "./types": "./types.ts"
  },
  "scripts": {
    "build": "nuxi build .playground",
    "start": "nuxi start .playground",
    "cy:open": "cypress open",
    "dev": "nuxi prepare & nuxi dev .playground",
    "dev:mock": "NUXT_PUBLIC_API_URL=http://localhost:3001 API_PORT=3001 npm run dev",
    "lint": "eslint .",
    "preview": "nuxi preview .playground",
    "test:unit": "jest --colors --runInBand --passWithNoTests",
    "test:integration": "start-test dev:mock 'http-get://localhost:3000/api/tide/site?id=8888' 'cy:open'"
  },
  "devDependencies": {
    "@babel/plugin-transform-runtime": "^7.22.4",
    "@babel/preset-env": "^7.22.4",
    "@babel/preset-typescript": "^7.21.5",
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
    "@nuxtjs/eslint-config-typescript": "^12.0.0",
    "cypress": "^12.5.1",
    "eslint": "^8.28.0",
    "jest-environment-jsdom": "^29.5.0",
    "nuxt": "3.5.2",
    "start-server-and-test": "^2.0.0",
    "ts-jest": "^29.1.0",
    "typescript": "^4.9.3"
  },
  "engines": {
    "node": "^18.12.1",
    "npm": "^9.5.1"
  }
}
