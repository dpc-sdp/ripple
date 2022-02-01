---
inject: true
to: examples/reference/nuxt.config.ts
after: "['@dpc-sdp/ripple-tide-api', {
      modules: {"
skip_if: "<%= name %>: @dpc-sdp/ripple-tide-<%= h.changeCase.paramCase(name) %>"
---
        <%= name %>: @dpc-sdp/ripple-tide-<%= h.changeCase.paramCase(name) %>