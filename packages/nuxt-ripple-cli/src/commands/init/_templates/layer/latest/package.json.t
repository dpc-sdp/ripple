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
    "preview": "nuxi preview .playground",
    "lint": "eslint .",
    "test": "jest --colors --runInBand"
  },
  "devDependencies": {
    "@babel/plugin-transform-runtime": "^7.22.4",
    "@babel/preset-env": "^7.22.4",
    "@babel/preset-typescript": "^7.21.5",
    "@dpc-sdp/nuxt-ripple": "2.1.0-alpha.188",
    "@dpc-sdp/nuxt-ripple-analytics": "2.1.0-alpha.188",
    "@dpc-sdp/nuxt-ripple-preview": "2.1.0-alpha.188",
    "@dpc-sdp/ripple-tide-api": "^2.1.0-alpha.186",
    "@dpc-sdp/ripple-tide-event": "2.1.0-alpha.188",
    "@dpc-sdp/ripple-tide-grant": "2.1.0-alpha.188",
    "@dpc-sdp/ripple-tide-landing-page": "2.1.0-alpha.188",
    "@dpc-sdp/ripple-tide-media": "2.1.0-alpha.188",
    "@dpc-sdp/ripple-tide-news": "2.1.0-alpha.188",
    "@dpc-sdp/ripple-tide-publication": "2.1.0-alpha.188",
    "@dpc-sdp/ripple-tide-search": "^2.1.0-alpha.188",
    "@dpc-sdp/ripple-ui-core": "^2.1.0-alpha.186",
    "@dpc-sdp/ripple-ui-forms": "^2.1.0-alpha.188",
    "@nuxtjs/eslint-config-typescript": "^12.0.0",
    "eslint": "^8.28.0",
    "jest-environment-jsdom": "^29.5.0",
    "nuxt": "3.5.2",
    "ts-jest": "^29.1.0",
    "typescript": "^4.9.3"
  }
}
