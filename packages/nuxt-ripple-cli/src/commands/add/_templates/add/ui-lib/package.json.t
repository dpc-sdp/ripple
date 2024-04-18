---
to: package.json
---
{
  "packageManager": "pnpm@8.6.2",
  "name": "@dpc-sdp/<%= h.changeCase.kebabCase(name) %>",
  "description": "Ripple UI Core component library",
  "version": "2.1.1",
  "license": "Apache-2.0",
  "repository": "https://github.com/dpc-sdp/ripple-framework",
  "files": [
    "dist",
    "src",
    "./postcssrc.json",
    "README.md"
  ],
  "type": "module",
  "main": "./dist/rpl-lib.umd.js",
  "module": "./dist/rpl-lib.es.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": "./dist/rpl-lib.es.js",
    "./nuxt": "./src/nuxt/index.ts",
    "./vue": "./dist/rpl-vue.es.js",
    "./style": "./dist/global.css",
    "./style/breakpoints": "./src/styles/_breakpoints.css",
    "./style/components": "./dist/style.css"
  },
  "scripts": {
    "build": "pnpm clean && pnpm build:types && pnpm build:styles && pnpm build:lib && pnpm build:vue",
    "build:types": "tsc -p tsconfig.json",
    "build:lib": "vite build",
    "build:vue": "vite build --config vue.vite.config.ts",
    "build:styles": "vite build --config global-css.vite.config.ts && rimraf ./dist/delete.es.js",
    "watch": "pnpm build:types && vite build --watch",
    "clean": "(rimraf dist* && rimraf tsconfig.tsbuildinfo) | true",
    "preview": "vite preview",
    "storybook": "start-storybook -p 6006",
    "storybook:build": "build-storybook",
    "test:components": "cypress run --component",
    "cy:components": "cypress open --component",
    "test:generate-output": "jest --json --outputFile=.jest-test-results.json"
  },
  "dependencies": {
    "@nuxt/kit": "^3.10.2",
    "@vueuse/core": "^9.13.0",
    "@vueuse/integrations": "^9.13.0",
    "postcss-each": "^1.1.0",
    "postcss-nested": "^6.0.1",
    "postcss-normalize": "^10.0.1",
    "postcss-preset-env": "^8.1.0",
  },
  "peerDependencies": {
    "vue": "3.4.21"
  },
  "devDependencies": {
    "@dpc-sdp/ripple-tide-api": "workspace:*",
    "@vitejs/plugin-vue": "^4.1.0",
    "@vue/compiler-sfc": "^3.2.47",
    "autoprefixer": "^10.4.14",
    "chromatic": "^6.17.2",
    "eslint-config-prettier": "^8.8.0",
    "eslint-plugin-storybook": "^0.6.13",
    "jest-axe": "^7.0.1",
    "rimraf": "^4.4.1",
    "style-dictionary": "^3.7.2",
    "vite": "4.1.5",
    "vite-plugin-copy": "^0.1.6",
    "vite-plugin-dts": "^2.1.0",
    "vite-plugin-svg-icons": "^2.0.1",
    "vite-plugin-vue-svg": "^0.1.0",
    "vite-svg-loader": "^4.0.0"
  }
}
