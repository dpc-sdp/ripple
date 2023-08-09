---
to: package.json
---
{
  "license": "Apache-2.0",
  "name": "tide-<%= h.changeCase.kebabCase(name) %>",
  "description": "Ripple mappings and components for Tide <%= name %>",
  "main": "./nuxt.config.ts",
  "exports": {
    ".": "./nuxt.config.ts",
    "./mapping": "./mapping/index.ts",
    "./types": "./types.ts"
  },
  "version": "1.0.0",
  "dependencies": {
    "@dpc-sdp/nuxt-ripple": "<%= rplVersion %>",
    "@dpc-sdp/ripple-tide-api": "<%= rplVersion %>",
    "@dpc-sdp/ripple-ui-core": "<%= rplVersion %>"
  }
}
