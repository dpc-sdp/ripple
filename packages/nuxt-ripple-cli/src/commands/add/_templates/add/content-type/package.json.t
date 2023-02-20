---
to: package.json
---
{
  "license": "Apache-2.0",
  "name": "tide-<%= h.changeCase.kebabCase(name) %>",
  "description": "Ripple mappings and components for Tide <%= h.changeCase.pascalCase(name) %> %>",
  "main": "./nuxt.config.ts",
  "exports": {
    ".": "./nuxt.config.ts",
    "./mapping": "./mapping/index.ts",
    "./types": "./types.ts"
  },
  "version": "2.1.0-alpha.78",
  "dependencies": {
    "@dpc-sdp/nuxt-ripple": "2.1.0-alpha.78",
    "@dpc-sdp/ripple-ui-core": "2.1.0-alpha.78"
  }
}
