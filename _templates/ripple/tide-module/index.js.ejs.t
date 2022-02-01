---
to: packages/ripple-tide-<%= h.changeCase.paramCase(name) %>/index.js
---

export default {
  pageComponent: () => import(/* webpackMode: "eager" */ '@dpc-sdp/ripple-tide-<%= h.changeCase.paramCase(name) %>/index.vue'),
  mapping: {
  },
  includes: [
  ]
}
