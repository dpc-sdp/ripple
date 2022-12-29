---
to: packages/ripple-tide-<%= h.changeCase.paramCase(name) %>/package.json
---
{
  "name": "@dpc-sdp/ripple-tide-<%= h.changeCase.paramCase(name) %>",
  "version": "0.0.0",
  "description": "Ripple mappings and components for Tide <%= name %> Content type",
  "main": "dist/index.js",
  "module": "dist/index.js",
  "type": "module",
  "exports": {
    ".": "./dist/index.js",
    "./component": "./src/index.vue",
    "./types": "./src/types.ts",
    "./nuxt": "./src/nuxt.ts"
  },
  "license": "MIT",
  "keywords": [],
  "scripts": {
    "clean": "rimraf dist* && rimraf tsconfig.tsbuildinfo",
    "build": "yarn clean && tsc -p tsconfig.json",
    "watch": "yarn clean && tsc -p tsconfig.json -w"
  },
  "dependencies": {
    "@dpc-sdp/ripple-tide-api": "alpha"
  },
  "devDependencies": {
  },
  "files": [
    "dist",
    "src",
    "!**/*.test.*",
    "!**/*.json",
    "CHANGELOG.md",
    "LICENSE",
    "README.md"
  ]
}
