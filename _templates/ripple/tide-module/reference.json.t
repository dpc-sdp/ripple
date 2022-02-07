---
inject: true
to: examples/reference/package.json
after: "@dpc-sdp/ripple-tide-api"
skip_if: "@dpc-sdp/ripple-tide-<%= h.changeCase.paramCase(name) %>"
---
    "@dpc-sdp/ripple-tide-<%= h.changeCase.paramCase(name) %>": "^<%= version %>",