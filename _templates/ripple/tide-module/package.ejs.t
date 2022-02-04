---
to: packages/ripple-tide-<%= h.changeCase.paramCase(name) %>/package.json
---
{
  "name": "@dpc-sdp/ripple-tide-<%= h.changeCase.paramCase(name) %>",
  "version": "<%= version %>",
  "description": "Tide mappings for <%= name %> content type",
  "license": "Apache-2.0",
  "main": "index.js",
  "type": "module",
  "dependencies": {
    "@dpc-sdp/ripple-tide-api": "^<%= version %>"
  }
}



