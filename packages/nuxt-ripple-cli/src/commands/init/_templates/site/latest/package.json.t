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
    "@dpc-sdp/nuxt-ripple": "<%= rplVersion %>",
    "@dpc-sdp/nuxt-ripple-analytics": "<%= rplVersion %>",
    "@dpc-sdp/nuxt-ripple-preview": "<%= rplVersion %>",
    "@dpc-sdp/ripple-tide-event": "<%= rplVersion %>",
    "@dpc-sdp/ripple-tide-grant": "<%= rplVersion %>",
    "@dpc-sdp/ripple-tide-landing-page": "<%= rplVersion %>",
    "@dpc-sdp/ripple-tide-media": "<%= rplVersion %>",
    "@dpc-sdp/ripple-tide-news": "<%= rplVersion %>",
    "@dpc-sdp/ripple-tide-publication": "<%= rplVersion %>",
    "@dpc-sdp/ripple-tide-search": "^<%= rplVersion %>"
  },
  "devDependencies": {
    "nuxt": "3.5.2"
  },
  "engines": {
    "node": "^16.17.0 || ^18.12.1",
    "npm": "^8.1.0"
  }
}
