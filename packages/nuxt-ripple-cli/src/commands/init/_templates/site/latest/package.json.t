---
to: package.json
---
{
  "private": true,
  "name": "<%= h.changeCase.kebabCase(name) %>",
  "description": "<%= name %>",
  "version": "0.0.0",
  "scripts": {
    "dev": "nuxi dev",
    "dev:debug": "node --inspect node_modules/.bin/nuxi dev",
    "build": "nuxi build",
    "lint": "eslint .",
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
    "@dpc-sdp/ripple-tide-search": "<%= rplVersion %>",
    "@dpc-sdp/ripple-tide-topic": "<%= rplVersion %>",
    "@dpc-sdp/ripple-tide-webform": "<%= rplVersion %>"
  },
  "devDependencies": {
    "@dpc-sdp/eslint-config-ripple": "<%= rplVersion %>",
    "@elastic/search-ui-app-search-connector": "1.19.1",
    "@elastic/search-ui-elasticsearch-connector": "1.19.1",
    "nuxt": "3.11.2",
    "eslint": "^8.28.0"
  },
  "engines": {
    "node": "^18.15.0 || ^20.9.0",
    "npm": "^10.5.0"
  }
}
