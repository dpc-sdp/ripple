---
inject: true
to: package.json
after: "packages/ripple-tide-api"
skip_if: "packages/ripple-tide-<%= h.changeCase.paramCase(name) %>"
---
      "packages/ripple-tide-<%= h.changeCase.paramCase(name) %>",