---
to: packages/<%= name %>/package.json
---
{
  "name": "@dpc-sdp/<%= name %>",
  "version": "<%= version %>",
  "description": "<%= description %>",
  "license": "Apache-2.0",
  "main": "index.js",
  "type": "module",
  "dependencies": {
    "@dpc-sdp/ripple-tide-api": "^<%= version %>",
    "@dpc-sdp/ripple-tide-landing-page": "^<%= version %>"
  }
}



