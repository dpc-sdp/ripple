---
to: package.json
---
{
  "private": true,
  "license": "Apache-2.0",
  "name": "<%= h.changeCase.kebabCase(name) %>",
  "description": "<%= name %>",
  "version": "2.0.0",
  "scripts": {
    "dev": "nuxi dev",
    "dev:debug": "node --inspect node_modules/.bin/nuxi dev",
    "build": "nuxi build",
    "preview": "nuxi preview",
    "start": "node .output/server/index.mjs"
  },
  "dependencies": {
    "@dpc-sdp/nuxt-ripple": "2.1.0-alpha.178",
    "@dpc-sdp/nuxt-ripple-analytics": "2.1.0-alpha.178",
    "@dpc-sdp/nuxt-ripple-preview": "2.1.0-alpha.178",
    "@dpc-sdp/ripple-tide-event": "2.1.0-alpha.178",
    "@dpc-sdp/ripple-tide-grant": "2.1.0-alpha.178",
    "@dpc-sdp/ripple-tide-landing-page": "2.1.0-alpha.178",
    "@dpc-sdp/ripple-tide-media": "2.1.0-alpha.178",
    "@dpc-sdp/ripple-tide-news": "2.1.0-alpha.178",
    "@dpc-sdp/ripple-tide-publication": "2.1.0-alpha.178",
    "@dpc-sdp/ripple-tide-search": "^2.1.0-alpha.178"
  },
  "devDependencies": {
    "nuxt": "3.1.0"
  },
  "engines": {
    "node": "^16.17.0 || ^18.12.1",
    "npm": "^8.1.0"
  }
}
