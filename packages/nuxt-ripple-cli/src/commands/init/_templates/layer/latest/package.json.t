---
to: package.json
---
{
  "name": "<%= h.changeCase.kebabCase(name) %>",
  "type": "module",
  "version": "0.0.1",
  "main": "./nuxt.config.ts",
  "scripts": {
    "dev": "nuxi prepare & nuxi dev .playground",
    "build": "nuxi build .playground",
    "generate": "nuxi generate .playground",
    "preview": "nuxi preview .playground",
    "lint": "eslint ."
  },
  "dependencies": {
    "@dpc-sdp/nuxt-ripple": "2.1.0-alpha.178",
    "@dpc-sdp/nuxt-ripple-analytics": "2.1.0-alpha.178",
    "@dpc-sdp/nuxt-ripple-preview": "2.1.0-alpha.178",
    "@dpc-sdp/ripple-tide-api": "^2.1.0-alpha.175",
    "@dpc-sdp/ripple-tide-event": "2.1.0-alpha.178",
    "@dpc-sdp/ripple-tide-grant": "2.1.0-alpha.178",
    "@dpc-sdp/ripple-tide-landing-page": "2.1.0-alpha.178",
    "@dpc-sdp/ripple-tide-media": "2.1.0-alpha.178",
    "@dpc-sdp/ripple-tide-news": "2.1.0-alpha.178",
    "@dpc-sdp/ripple-tide-publication": "2.1.0-alpha.178",
    "@dpc-sdp/ripple-tide-search": "^2.1.0-alpha.178",
    "@dpc-sdp/ripple-ui-core": "^2.1.0-alpha.177",
    "@dpc-sdp/ripple-ui-forms": "^2.1.0-alpha.178"
  },
  "devDependencies": {
    "@nuxtjs/eslint-config-typescript": "^12.0.0",
    "eslint": "^8.28.0",
    "nuxt": "3.5.2",
    "typescript": "^4.9.3"
  }
}
