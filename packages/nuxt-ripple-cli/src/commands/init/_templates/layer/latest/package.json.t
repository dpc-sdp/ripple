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
    "@dpc-sdp/ripple-tide-event": "2.1.0-alpha.178",
    "@dpc-sdp/ripple-tide-grant": "2.1.0-alpha.178",
    "@dpc-sdp/ripple-tide-landing-page": "2.1.0-alpha.178",
    "@dpc-sdp/ripple-tide-media": "2.1.0-alpha.178",
    "@dpc-sdp/ripple-tide-news": "2.1.0-alpha.178",
    "@dpc-sdp/ripple-tide-publication": "2.1.0-alpha.178",
    "@dpc-sdp/ripple-tide-search": "^2.1.0-alpha.178"
  },
  "devDependencies": {
    "@nuxt/eslint-config": "^0.1.1",
    "eslint": "^8.36.0",
    "nuxt": "3.1.0",
    "typescript": "^5.0.2"
  }
}
