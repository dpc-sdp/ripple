---
to: package.json
---
{
  "name": "<%= h.changeCase.kebabCase(name) %>",
  "type": "module",
  "version": "0.0.0",
  "main": "./nuxt.config.ts",
  "scripts": {
    "dev": "nuxi prepare & nuxi dev .playground",
    "build": "nuxi build .playground",
    "preview": "nuxi preview .playground",
    "lint": "eslint .",
    "test": "jest --colors --runInBand --passWithNoTests"
  },
  "devDependencies": {
    "@babel/plugin-transform-runtime": "^7.22.4",
    "@babel/preset-env": "^7.22.4",
    "@babel/preset-typescript": "^7.21.5",
    "@dpc-sdp/nuxt-ripple": "<%= rplVersion %>",
    "@dpc-sdp/nuxt-ripple-analytics": "<%= rplVersion %>",
    "@dpc-sdp/nuxt-ripple-preview": "<%= rplVersion %>",
    "@dpc-sdp/ripple-tide-api": "<%= rplVersion %>",
    "@dpc-sdp/ripple-tide-event": "<%= rplVersion %>",
    "@dpc-sdp/ripple-tide-grant": "<%= rplVersion %>",
    "@dpc-sdp/ripple-tide-landing-page": "<%= rplVersion %>",
    "@dpc-sdp/ripple-tide-media": "<%= rplVersion %>",
    "@dpc-sdp/ripple-tide-news": "<%= rplVersion %>",
    "@dpc-sdp/ripple-tide-publication": "<%= rplVersion %>",
    "@dpc-sdp/ripple-tide-search": "<%= rplVersion %>",
    "@dpc-sdp/ripple-ui-core": "<%= rplVersion %>",
    "@dpc-sdp/ripple-ui-forms": "<%= rplVersion %>",
    "@nuxtjs/eslint-config-typescript": "^12.0.0",
    "eslint": "^8.28.0",
    "jest-environment-jsdom": "^29.5.0",
    "nuxt": "3.5.2",
    "ts-jest": "^29.1.0",
    "typescript": "^4.9.3"
  },
  "engines": {
    "node": "^16.17.0 || ^18.12.1",
    "npm": "^9.5.1"
  }
}
