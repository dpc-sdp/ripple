---
to: package.json
---

{
  "private": true,
  "license": "Apache-2.0",
  "name": "<%= name %>",
  "description": "SDP site <%= name %>",
  "version": "2.0.1-alpha.0",
  "scripts": {
    "dev": "nuxi dev",
    "dev:debug": "node --inspect node_modules/.bin/nuxi dev",
    "build": "nuxi build",
    "start": "node .output/server/index.mjs"
  },
  "dependencies": {
    "@dpc-sdp/nuxt-ripple": "2.1.0-alpha.67",
    "@dpc-sdp/ripple-tide-event": "2.1.0-alpha.63",
    "@dpc-sdp/ripple-tide-grant": "2.1.0-alpha.67",
    "@dpc-sdp/ripple-tide-landing-page": "2.1.0-alpha.67",
    "@dpc-sdp/ripple-tide-media": "2.1.0-alpha.67",
    "@dpc-sdp/ripple-tide-news": "2.1.0-alpha.67",
    "@dpc-sdp/ripple-tide-publication": "2.1.0-alpha.67",
    "@dpc-sdp/ripple-tide-search": "^2.1.0-alpha.68"
  },
  "devDependencies": {
    "nuxt": "^3.0.0"
  },
  "engines": {
    "node": "^16.17.0 || ^18.12.1",
    "npm": "^8.1.0"
  }
}
