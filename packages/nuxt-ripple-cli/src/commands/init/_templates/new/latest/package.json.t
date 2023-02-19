---
to: package.json
---
{
  "private": true,
  "name": "<%= name %>",
  "description": "SDP site <%= name %>",
  "version": "0.0.1",
  "scripts": {
    "dev": "nuxi dev",
    "build": "nuxi build",
    "start": "node .output/server/index.mjs"
  },
  "dependencies": {
    "@dpc-sdp/nuxt-ripple": "2.1.0-alpha.82",
    "@dpc-sdp/ripple-tide-event": "2.1.0-alpha.82",
    "@dpc-sdp/ripple-tide-grant": "2.1.0-alpha.82",
    "@dpc-sdp/ripple-tide-landing-page": "2.1.0-alpha.82",
    "@dpc-sdp/ripple-tide-media": "2.1.0-alpha.82",
    "@dpc-sdp/ripple-tide-news": "2.1.0-alpha.82",
    "@dpc-sdp/ripple-tide-publication": "2.1.0-alpha.82",
    "@dpc-sdp/ripple-tide-search": "^2.1.0-alpha.82"
  },
  "devDependencies": {
    "nuxt": "3.0.0"
  },
  "engines": {
    "node": "^16.17.0 || ^18.12.1",
    "npm": "^8.1.0"
  }
}
